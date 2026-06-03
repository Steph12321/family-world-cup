// netlify/functions/sync.js
// Proxies API-Football requests server-side so all 9 family devices
// share one daily quota (100 req/day on the free tier).
//
// Query param: ?type=scores | fixtures | odds
//
// The API key is read from process.env.API_FOOTBALL_KEY — set it in
// Netlify: Site Configuration → Environment Variables.

'use strict';

const API_BASE = 'https://v3.football.api-sports.io';
const LEAGUE   = 1;
const SEASON   = 2026;

const MIN  = 60 * 1000;
const HOUR = 60 * MIN;

// In-memory cache. Survives across requests on the same warm Lambda instance.
// On a cold start the cache is empty and a fresh API call is made.
const cache = {
  fixtures: { data: null, ts: 0 },  // shared by "scores" and "fixtures" types
  odds:     { data: null, ts: 0 }
};

const LIVE_STATUSES = new Set([
  '1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE'
]);

function hasLiveMatch(data) {
  return (data?.response || []).some(
    f => LIVE_STATUSES.has(f.fixture?.status?.short)
  );
}

// Returns cache TTL in ms for the given request type.
function ttlFor(type, cachedData) {
  if (type === 'scores') {
    return hasLiveMatch(cachedData) ? 10 * MIN : 23 * HOUR;
  }
  return 23 * HOUR; // fixtures, odds
}

// Both "scores" and "fixtures" hit the same API endpoint; share one cache slot.
function cacheKey(type) {
  return (type === 'scores' || type === 'fixtures') ? 'fixtures' : 'odds';
}

const ENDPOINTS = {
  scores:   `/fixtures?league=${LEAGUE}&season=${SEASON}&timezone=UTC`,
  fixtures: `/fixtures?league=${LEAGUE}&season=${SEASON}&timezone=UTC`,
  odds:     `/odds?league=${LEAGUE}&season=${SEASON}&bookmaker=8`
};

function respond(statusCode, body, cacheStatus) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'X-Cache': cacheStatus
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async (event) => {
  const type = event.queryStringParameters?.type;

  if (!ENDPOINTS[type]) {
    return respond(400, { error: `Unknown type "${type}". Use: scores, fixtures, odds` }, 'ERR');
  }

  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) {
    return respond(500, { error: 'API_FOOTBALL_KEY environment variable not set' }, 'ERR');
  }

  const key   = cacheKey(type);
  const entry = cache[key];
  const now   = Date.now();

  if (entry.data && (now - entry.ts) < ttlFor(type, entry.data)) {
    return respond(200, entry.data, 'HIT');
  }

  try {
    const res = await fetch(`${API_BASE}${ENDPOINTS[type]}`, {
      headers: { 'x-apisports-key': apiKey }
    });

    if (res.status === 429) {
      // Rate limited — return stale data if available, otherwise propagate error
      if (entry.data) return respond(200, entry.data, 'STALE');
      return respond(429, { error: 'API-Football rate limit reached' }, 'ERR');
    }

    if (!res.ok) throw new Error(`API-Football responded with ${res.status}`);

    const data = await res.json();
    cache[key] = { data, ts: now };
    return respond(200, data, 'MISS');

  } catch (err) {
    // Network error or non-OK — serve stale if we have it
    if (entry.data) return respond(200, entry.data, 'STALE');
    return respond(502, { error: err.message }, 'ERR');
  }
};
