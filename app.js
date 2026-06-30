// app.js — all rendering driven from DATA in data.js

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────
  let activeFilter      = null;   // null = All, or player name string
  let currentPage       = 'main'; // 'main' | 'tally'
  let collapsedSections = new Set(); // section keys currently collapsed

  // ── Lookup maps built on init ──────────────────────
  const playerMap = {};  // name → player object
  const teamMap   = {};  // id   → team object

  // ── Utilities ──────────────────────────────────────

  // Convert a UTC ISO string to a human-readable NZT string (UTC+12 = NZST in winter).
  function toNZT(utcISO) {
    const d    = new Date(utcISO);
    const nzt  = new Date(d.getTime() + 12 * 60 * 60 * 1000);
    const dd   = nzt.getUTCDate();
    const mo   = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'][nzt.getUTCMonth()];
    let   hr   = nzt.getUTCHours();
    const min  = String(nzt.getUTCMinutes()).padStart(2, '0');
    const ampm = hr >= 12 ? 'PM' : 'AM';
    hr = hr % 12 || 12;
    return `${dd} ${mo} · ${hr}:${min} ${ampm} NZT`;
  }

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  function anyLive() {
    return DATA.matches.some(m => m.status === 'live');
  }

  // Build a set of eliminated team ids.
  // Merges manual DATA.eliminated overrides with DATA._derivedEliminated
  // (populated by syncClient.js after each fixture sync).
  function buildEliminatedSet() {
    const s = new Set(DATA.eliminated);
    if (DATA._derivedEliminated) {
      DATA._derivedEliminated.forEach(id => s.add(id));
    }
    return s;
  }

  // ── DOM helpers ─────────────────────────────────────

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // ── Render ──────────────────────────────────────────

  function render() {
    const eliminated = buildEliminatedSet();
    const app = document.getElementById('app');
    app.innerHTML = '';

    app.appendChild(renderHeader());

    if (currentPage === 'tally') {
      app.appendChild(renderTallyPage());
    } else {
      app.appendChild(renderLegend());
      app.appendChild(renderGroupSection(eliminated));
      app.appendChild(renderKnockoutSections(eliminated));
      app.appendChild(renderPlaceholder());
    }
  }

  // ── Header ──────────────────────────────────────────

  function renderHeader() {
    const header = el('header', 'header');
    const row    = el('div', 'header-row');
    const left   = el('div');

    left.appendChild(el('div', 'header-title', 'Family Cup 2026 ⚽'));
    left.appendChild(el('div', 'header-sub', '9 players · 48 teams · NZT'));
    row.appendChild(left);

    const right = el('div', 'header-right');

    if (anyLive() && currentPage === 'main') {
      const badge = el('div', 'live-badge');
      badge.appendChild(el('div', 'live-dot'));
      badge.appendChild(document.createTextNode('Live'));
      right.appendChild(badge);
    }

    const tallyBtn = el('button', currentPage === 'tally' ? 'tally-btn tally-btn--active' : 'tally-btn');
    tallyBtn.type = 'button';
    tallyBtn.textContent = currentPage === 'tally' ? 'Results' : 'Tally';
    tallyBtn.addEventListener('click', () => {
      currentPage = currentPage === 'tally' ? 'main' : 'tally';
      render();
    });
    right.appendChild(tallyBtn);

    row.appendChild(right);
    header.appendChild(row);
    return header;
  }

  // ── Legend ──────────────────────────────────────────

  function renderLegend() {
    const section = el('div', 'legend');
    const grid    = el('div', 'legend-chips');

    // "All" chip
    const allChip = buildChip('All', null, '#9b9189');
    allChip.classList.add('chip-all');
    if (activeFilter === null) {
      allChip.classList.add('is-active');
      allChip.style.borderColor  = '#9b9189';
      allChip.style.background   = '#f4f0eb';
    }
    allChip.addEventListener('click', () => { activeFilter = null; render(); });
    grid.appendChild(allChip);

    // Player chips
    DATA.players.forEach(p => {
      const chip = buildChip(p.name, p.name, p.colour);
      if (activeFilter === p.name) {
        chip.classList.add('is-active');
        chip.style.borderColor = p.colour;
        chip.style.background  = `rgba(${hexToRgb(p.colour)}, 0.09)`;
      } else if (activeFilter !== null) {
        chip.classList.add('is-dimmed');
      }
      chip.addEventListener('click', () => {
        activeFilter = (activeFilter === p.name) ? null : p.name;
        render();
      });
      grid.appendChild(chip);
    });

    section.appendChild(grid);
    return section;
  }

  function buildChip(label, playerName, colour) {
    const chip = el('button', 'chip');
    chip.type  = 'button';

    const dot  = el('span', 'chip-dot');
    dot.style.background = colour;
    chip.appendChild(dot);
    chip.appendChild(document.createTextNode(label));
    return chip;
  }

  // ── Section toggle (collapsible header) ─────────────

  function renderSectionToggle(labelText, key) {
    const btn = el('button', 'section-toggle');
    btn.type = 'button';
    if (collapsedSections.has(key)) btn.classList.add('is-collapsed');

    btn.appendChild(el('span', 'section-toggle-label', labelText));
    btn.appendChild(el('span', 'section-toggle-chevron'));

    btn.addEventListener('click', () => {
      if (collapsedSections.has(key)) collapsedSections.delete(key);
      else collapsedSections.add(key);
      render();
    });
    return btn;
  }

  // ── Group section ────────────────────────────────────

  function renderGroupSection(eliminated) {
    const wrap = el('div');

    wrap.appendChild(renderSectionToggle('Group Stage', 'group-stage'));

    if (!collapsedSections.has('group-stage')) {
      const grid = el('div', 'group-grid');
      ['A','B','C','D','E','F','G','H','I','J','K','L'].forEach(letter => {
        const groupTeams = DATA.teams.filter(t => t.group === letter);
        grid.appendChild(renderGroupCard(letter, groupTeams, eliminated));
      });
      wrap.appendChild(grid);
    }

    const groupMatches = DATA.matches.filter(m => m.stage.startsWith('Group'));
    if (groupMatches.length) {
      const order = { finished: 0, live: 1, scheduled: 2 };
      const sorted = [...groupMatches].sort((a, b) => {
        if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
        return new Date(a.kickoffUTC) - new Date(b.kickoffUTC);
      });

      wrap.appendChild(renderSectionToggle('Fixtures & Results', 'fixtures'));

      if (!collapsedSections.has('fixtures')) {
        const list = el('div', 'matches-list');
        sorted.forEach(m => list.appendChild(renderMatchCard(m, eliminated)));
        wrap.appendChild(list);
      }
    }

    return wrap;
  }

  function renderGroupCard(letter, groupTeams, eliminated) {
    const card   = el('div', 'group-card');
    const header = el('div', 'group-header', `Group ${letter}`);
    card.appendChild(header);

    groupTeams.forEach(team => {
      card.appendChild(renderTeamRow(team, eliminated));
    });
    return card;
  }

  function renderTeamRow(team, eliminated) {
    const isElim   = eliminated.has(team.id);
    const colour   = team.owner ? playerMap[team.owner].colour : 'var(--bar-none)';
    const isOwner  = team.owner === activeFilter;

    const row = el('div', 'team-row');

    if (isElim && isOwner) {
      row.classList.add('is-highlight-elim');
      row.style.background = `rgba(${hexToRgb(colour)}, 0.11)`;
    } else if (activeFilter !== null && !isOwner) {
      row.classList.add('is-dim-filter');
    } else if (isElim) {
      row.classList.add('is-elim');
    } else if (activeFilter !== null && isOwner) {
      row.style.background = `rgba(${hexToRgb(colour)}, 0.11)`;
    }

    const bar = el('div', 'team-bar');
    bar.style.background = colour;

    const flag = el('span', 'team-flag', team.flag);
    const name = el('span', 'team-name', team.name);

    row.appendChild(bar);
    row.appendChild(flag);
    row.appendChild(name);
    return row;
  }

  // ── Odds footer (knockout upcoming matches only) ─────

  const GROUP_STAGES = new Set([
    'Group A','Group B','Group C','Group D',
    'Group E','Group F','Group G','Group H',
    'Group I','Group J','Group K','Group L'
  ]);

  function renderOddsFooter(match) {
    if (!match.apiId) return null;
    const odds = (window.ODDS || {})[match.apiId];
    if (!odds) return null;

    const footer = el('div', 'match-odds-footer');
    footer.textContent = odds.evenly
      ? 'Evenly matched'
      : `${odds.favName} favoured · ${odds.ratio}× ${odds.undName}`;
    return footer;
  }

  // ── Knockout sections ────────────────────────────────

  const KNOCKOUT_STAGES = [
    'Round of 32',
    'Round of 16',
    'Quarter-finals',
    'Semi-finals',
    'Final'
  ];

  function renderKnockoutSections(eliminated) {
    const wrap = el('div');

    KNOCKOUT_STAGES.forEach(stage => {
      const stageMatches = DATA.matches
        .filter(m => m.stage === stage)
        .sort((a, b) => new Date(a.kickoffUTC) - new Date(b.kickoffUTC));

      if (!stageMatches.length) return;

      wrap.appendChild(renderSectionToggle(stage, stage));

      if (!collapsedSections.has(stage)) {
        const list = el('div', 'matches-list');
        stageMatches.forEach(m => list.appendChild(renderMatchCard(m, eliminated)));
        wrap.appendChild(list);
      }
    });

    return wrap;
  }

  // ── Match card ───────────────────────────────────────

  function renderMatchCard(match, eliminated) {
    const card = el('div', 'match-card');

    // Meta row
    const meta = el('div', 'match-meta');
    meta.appendChild(el('span', 'match-time', toNZT(match.kickoffUTC)));
    if (match.status === 'live') {
      meta.appendChild(el('div', 'match-live-pip'));
    }
    card.appendChild(meta);

    // Home row
    card.appendChild(renderMatchTeamRow(
      match.homeTeam,
      match.status !== 'scheduled' ? match.homeScore : null,
      match,
      eliminated
    ));

    // Away row
    card.appendChild(renderMatchTeamRow(
      match.awayTeam,
      match.status !== 'scheduled' ? match.awayScore : null,
      match,
      eliminated
    ));

    // Odds footer — knockout, upcoming matches only
    if (!GROUP_STAGES.has(match.stage) && match.status !== 'finished') {
      const footer = renderOddsFooter(match);
      if (footer) card.appendChild(footer);
    }

    return card;
  }

  function renderMatchTeamRow(teamId, score, match, eliminated) {
    const team    = teamMap[teamId];
    if (!team) return el('div'); // safety

    const isElim  = eliminated.has(teamId) && match.status === 'finished';
    const owner   = team.owner ? playerMap[team.owner] : null;
    const colour  = owner ? owner.colour : 'var(--bar-none)';
    const isOwner = team.owner === activeFilter;

    const row = el('div', 'match-team-row');

    if (isElim && isOwner) {
      row.classList.add('is-highlight-elim');
      row.style.background = `rgba(${hexToRgb(colour)}, 0.08)`;
    } else if (activeFilter !== null && !isOwner) {
      row.classList.add('is-dim-filter');
    } else if (isElim) {
      row.classList.add('is-elim');
    } else if (activeFilter !== null && isOwner) {
      row.style.background = `rgba(${hexToRgb(colour)}, 0.08)`;
    }

    const bar = el('div', 'match-bar');
    bar.style.background = colour;

    const flag = el('span', 'match-flag', team.flag);

    const info = el('div', 'match-info');
    info.appendChild(el('div', 'match-team-name', team.name));
    if (owner) {
      info.appendChild(el('div', 'match-owner', owner.name));
    }

    const pill = el('div', score !== null ? 'score-pill' : 'score-pill no-score');
    pill.textContent = score !== null ? String(score) : '—';

    row.appendChild(bar);
    row.appendChild(flag);
    row.appendChild(info);
    row.appendChild(pill);
    return row;
  }

  // ── Tally page ───────────────────────────────────────

  function computeTeamsRemaining(eliminated) {
    const rem = {};
    DATA.players.forEach(p => {
      rem[p.name] = DATA.teams.filter(t => t.owner === p.name && !eliminated.has(t.id)).length;
    });
    return rem;
  }

  function computeTeamLastDates() {
    const dates = {};
    DATA.matches.forEach(m => {
      if (m.status !== 'finished') return;
      [m.homeTeam, m.awayTeam].forEach(tid => {
        if (!dates[tid] || m.kickoffUTC > dates[tid]) dates[tid] = m.kickoffUTC;
      });
    });
    return dates;
  }

  function playerElimDate(playerName, eliminated, teamLastDates) {
    const teams = DATA.teams.filter(t => t.owner === playerName);
    if (!teams.every(t => eliminated.has(t.id))) return null;
    let latest = null;
    teams.forEach(t => {
      const d = teamLastDates[t.id];
      if (d && (!latest || d > latest)) latest = d;
    });
    return latest;
  }

  function formatElimDate(utcISO) {
    const d   = new Date(utcISO);
    const nzt = new Date(d.getTime() + 12 * 60 * 60 * 1000);
    const mo  = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'][nzt.getUTCMonth()];
    return `${nzt.getUTCDate()} ${mo}`;
  }

  function computeTally() {
    const tally = {};
    DATA.players.forEach(p => {
      tally[p.name] = { wins: 0, draws: 0, losses: 0, played: 0 };
    });

    DATA.matches.forEach(m => {
      if (m.status !== 'finished') return;
      if (m.homeScore == null || m.awayScore == null) return;

      const homeTeam = teamMap[m.homeTeam];
      const awayTeam = teamMap[m.awayTeam];
      if (!homeTeam || !awayTeam) return;

      const addResult = (owner, result) => {
        if (!owner || !tally[owner]) return;
        tally[owner].played++;
        tally[owner][result]++;
      };

      if (m.homeScore > m.awayScore) {
        addResult(homeTeam.owner, 'wins');
        addResult(awayTeam.owner, 'losses');
      } else if (m.homeScore < m.awayScore) {
        addResult(homeTeam.owner, 'losses');
        addResult(awayTeam.owner, 'wins');
      } else {
        addResult(homeTeam.owner, 'draws');
        addResult(awayTeam.owner, 'draws');
      }
    });

    return tally;
  }

  function buildTallyCard(p, rank, t, teamsLeft, elimDate) {
    const card = el('div', 'tally-card');

    const bar = el('div', 'tally-bar');
    bar.style.background = p.colour;
    card.appendChild(bar);

    card.appendChild(el('div', 'tally-rank', rank !== null ? String(rank) : ''));

    const dot = el('span', 'tally-dot');
    dot.style.background = p.colour;
    const nameWrap = el('div', 'tally-name-wrap');
    nameWrap.appendChild(dot);
    nameWrap.appendChild(el('div', 'tally-name', p.name));
    card.appendChild(nameWrap);

    const statsGroup = el('div', 'tally-stats-group');
    const stats = el('div', 'tally-stats');
    [['W', t.wins, 'tally-stat--win'],
     ['D', t.draws, 'tally-stat--draw'],
     ['L', t.losses, 'tally-stat--loss']].forEach(([label, val, cls]) => {
      const stat = el('div', 'tally-stat ' + cls);
      stat.appendChild(el('span', 'tally-stat-val', String(val)));
      stat.appendChild(el('span', 'tally-stat-lbl', label));
      stats.appendChild(stat);
    });
    statsGroup.appendChild(stats);

    if (elimDate !== null) {
      const datePill = el('div', 'tally-elim-date');
      datePill.textContent = elimDate;
      statsGroup.appendChild(datePill);
    } else if (teamsLeft !== null) {
      const teamsStat = el('div', 'tally-stat tally-stat--teams');
      teamsStat.appendChild(el('span', 'tally-stat-val', String(teamsLeft)));
      teamsStat.appendChild(el('span', 'tally-stat-lbl', 'Left'));
      statsGroup.appendChild(teamsStat);
    }

    card.appendChild(statsGroup);
    return card;
  }

  function renderTallyPage() {
    const eliminated    = buildEliminatedSet();
    const tally         = computeTally();
    const teamsRem      = computeTeamsRemaining(eliminated);
    const teamLastDates = computeTeamLastDates();
    const wrap          = el('div', 'tally-page');

    wrap.appendChild(el('div', 'section-label', 'Standings'));

    const active = DATA.players.filter(p => teamsRem[p.name] > 0);
    const elimd  = DATA.players.filter(p => teamsRem[p.name] === 0);

    active.sort((a, b) => {
      const ta = tally[a.name], tb = tally[b.name];
      if (tb.wins   !== ta.wins)   return tb.wins   - ta.wins;
      if (tb.draws  !== ta.draws)  return tb.draws  - ta.draws;
      if (ta.losses !== tb.losses) return ta.losses - tb.losses;
      return DATA.players.indexOf(a) - DATA.players.indexOf(b);
    });

    const list = el('div', 'tally-list');
    active.forEach((p, i) => {
      list.appendChild(buildTallyCard(p, i + 1, tally[p.name], teamsRem[p.name], null));
    });
    wrap.appendChild(list);

    if (elimd.length) {
      const elimWithDates = elimd.map(p => ({
        player: p,
        date: playerElimDate(p.name, eliminated, teamLastDates)
      }));
      elimWithDates.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date > a.date ? 1 : b.date < a.date ? -1 : 0;
      });

      wrap.appendChild(el('div', 'section-label', 'Eliminated'));
      const elimList = el('div', 'tally-list');
      elimWithDates.forEach(({ player, date }) => {
        elimList.appendChild(
          buildTallyCard(player, null, tally[player.name], null,
                         date ? formatElimDate(date) : null)
        );
      });
      wrap.appendChild(elimList);
    }

    if (DATA.matches.filter(m => m.status === 'finished').length === 0) {
      const note = el('div', 'tally-empty');
      note.textContent = 'No results yet — check back once matches kick off.';
      wrap.appendChild(note);
    }

    return wrap;
  }

  // ── Placeholder ──────────────────────────────────────

  function renderPlaceholder() {
    const wrap = el('div', 'placeholder-wrap');
    const card = el('div', 'placeholder-card');
    card.innerHTML =
      'Bracket fills as teams advance' +
      '<strong>Final &nbsp;·&nbsp; Sun 19 Jul &nbsp;·&nbsp; 11:00 AM NZT</strong>';
    wrap.appendChild(card);
    return wrap;
  }

  // ── Init ────────────────────────────────────────────

  function init() {
    DATA.players.forEach(p => { playerMap[p.name] = p; });
    DATA.teams.forEach(t   => { teamMap[t.id]     = t; });
    render();
  }

  init();

  // Expose render globally so syncClient.js can trigger re-renders
  window.render = render;
})();
