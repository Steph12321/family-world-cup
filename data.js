// data.js — update this file to reflect new results and team status

const DATA = {

  players: [
    { name: "Kay",      colour: "#ef4444" },
    { name: "Wayne",    colour: "#3b82f6" },
    { name: "Kim",      colour: "#10b981" },
    { name: "Steph",    colour: "#facc15" },
    { name: "AJ",       colour: "#a78bfa" },
    { name: "Kezia",    colour: "#f59e0b" },
    { name: "Scarlett", colour: "#ec4899" },
    { name: "Sienna",   colour: "#06b6d4" },
    { name: "Leo",      colour: "#84cc16" }
  ],

  // owner: player name string, or null for unowned
  teams: [
    // ── Group A  (CONCACAF) ──────────────────────────────────
    { id: "usa", name: "USA",       flag: "🇺🇸", group: "A", owner: "Kay"      },
    { id: "can", name: "Canada",    flag: "🇨🇦", group: "A", owner: "Sienna"   },
    { id: "mex", name: "Mexico",    flag: "🇲🇽", group: "A", owner: "Scarlett" },
    { id: "pan", name: "Panama",    flag: "🇵🇦", group: "A", owner: "Kay"      },
    // ── Group B  (British Isles / Scandinavia) ───────────────
    { id: "eng", name: "England",   flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "B", owner: "Leo"     },
    { id: "sco", name: "Scotland",  flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "B", owner: "Wayne"   },
    { id: "nor", name: "Norway",    flag: "🇳🇴", group: "B", owner: "Kay"      },
    { id: "swe", name: "Sweden",    flag: "🇸🇪", group: "B", owner: null       },
    // ── Group C  (Iberia / Balkans) ──────────────────────────
    { id: "esp", name: "Spain",     flag: "🇪🇸", group: "C", owner: "AJ"      },
    { id: "por", name: "Portugal",  flag: "🇵🇹", group: "C", owner: "Kezia"   },
    { id: "tur", name: "Turkey",    flag: "🇹🇷", group: "C", owner: "Kezia"   },
    { id: "bih", name: "Bosnia",    flag: "🇧🇦", group: "C", owner: "Steph"   },
    // ── Group D  (Western Europe) ────────────────────────────
    { id: "fra", name: "France",    flag: "🇫🇷", group: "D", owner: "AJ"      },
    { id: "ned", name: "Netherlands",flag:"🇳🇱", group: "D", owner: "Kezia"   },
    { id: "cze", name: "Czechia",   flag: "🇨🇿", group: "D", owner: "Steph"   },
    { id: "cro", name: "Croatia",   flag: "🇭🇷", group: "D", owner: "Scarlett"},
    // ── Group E  (Central Europe) ────────────────────────────
    { id: "ger", name: "Germany",   flag: "🇩🇪", group: "E", owner: "Sienna"  },
    { id: "aut", name: "Austria",   flag: "🇦🇹", group: "E", owner: "Kay"     },
    { id: "sui", name: "Switzerland",flag:"🇨🇭", group: "E", owner: "Wayne"   },
    { id: "bel", name: "Belgium",   flag: "🇧🇪", group: "E", owner: "Steph"   },
    // ── Group F  (South America) ─────────────────────────────
    { id: "bra", name: "Brazil",    flag: "🇧🇷", group: "F", owner: "Kay"     },
    { id: "arg", name: "Argentina", flag: "🇦🇷", group: "F", owner: "Scarlett"},
    { id: "uru", name: "Uruguay",   flag: "🇺🇾", group: "F", owner: "Leo"     },
    { id: "ecu", name: "Ecuador",   flag: "🇪🇨", group: "F", owner: "Sienna"  },
    // ── Group G  (Africa / Maghreb) ──────────────────────────
    { id: "mar", name: "Morocco",   flag: "🇲🇦", group: "G", owner: "Wayne"   },
    { id: "alg", name: "Algeria",   flag: "🇩🇿", group: "G", owner: "AJ"      },
    { id: "sen", name: "Senegal",   flag: "🇸🇳", group: "G", owner: "Wayne"   },
    { id: "tun", name: "Tunisia",   flag: "🇹🇳", group: "G", owner: "Kim"     },
    // ── Group H  (Africa / West) ─────────────────────────────
    { id: "col", name: "Colombia",  flag: "🇨🇴", group: "H", owner: "Kim"     },
    { id: "civ", name: "Iv. Coast", flag: "🇨🇮", group: "H", owner: "Scarlett"},
    { id: "gha", name: "Ghana",     flag: "🇬🇭", group: "H", owner: "Scarlett"},
    { id: "cod", name: "DR Congo",  flag: "🇨🇩", group: "H", owner: "Kim"     },
    // ── Group I  (Asia / East) ───────────────────────────────
    { id: "jpn", name: "Japan",     flag: "🇯🇵", group: "I", owner: "Kim"     },
    { id: "kor", name: "S. Korea",  flag: "🇰🇷", group: "I", owner: "Leo"     },
    { id: "irq", name: "Iraq",      flag: "🇮🇶", group: "I", owner: "Sienna"  },
    { id: "jor", name: "Jordan",    flag: "🇯🇴", group: "I", owner: "Wayne"   },
    // ── Group J  (Middle East) ───────────────────────────────
    { id: "irn", name: "Iran",      flag: "🇮🇷", group: "J", owner: "Steph"   },
    { id: "qat", name: "Qatar",     flag: "🇶🇦", group: "J", owner: "Steph"   },
    { id: "ksa", name: "S. Arabia", flag: "🇸🇦", group: "J", owner: null      },
    { id: "egy", name: "Egypt",     flag: "🇪🇬", group: "J", owner: "AJ"      },
    // ── Group K  (Oceania / Central Asia) ────────────────────
    { id: "aus", name: "Australia", flag: "🇦🇺", group: "K", owner: "Kezia"   },
    { id: "nzl", name: "New Zealand",flag:"🇳🇿", group: "K", owner: "Leo"     },
    { id: "uzb", name: "Uzbekistan",flag: "🇺🇿", group: "K", owner: "Sienna"  },
    { id: "cpv", name: "Cabo Verde",flag: "🇨🇻", group: "K", owner: "Kim"     },
    // ── Group L  (Americas / Caribbean) ─────────────────────
    { id: "rsa", name: "S. Africa", flag: "🇿🇦", group: "L", owner: "Leo"     },
    { id: "hai", name: "Haiti",     flag: "🇭🇹", group: "L", owner: "AJ"      },
    { id: "cuw", name: "Curaçao",   flag: "🇨🇼", group: "L", owner: "Kezia"   },
    { id: "par", name: "Paraguay",  flag: "🇵🇾", group: "L", owner: null      }
  ],

  // stage: "Group A"–"Group L" | "Round of 32" | "Round of 16" |
  //        "Quarter-finals" | "Semi-finals" | "Final"
  // status: "scheduled" | "live" | "finished"
  // homeScore / awayScore: number or null
  matches: [
    // ── Sample group stage fixtures ──────────────────────────
    {
      id: "gs_a1",
      stage: "Group A",
      homeTeam: "usa",
      awayTeam: "pan",
      kickoffUTC: "2026-06-11T20:00:00Z",
      homeScore: 2,
      awayScore: 0,
      status: "finished"
    },
    {
      id: "gs_b1",
      stage: "Group B",
      homeTeam: "eng",
      awayTeam: "sco",
      kickoffUTC: "2026-06-11T23:00:00Z",
      homeScore: 1,
      awayScore: 0,
      status: "finished"
    },
    {
      id: "gs_e1",
      stage: "Group E",
      homeTeam: "ger",
      awayTeam: "bel",
      kickoffUTC: "2026-06-12T20:00:00Z",
      homeScore: 1,
      awayScore: 0,
      status: "live"
    },
    {
      id: "gs_f1",
      stage: "Group F",
      homeTeam: "bra",
      awayTeam: "arg",
      kickoffUTC: "2026-06-12T23:00:00Z",
      homeScore: null,
      awayScore: null,
      status: "scheduled"
    },
    {
      id: "gs_d1",
      stage: "Group D",
      homeTeam: "fra",
      awayTeam: "cro",
      kickoffUTC: "2026-06-13T20:00:00Z",
      homeScore: null,
      awayScore: null,
      status: "scheduled"
    },
    {
      id: "gs_g1",
      stage: "Group G",
      homeTeam: "mar",
      awayTeam: "sen",
      kickoffUTC: "2026-06-13T23:00:00Z",
      homeScore: null,
      awayScore: null,
      status: "scheduled"
    },
    {
      id: "gs_i1",
      stage: "Group I",
      homeTeam: "jpn",
      awayTeam: "kor",
      kickoffUTC: "2026-06-14T17:00:00Z",
      homeScore: null,
      awayScore: null,
      status: "scheduled"
    },
    {
      id: "gs_j1",
      stage: "Group J",
      homeTeam: "irn",
      awayTeam: "egy",
      kickoffUTC: "2026-06-14T20:00:00Z",
      homeScore: null,
      awayScore: null,
      status: "scheduled"
    }
    // Add Round of 32 / knockout matches here as they happen:
    // {
    //   id: "r32_01",
    //   stage: "Round of 32",
    //   homeTeam: "bra",
    //   awayTeam: "eng",
    //   kickoffUTC: "2026-06-29T17:00:00Z",
    //   homeScore: null,
    //   awayScore: null,
    //   status: "scheduled"
    // },
  ],

  // Manual override: add team IDs here to mark them eliminated
  // regardless of match data (e.g. after group stage is complete)
  eliminated: []
};
