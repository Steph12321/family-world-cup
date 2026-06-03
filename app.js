// app.js — all rendering driven from DATA in data.js

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────
  let activeFilter = null; // null = All, or player name string

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
    app.appendChild(renderLegend());
    app.appendChild(renderGroupSection(eliminated));
    app.appendChild(renderKnockoutSections(eliminated));
    app.appendChild(renderPlaceholder());
  }

  // ── Header ──────────────────────────────────────────

  function renderHeader() {
    const header = el('header', 'header');
    const row    = el('div', 'header-row');
    const left   = el('div');

    left.appendChild(el('div', 'header-title', 'Family Cup 2026 ⚽'));
    left.appendChild(el('div', 'header-sub', '9 players · 48 teams · NZT'));
    row.appendChild(left);

    if (anyLive()) {
      const badge = el('div', 'live-badge');
      badge.appendChild(el('div', 'live-dot'));
      badge.appendChild(document.createTextNode('Live'));
      row.appendChild(badge);
    }

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

  // ── Group section ────────────────────────────────────

  function renderGroupSection(eliminated) {
    const wrap = el('div');

    wrap.appendChild(el('div', 'section-label', 'Group Stage'));

    // 3-column grid
    const grid = el('div', 'group-grid');
    ['A','B','C','D','E','F','G','H','I','J','K','L'].forEach(letter => {
      const groupTeams = DATA.teams.filter(t => t.group === letter);
      grid.appendChild(renderGroupCard(letter, groupTeams, eliminated));
    });
    wrap.appendChild(grid);

    // Group stage match cards (sample fixtures / results)
    const groupMatches = DATA.matches.filter(m => m.stage.startsWith('Group'));
    if (groupMatches.length) {
      // Sort: finished first, then live, then scheduled; within each by kickoff
      const order = { finished: 0, live: 1, scheduled: 2 };
      const sorted = [...groupMatches].sort((a, b) => {
        if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
        return new Date(a.kickoffUTC) - new Date(b.kickoffUTC);
      });

      const subLabel = el('div', 'section-label', 'Fixtures & Results');
      subLabel.style.paddingTop = '18px';
      wrap.appendChild(subLabel);

      const list = el('div', 'matches-list');
      sorted.forEach(m => list.appendChild(renderMatchCard(m, eliminated)));
      wrap.appendChild(list);
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
    } else if (isElim) {
      row.classList.add('is-elim');
    } else if (activeFilter !== null && isOwner) {
      row.style.background = `rgba(${hexToRgb(colour)}, 0.11)`;
    } else if (activeFilter !== null && !isOwner) {
      row.classList.add('is-dim-filter');
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

      wrap.appendChild(el('div', 'section-label', stage));

      const list = el('div', 'matches-list');
      stageMatches.forEach(m => list.appendChild(renderMatchCard(m, eliminated)));
      wrap.appendChild(list);
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
    } else if (isElim) {
      row.classList.add('is-elim');
    } else if (activeFilter !== null && isOwner) {
      row.style.background = `rgba(${hexToRgb(colour)}, 0.08)`;
    } else if (activeFilter !== null && !isOwner) {
      row.classList.add('is-dim-filter');
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
