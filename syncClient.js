// syncClient.js — client-side sync orchestrator
// All API calls go through /netlify/functions/sync — the browser never
// contacts API-Football directly, so all 9 devices share one quota.

(function () {
  'use strict';

  const FN          = '/netlify/functions/sync';
  const POLL_LIVE   = 10 * 60 * 1000;   // 10 min during a match window
  const WIN_BEFORE  = 30 * 60 * 1000;   // window opens 30 min before kickoff
  const WIN_AFTER   = 120 * 60 * 1000;  // window closes 120 min after kickoff
  const DAY         = 23 * 60 * 60 * 1000; // 23-hour "once per day" threshold

  const GROUP_STAGE_PREFIXES = [
    'Group A','Group B','Group C','Group D',
    'Group E','Group F','Group G','Group H',
    'Group I','Group J','Group K','Group L'
  ];
  const GROUP_STAGES = new Set(GROUP_STAGE_PREFIXES);

  // odds data keyed by API-Football fixture id (number)
  // shape: { [apiId]: { favName, undName, ratio } | { evenly: true } }
  window.ODDS = window.ODDS || {};

  let pollTimer = null;

  // ── Helpers ──────────────────────────────────────────────

  function isMatchWindow() {
    const now = Date.now();
    return DATA.matches.some(m => {
      if (m.status === 'finished') return false;
      const kick = new Date(m.kickoffUTC).getTime();
      return now >= kick - WIN_BEFORE && now <= kick + WIN_AFTER;
    });
  }

  function shouldFetch(lsKey) {
    const last = parseInt(localStorage.getItem(lsKey) || '0', 10);
    return Date.now() - last >= DAY;
  }

  function markFetched(lsKey) {
    localStorage.setItem(lsKey, String(Date.now()));
  }

  async function callFn(type) {
    const res = await fetch(`${FN}?type=${type}`);
    if (!res.ok) throw new Error(`${type} — HTTP ${res.status}`);
    return res.json();
  }

  function triggerRender() {
    if (typeof window.render === 'function') window.render();
  }

  // ── Score sync ───────────────────────────────────────────
  // During a match window: poll every 10 min.
  // Outside a match window: fetch once on page load if >23 h since last check.

  async function syncScores() {
    const inWindow = isMatchWindow();
    if (!inWindow && !shouldFetch('lastScoreFetch')) return;

    try {
      const json = await callFn('scores');
      applyFixtures(json.response || [], true);
      markFetched('lastScoreFetch');
    } catch (err) {
      console.warn('[sync] scores:', err.message);
    }

    // Reschedule only while a match window is still open
    if (isMatchWindow()) {
      clearTimeout(pollTimer);
      pollTimer = setTimeout(syncScores, POLL_LIVE);
    }
  }

  // ── Fixture sync ─────────────────────────────────────────
  // Once per day: discover new fixtures (knockout pairings) and update statuses.

  async function syncFixtures() {
    if (!shouldFetch('lastFixtureFetch')) return;

    try {
      const json = await callFn('fixtures');
      applyFixtures(json.response || [], false);
      markFetched('lastFixtureFetch');
      deriveEliminated();
      triggerRender();
    } catch (err) {
      console.warn('[sync] fixtures:', err.message);
    }
  }

  // ── Odds sync ────────────────────────────────────────────
  // Once per day: pre-match odds for upcoming knockout fixtures.

  async function syncOdds() {
    if (!shouldFetch('lastOddsFetch')) return;

    try {
      const json = await callFn('odds');
      applyOdds(json.response || []);
      markFetched('lastOddsFetch');
      triggerRender();
    } catch (err) {
      console.warn('[sync] odds:', err.message);
    }
  }

  // ── Apply fixtures ───────────────────────────────────────

  function applyFixtures(fixtures, scoresOnly) {
    let changed = false;

    fixtures.forEach(f => {
      const homeId = resolveTeamId(f.teams.home.name);
      const awayId = resolveTeamId(f.teams.away.name);
      if (!homeId || !awayId) return;

      const status     = mapStatus(f.fixture.status.short);
      const homeScore  = f.goals.home  ?? null;
      const awayScore  = f.goals.away  ?? null;
      const kickoffUTC = new Date(f.fixture.date).toISOString();
      const stage      = mapStage(f.league.round);
      const apiId      = f.fixture.id;

      // Match by apiId first; fall back to team-id pair for pre-seeded fixtures
      let match = DATA.matches.find(m => m.apiId === apiId)
               || DATA.matches.find(m => m.homeTeam === homeId && m.awayTeam === awayId);

      if (!match && !scoresOnly) {
        match = {
          id:        `api_${apiId}`,
          apiId,
          stage,
          homeTeam:  homeId,
          awayTeam:  awayId,
          kickoffUTC,
          homeScore: null,
          awayScore: null,
          status:    'scheduled'
        };
        DATA.matches.push(match);
        changed = true;
      }

      if (match) {
        if (!match.apiId) { match.apiId = apiId; changed = true; }
        if (
          match.status    !== status     ||
          match.homeScore !== homeScore  ||
          match.awayScore !== awayScore
        ) {
          match.status     = status;
          match.homeScore  = homeScore;
          match.awayScore  = awayScore;
          match.kickoffUTC = kickoffUTC;
          changed = true;
        }
      }
    });

    if (changed) triggerRender();
  }

  // ── Derive eliminated ────────────────────────────────────
  // Written to DATA._derivedEliminated (a Set); app.js merges it with
  // the manual DATA.eliminated array in buildEliminatedSet().

  function deriveEliminated() {
    const knockoutFinished = new Set();
    const hasUpcoming      = new Set();

    DATA.matches.forEach(m => {
      const isKnockout = !GROUP_STAGES.has(m.stage);
      if (isKnockout && m.status === 'finished') {
        knockoutFinished.add(m.homeTeam);
        knockoutFinished.add(m.awayTeam);
      }
      if (m.status === 'scheduled' || m.status === 'live') {
        hasUpcoming.add(m.homeTeam);
        hasUpcoming.add(m.awayTeam);
      }
    });

    const derived = new Set(DATA.eliminated); // manual overrides always in
    DATA.teams.forEach(t => {
      if (knockoutFinished.has(t.id) && !hasUpcoming.has(t.id)) {
        derived.add(t.id);
      }
    });
    DATA._derivedEliminated = derived;
  }

  // ── Apply odds ───────────────────────────────────────────
  // Keyed by apiId so they're ready as soon as syncFixtures sets apiId on matches.

  function applyOdds(oddsResponse) {
    window.ODDS = {};

    oddsResponse.forEach(item => {
      const apiId = item.fixture?.id;
      if (!apiId) return;

      // Only upcoming knockout fixtures
      const match = DATA.matches.find(m => m.apiId === apiId);
      if (!match || match.status === 'finished' || GROUP_STAGES.has(match.stage)) return;

      const bookmaker = item.bookmakers?.[0];
      if (!bookmaker) return;

      const market = (bookmaker.bets || []).find(b => b.name === 'Match Winner');
      if (!market) return;

      const homeOdd = parseFloat((market.values.find(v => v.value === 'Home') || {}).odd);
      const awayOdd = parseFloat((market.values.find(v => v.value === 'Away') || {}).odd);
      if (!homeOdd || !awayOdd || isNaN(homeOdd) || isNaN(awayOdd)) return;

      const lo    = Math.min(homeOdd, awayOdd);
      const hi    = Math.max(homeOdd, awayOdd);
      const ratio = Math.round((hi / lo) * 10) / 10;

      if (ratio <= 1.2) {
        window.ODDS[apiId] = { evenly: true };
      } else {
        const favTeam = DATA.teams.find(t => t.id === (homeOdd < awayOdd ? match.homeTeam : match.awayTeam));
        const undTeam = DATA.teams.find(t => t.id === (homeOdd < awayOdd ? match.awayTeam : match.homeTeam));
        if (favTeam && undTeam) {
          window.ODDS[apiId] = { favName: favTeam.name, undName: undTeam.name, ratio };
        }
      }
    });
  }

  // ── Team name → id mapping ───────────────────────────────

  const NAME_MAP = {
    'usa':                          'usa',
    'united states':                'usa',
    'canada':                       'can',
    'mexico':                       'mex',
    'panama':                       'pan',
    'england':                      'eng',
    'scotland':                     'sco',
    'norway':                       'nor',
    'sweden':                       'swe',
    'spain':                        'esp',
    'portugal':                     'por',
    'turkey':                       'tur',
    'bosnia':                       'bih',
    'bosnia & herzegovina':         'bih',
    'bosnia and herzegovina':       'bih',
    'france':                       'fra',
    'netherlands':                  'ned',
    'holland':                      'ned',
    'czechia':                      'cze',
    'czech republic':               'cze',
    'croatia':                      'cro',
    'germany':                      'ger',
    'austria':                      'aut',
    'switzerland':                  'sui',
    'belgium':                      'bel',
    'brazil':                       'bra',
    'argentina':                    'arg',
    'uruguay':                      'uru',
    'ecuador':                      'ecu',
    'morocco':                      'mar',
    'algeria':                      'alg',
    'senegal':                      'sen',
    'tunisia':                      'tun',
    'colombia':                     'col',
    "côte d'ivoire":                'civ',
    "cote d'ivoire":                'civ',
    'ivory coast':                  'civ',
    'ghana':                        'gha',
    'dr congo':                     'cod',
    'congo dr':                     'cod',
    'democratic republic of congo': 'cod',
    'japan':                        'jpn',
    'south korea':                  'kor',
    'korea republic':               'kor',
    'republic of korea':            'kor',
    'iraq':                         'irq',
    'jordan':                       'jor',
    'iran':                         'irn',
    'ir iran':                      'irn',
    'qatar':                        'qat',
    'saudi arabia':                 'ksa',
    'egypt':                        'egy',
    'australia':                    'aus',
    'new zealand':                  'nzl',
    'uzbekistan':                   'uzb',
    'cabo verde':                   'cpv',
    'cape verde':                   'cpv',
    'south africa':                 'rsa',
    'haiti':                        'hai',
    'curaçao':                      'cuw',
    'curacao':                      'cuw',
    'paraguay':                     'par',
    'sweden':                       'swe',
    'saudi arabia':                 'ksa'
  };

  function resolveTeamId(apiName) {
    return NAME_MAP[(apiName || '').toLowerCase().trim()] || null;
  }

  function mapStatus(short) {
    if (['1H','HT','2H','ET','BT','P','SUSP','INT','LIVE'].includes(short)) return 'live';
    if (['FT','AET','PEN'].includes(short)) return 'finished';
    return 'scheduled';
  }

  function mapStage(round) {
    if (!round) return 'Group A';
    const r = round.toLowerCase();
    const gm = r.match(/group\s*[-–]?\s*([a-l])\b/i);
    if (gm)                    return `Group ${gm[1].toUpperCase()}`;
    if (r.includes('32'))      return 'Round of 32';
    if (r.includes('16'))      return 'Round of 16';
    if (r.includes('quarter')) return 'Quarter-finals';
    if (r.includes('semi'))    return 'Semi-finals';
    if (r.includes('final'))   return 'Final';
    return round;
  }

  // ── Init ────────────────────────────────────────────────

  function init() {
    // Run all three syncs on page load (each self-throttles via localStorage)
    syncScores();
    syncFixtures();
    syncOdds();
  }

  init();
})();
