# Family Cup 2026 ⚽

A single-page sweepstake tracker for FIFA World Cup 2026. No build step — open `index.html` in any browser, or deploy to Netlify.

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell |
| `data.js` | All data — **edit this to update results or team assignments** |
| `app.js` | Rendering logic |
| `styles.css` | All styles |
| `syncClient.js` | Client-side sync orchestrator — calls the Netlify Function |
| `netlify/functions/sync.js` | Serverless function — proxies API-Football; caches responses server-side |
| `netlify.toml` | Netlify build config |

---

## Deploying to Netlify

All 9 family devices share a single API-Football free-tier quota (100 req/day). Every API call goes through the Netlify Function, not the browser, so quota is never multiplied by device count.

### Option A — GitHub + Netlify (recommended)

1. Push this folder to a GitHub repo (everything can be committed — there is no secret file)
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
3. Connect your GitHub repo; Netlify auto-detects `netlify.toml`
4. Before or after the first deploy, go to **Site Configuration → Environment Variables** and add:
   - Key: `API_FOOTBALL_KEY`
   - Value: your API-Football key (free at [api-football.com](https://www.api-football.com/))
5. Trigger a redeploy — the function will pick up the key automatically

### Option B — Netlify drag-and-drop

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**
2. Drag the project folder into the upload zone
3. After the initial deploy, add the `API_FOOTBALL_KEY` environment variable in Site Configuration
4. Trigger a redeploy from the Netlify dashboard

> **The API key never appears in any file in the repo.** It lives only in Netlify's environment variables and is read server-side by the function at request time.

---

## How live sync works

On every page load `syncClient.js` runs three checks, each self-throttled via `localStorage`:

| Check | Threshold | What it does |
|-------|-----------|--------------|
| `lastScoreFetch` | 10 min (match window) / 23 h (idle) | Updates scores and match statuses |
| `lastFixtureFetch` | 23 h | Discovers new fixtures (knockout pairings appear automatically) |
| `lastOddsFetch` | 23 h | Fetches pre-match odds; displays favourite beneath upcoming knockout cards |

A **match window** is 30 minutes before a scheduled kickoff until 120 minutes after. During a match window the app re-polls scores every 10 minutes automatically; outside one it only checks on page load.

---

## Updating results manually

If you prefer not to use the API, edit `data.js` directly and redeploy.

### Update a score

Find the match in the `matches` array and set:
```js
homeScore: 2,
awayScore: 1,
status: "finished"
```

### Add a knockout fixture

Append to the `matches` array:
```js
{
  id: "r32_01",
  stage: "Round of 32",          // or "Round of 16", "Quarter-finals", "Semi-finals", "Final"
  homeTeam: "bra",               // team id from the teams array
  awayTeam: "eng",
  kickoffUTC: "2026-06-29T17:00:00Z",
  homeScore: null,
  awayScore: null,
  status: "scheduled"
}
```

### Mark teams eliminated

Add team `id` values to the `eliminated` array:
```js
eliminated: ["pan", "sco", "alb", "swe"]
```

Eliminated teams show at reduced opacity with strikethrough. The live sync also derives eliminations automatically from knockout match results — the manual array is an override for edge cases.

---

## Player allocations

| Player | Colour | Teams |
|--------|--------|-------|
| Kay | 🔴 red | Austria, Brazil, Norway, Panama, USA |
| Wayne | 🔵 blue | Jordan, Morocco, Scotland, Senegal, Switzerland |
| Kim | 🟢 green | Cabo Verde, Colombia, DR Congo, Japan, Tunisia |
| Steph | 🟡 yellow | Belgium, Bosnia, Czechia, Iran, Qatar |
| AJ | 🟣 purple | Algeria, Egypt, France, Haiti, Spain |
| Kezia | 🟠 amber | Australia, Curaçao, Netherlands, Portugal, Turkey |
| Sienna | 🩵 cyan | Canada, Ecuador, Germany, Iraq, Uzbekistan |
| Scarlett | 🩷 pink | Argentina, Cote d'Ivoire, Croatia, Ghana, Mexico |
| Leo | 🟢 lime | England, New Zealand, South Africa, South Korea, Uruguay |
| — | grey | Paraguay, Saudi Arabia, Sweden |
