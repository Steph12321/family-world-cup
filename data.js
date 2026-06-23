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
    // ── Group A ──────────────────────────────────────────────
    { id: "mex", name: "Mexico",     flag: "🇲🇽", group: "A", owner: "Scarlett" },
    { id: "rsa", name: "S. Africa",  flag: "🇿🇦", group: "A", owner: "Leo"      },
    { id: "kor", name: "S. Korea",   flag: "🇰🇷", group: "A", owner: "Leo"      },
    { id: "cze", name: "Czechia",    flag: "🇨🇿", group: "A", owner: "Steph"    },
    // ── Group B ──────────────────────────────────────────────
    { id: "can", name: "Canada",     flag: "🇨🇦", group: "B", owner: "Sienna"   },
    { id: "bih", name: "Bosnia",     flag: "🇧🇦", group: "B", owner: "Steph"    },
    { id: "qat", name: "Qatar",      flag: "🇶🇦", group: "B", owner: "Steph"    },
    { id: "sui", name: "Switzerland",flag: "🇨🇭", group: "B", owner: "Wayne"    },
    // ── Group C ──────────────────────────────────────────────
    { id: "bra", name: "Brazil",     flag: "🇧🇷", group: "C", owner: "Kay"      },
    { id: "mar", name: "Morocco",    flag: "🇲🇦", group: "C", owner: "Wayne"    },
    { id: "hai", name: "Haiti",      flag: "🇭🇹", group: "C", owner: "AJ"       },
    { id: "sco", name: "Scotland",   flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", owner: "Wayne"    },
    // ── Group D ──────────────────────────────────────────────
    { id: "usa", name: "USA",        flag: "🇺🇸", group: "D", owner: "Kay"      },
    { id: "par", name: "Paraguay",   flag: "🇵🇾", group: "D", owner: null       },
    { id: "aus", name: "Australia",  flag: "🇦🇺", group: "D", owner: "Kezia"    },
    { id: "tur", name: "Turkey",     flag: "🇹🇷", group: "D", owner: "Kezia"    },
    // ── Group E ──────────────────────────────────────────────
    { id: "ger", name: "Germany",    flag: "🇩🇪", group: "E", owner: "Sienna"   },
    { id: "cuw", name: "Curaçao",    flag: "🇨🇼", group: "E", owner: "Kezia"    },
    { id: "civ", name: "Iv. Coast",  flag: "🇨🇮", group: "E", owner: "Scarlett" },
    { id: "ecu", name: "Ecuador",    flag: "🇪🇨", group: "E", owner: "Sienna"   },
    // ── Group F ──────────────────────────────────────────────
    { id: "ned", name: "Netherlands",flag: "🇳🇱", group: "F", owner: "Kezia"    },
    { id: "jpn", name: "Japan",      flag: "🇯🇵", group: "F", owner: "Kim"      },
    { id: "swe", name: "Sweden",     flag: "🇸🇪", group: "F", owner: null       },
    { id: "tun", name: "Tunisia",    flag: "🇹🇳", group: "F", owner: "Kim"      },
    // ── Group G ──────────────────────────────────────────────
    { id: "bel", name: "Belgium",    flag: "🇧🇪", group: "G", owner: "Steph"    },
    { id: "egy", name: "Egypt",      flag: "🇪🇬", group: "G", owner: "AJ"       },
    { id: "irn", name: "Iran",       flag: "🇮🇷", group: "G", owner: "Steph"    },
    { id: "nzl", name: "New Zealand",flag: "🇳🇿", group: "G", owner: "Leo"      },
    // ── Group H ──────────────────────────────────────────────
    { id: "esp", name: "Spain",      flag: "🇪🇸", group: "H", owner: "AJ"       },
    { id: "cpv", name: "Cabo Verde", flag: "🇨🇻", group: "H", owner: "Kim"      },
    { id: "ksa", name: "S. Arabia",  flag: "🇸🇦", group: "H", owner: null       },
    { id: "uru", name: "Uruguay",    flag: "🇺🇾", group: "H", owner: "Leo"      },
    // ── Group I ──────────────────────────────────────────────
    { id: "fra", name: "France",     flag: "🇫🇷", group: "I", owner: "AJ"       },
    { id: "sen", name: "Senegal",    flag: "🇸🇳", group: "I", owner: "Wayne"    },
    { id: "irq", name: "Iraq",       flag: "🇮🇶", group: "I", owner: "Sienna"   },
    { id: "nor", name: "Norway",     flag: "🇳🇴", group: "I", owner: "Kay"      },
    // ── Group J ──────────────────────────────────────────────
    { id: "arg", name: "Argentina",  flag: "🇦🇷", group: "J", owner: "Scarlett" },
    { id: "alg", name: "Algeria",    flag: "🇩🇿", group: "J", owner: "AJ"       },
    { id: "aut", name: "Austria",    flag: "🇦🇹", group: "J", owner: "Kay"      },
    { id: "jor", name: "Jordan",     flag: "🇯🇴", group: "J", owner: "Wayne"    },
    // ── Group K ──────────────────────────────────────────────
    { id: "por", name: "Portugal",   flag: "🇵🇹", group: "K", owner: "Kezia"    },
    { id: "cod", name: "DR Congo",   flag: "🇨🇩", group: "K", owner: "Kim"      },
    { id: "uzb", name: "Uzbekistan", flag: "🇺🇿", group: "K", owner: "Sienna"   },
    { id: "col", name: "Colombia",   flag: "🇨🇴", group: "K", owner: "Kim"      },
    // ── Group L ──────────────────────────────────────────────
    { id: "eng", name: "England",    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", owner: "Leo"      },
    { id: "cro", name: "Croatia",    flag: "🇭🇷", group: "L", owner: "Scarlett" },
    { id: "gha", name: "Ghana",      flag: "🇬🇭", group: "L", owner: "Scarlett" },
    { id: "pan", name: "Panama",     flag: "🇵🇦", group: "L", owner: "Kay"      }
  ],

  // stage: "Group A"–"Group L" | "Round of 32" | "Round of 16" |
  //        "Quarter-finals" | "Semi-finals" | "Final"
  // status: "scheduled" | "live" | "finished"
  // homeScore / awayScore: number or null
  matches: [

    // ── Group A ──────────────────────────────────────────────
    // MD1
    { id: "gs_a1", stage: "Group A", homeTeam: "mex", awayTeam: "rsa", kickoffUTC: "2026-06-11T19:00:00Z", homeScore: 2, awayScore: 0, status: "finished" },
    { id: "gs_a2", stage: "Group A", homeTeam: "kor", awayTeam: "cze", kickoffUTC: "2026-06-12T02:00:00Z", homeScore: 2, awayScore: 1, status: "finished" },
    // MD2
    { id: "gs_a3", stage: "Group A", homeTeam: "cze", awayTeam: "rsa", kickoffUTC: "2026-06-18T16:00:00Z", homeScore: 1, awayScore: 1, status: "finished" },
    { id: "gs_a4", stage: "Group A", homeTeam: "mex", awayTeam: "kor", kickoffUTC: "2026-06-19T01:00:00Z", homeScore: 1, awayScore: 0, status: "finished" },
    // MD3
    { id: "gs_a5", stage: "Group A", homeTeam: "cze", awayTeam: "mex", kickoffUTC: "2026-06-25T01:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_a6", stage: "Group A", homeTeam: "rsa", awayTeam: "kor", kickoffUTC: "2026-06-25T01:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group B ──────────────────────────────────────────────
    // MD1
    { id: "gs_b1", stage: "Group B", homeTeam: "can", awayTeam: "bih", kickoffUTC: "2026-06-12T19:00:00Z", homeScore: 1, awayScore: 1, status: "finished" },
    { id: "gs_b2", stage: "Group B", homeTeam: "qat", awayTeam: "sui", kickoffUTC: "2026-06-13T19:00:00Z", homeScore: 1, awayScore: 1, status: "finished" },
    // MD2
    { id: "gs_b3", stage: "Group B", homeTeam: "sui", awayTeam: "bih", kickoffUTC: "2026-06-18T19:00:00Z", homeScore: 4, awayScore: 1, status: "finished" },
    { id: "gs_b4", stage: "Group B", homeTeam: "can", awayTeam: "qat", kickoffUTC: "2026-06-18T22:00:00Z", homeScore: 6, awayScore: 0, status: "finished" },
    // MD3
    { id: "gs_b5", stage: "Group B", homeTeam: "sui", awayTeam: "can", kickoffUTC: "2026-06-24T19:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_b6", stage: "Group B", homeTeam: "bih", awayTeam: "qat", kickoffUTC: "2026-06-24T19:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group C ──────────────────────────────────────────────
    // MD1
    { id: "gs_c1", stage: "Group C", homeTeam: "bra", awayTeam: "mar", kickoffUTC: "2026-06-13T22:00:00Z", homeScore: 1, awayScore: 1, status: "finished" },
    { id: "gs_c2", stage: "Group C", homeTeam: "hai", awayTeam: "sco", kickoffUTC: "2026-06-14T01:00:00Z", homeScore: 0, awayScore: 1, status: "finished" },
    // MD2
    { id: "gs_c3", stage: "Group C", homeTeam: "sco", awayTeam: "mar", kickoffUTC: "2026-06-19T22:00:00Z", homeScore: 0, awayScore: 1, status: "finished" },
    { id: "gs_c4", stage: "Group C", homeTeam: "bra", awayTeam: "hai", kickoffUTC: "2026-06-20T01:00:00Z", homeScore: 3, awayScore: 0, status: "finished" },
    // MD3
    { id: "gs_c5", stage: "Group C", homeTeam: "sco", awayTeam: "bra", kickoffUTC: "2026-06-24T22:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_c6", stage: "Group C", homeTeam: "mar", awayTeam: "hai", kickoffUTC: "2026-06-24T22:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group D ──────────────────────────────────────────────
    // MD1
    { id: "gs_d1", stage: "Group D", homeTeam: "usa", awayTeam: "par", kickoffUTC: "2026-06-13T01:00:00Z", homeScore: 4, awayScore: 1, status: "finished" },
    { id: "gs_d2", stage: "Group D", homeTeam: "aus", awayTeam: "tur", kickoffUTC: "2026-06-14T04:00:00Z", homeScore: 2, awayScore: 0, status: "finished" },
    // MD2
    { id: "gs_d3", stage: "Group D", homeTeam: "usa", awayTeam: "aus", kickoffUTC: "2026-06-19T19:00:00Z", homeScore: 2, awayScore: 0, status: "finished" },
    { id: "gs_d4", stage: "Group D", homeTeam: "tur", awayTeam: "par", kickoffUTC: "2026-06-20T04:00:00Z", homeScore: 0, awayScore: 1, status: "finished" },
    // MD3
    { id: "gs_d5", stage: "Group D", homeTeam: "tur", awayTeam: "usa", kickoffUTC: "2026-06-26T02:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_d6", stage: "Group D", homeTeam: "par", awayTeam: "aus", kickoffUTC: "2026-06-26T02:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group E ──────────────────────────────────────────────
    // MD1
    { id: "gs_e1", stage: "Group E", homeTeam: "ger", awayTeam: "cuw", kickoffUTC: "2026-06-14T17:00:00Z", homeScore: 7, awayScore: 1, status: "finished" },
    { id: "gs_e2", stage: "Group E", homeTeam: "civ", awayTeam: "ecu", kickoffUTC: "2026-06-14T23:00:00Z", homeScore: 1, awayScore: 0, status: "finished" },
    // MD2
    { id: "gs_e3", stage: "Group E", homeTeam: "ger", awayTeam: "civ", kickoffUTC: "2026-06-20T20:00:00Z", homeScore: 2, awayScore: 1, status: "finished" },
    { id: "gs_e4", stage: "Group E", homeTeam: "ecu", awayTeam: "cuw", kickoffUTC: "2026-06-21T00:00:00Z", homeScore: 0, awayScore: 0, status: "finished" },
    // MD3
    { id: "gs_e5", stage: "Group E", homeTeam: "ecu", awayTeam: "ger", kickoffUTC: "2026-06-25T20:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_e6", stage: "Group E", homeTeam: "cuw", awayTeam: "civ", kickoffUTC: "2026-06-25T20:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group F ──────────────────────────────────────────────
    // MD1
    { id: "gs_f1", stage: "Group F", homeTeam: "ned", awayTeam: "jpn", kickoffUTC: "2026-06-14T20:00:00Z", homeScore: 2, awayScore: 2, status: "finished" },
    { id: "gs_f2", stage: "Group F", homeTeam: "swe", awayTeam: "tun", kickoffUTC: "2026-06-15T02:00:00Z", homeScore: 5, awayScore: 1, status: "finished" },
    // MD2
    { id: "gs_f3", stage: "Group F", homeTeam: "ned", awayTeam: "swe", kickoffUTC: "2026-06-20T17:00:00Z", homeScore: 5, awayScore: 1, status: "finished" },
    { id: "gs_f4", stage: "Group F", homeTeam: "tun", awayTeam: "jpn", kickoffUTC: "2026-06-21T04:00:00Z", homeScore: 0, awayScore: 4, status: "finished" },
    // MD3
    { id: "gs_f5", stage: "Group F", homeTeam: "jpn", awayTeam: "swe", kickoffUTC: "2026-06-25T23:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_f6", stage: "Group F", homeTeam: "tun", awayTeam: "ned", kickoffUTC: "2026-06-25T23:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group G ──────────────────────────────────────────────
    // MD1
    { id: "gs_g1", stage: "Group G", homeTeam: "bel", awayTeam: "egy", kickoffUTC: "2026-06-15T19:00:00Z", homeScore: 1, awayScore: 1, status: "finished" },
    { id: "gs_g2", stage: "Group G", homeTeam: "irn", awayTeam: "nzl", kickoffUTC: "2026-06-16T01:00:00Z", homeScore: 2, awayScore: 2, status: "finished" },
    // MD2
    { id: "gs_g3", stage: "Group G", homeTeam: "bel", awayTeam: "irn", kickoffUTC: "2026-06-21T19:00:00Z", homeScore: 0, awayScore: 0, status: "finished" },
    { id: "gs_g4", stage: "Group G", homeTeam: "nzl", awayTeam: "egy", kickoffUTC: "2026-06-22T01:00:00Z", homeScore: 1, awayScore: 3, status: "finished" },
    // MD3
    { id: "gs_g5", stage: "Group G", homeTeam: "egy", awayTeam: "irn", kickoffUTC: "2026-06-27T03:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_g6", stage: "Group G", homeTeam: "nzl", awayTeam: "bel", kickoffUTC: "2026-06-27T03:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group H ──────────────────────────────────────────────
    // MD1
    { id: "gs_h1", stage: "Group H", homeTeam: "esp", awayTeam: "cpv", kickoffUTC: "2026-06-15T16:00:00Z", homeScore: 0, awayScore: 0, status: "finished" },
    { id: "gs_h2", stage: "Group H", homeTeam: "ksa", awayTeam: "uru", kickoffUTC: "2026-06-15T22:00:00Z", homeScore: 1, awayScore: 1, status: "finished" },
    // MD2
    { id: "gs_h3", stage: "Group H", homeTeam: "esp", awayTeam: "ksa", kickoffUTC: "2026-06-21T16:00:00Z", homeScore: 4, awayScore: 0, status: "finished" },
    { id: "gs_h4", stage: "Group H", homeTeam: "uru", awayTeam: "cpv", kickoffUTC: "2026-06-21T22:00:00Z", homeScore: 2, awayScore: 2, status: "finished" },
    // MD3
    { id: "gs_h5", stage: "Group H", homeTeam: "cpv", awayTeam: "ksa", kickoffUTC: "2026-06-27T00:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_h6", stage: "Group H", homeTeam: "uru", awayTeam: "esp", kickoffUTC: "2026-06-27T00:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group I ──────────────────────────────────────────────
    // MD1
    { id: "gs_i1", stage: "Group I", homeTeam: "fra", awayTeam: "sen", kickoffUTC: "2026-06-16T19:00:00Z", homeScore: 3, awayScore: 1, status: "finished" },
    { id: "gs_i2", stage: "Group I", homeTeam: "irq", awayTeam: "nor", kickoffUTC: "2026-06-16T22:00:00Z", homeScore: 1, awayScore: 4, status: "finished" },
    // MD2
    { id: "gs_i3", stage: "Group I", homeTeam: "fra", awayTeam: "irq", kickoffUTC: "2026-06-22T21:00:00Z", homeScore: 3, awayScore: 0, status: "finished" },
    { id: "gs_i4", stage: "Group I", homeTeam: "nor", awayTeam: "sen", kickoffUTC: "2026-06-23T00:00:00Z", homeScore: 3, awayScore: 2, status: "finished" },
    // MD3
    { id: "gs_i5", stage: "Group I", homeTeam: "nor", awayTeam: "fra", kickoffUTC: "2026-06-26T19:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_i6", stage: "Group I", homeTeam: "sen", awayTeam: "irq", kickoffUTC: "2026-06-26T19:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group J ──────────────────────────────────────────────
    // MD1
    { id: "gs_j1", stage: "Group J", homeTeam: "arg", awayTeam: "alg", kickoffUTC: "2026-06-17T01:00:00Z", homeScore: 3, awayScore: 0, status: "finished" },
    { id: "gs_j2", stage: "Group J", homeTeam: "aut", awayTeam: "jor", kickoffUTC: "2026-06-17T04:00:00Z", homeScore: 3, awayScore: 1, status: "finished" },
    // MD2
    { id: "gs_j3", stage: "Group J", homeTeam: "arg", awayTeam: "aut", kickoffUTC: "2026-06-22T17:00:00Z", homeScore: 2, awayScore: 0, status: "finished" },
    { id: "gs_j4", stage: "Group J", homeTeam: "jor", awayTeam: "alg", kickoffUTC: "2026-06-23T03:00:00Z", homeScore: 1, awayScore: 2, status: "finished" },
    // MD3
    { id: "gs_j5", stage: "Group J", homeTeam: "alg", awayTeam: "aut", kickoffUTC: "2026-06-28T02:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_j6", stage: "Group J", homeTeam: "jor", awayTeam: "arg", kickoffUTC: "2026-06-28T02:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group K ──────────────────────────────────────────────
    // MD1
    { id: "gs_k1", stage: "Group K", homeTeam: "por", awayTeam: "cod", kickoffUTC: "2026-06-17T17:00:00Z", homeScore: 1, awayScore: 1, status: "finished" },
    { id: "gs_k2", stage: "Group K", homeTeam: "uzb", awayTeam: "col", kickoffUTC: "2026-06-18T02:00:00Z", homeScore: 1, awayScore: 3, status: "finished" },
    // MD2
    { id: "gs_k3", stage: "Group K", homeTeam: "por", awayTeam: "uzb", kickoffUTC: "2026-06-23T17:00:00Z", homeScore: 1, awayScore: 0, status: "finished" },
    { id: "gs_k4", stage: "Group K", homeTeam: "col", awayTeam: "cod", kickoffUTC: "2026-06-24T02:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    // MD3
    { id: "gs_k5", stage: "Group K", homeTeam: "col", awayTeam: "por", kickoffUTC: "2026-06-27T23:30:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_k6", stage: "Group K", homeTeam: "cod", awayTeam: "uzb", kickoffUTC: "2026-06-27T23:30:00Z", homeScore: null, awayScore: null, status: "scheduled" },

    // ── Group L ──────────────────────────────────────────────
    // MD1
    { id: "gs_l1", stage: "Group L", homeTeam: "eng", awayTeam: "cro", kickoffUTC: "2026-06-17T20:00:00Z", homeScore: 4, awayScore: 2, status: "finished" },
    { id: "gs_l2", stage: "Group L", homeTeam: "gha", awayTeam: "pan", kickoffUTC: "2026-06-17T23:00:00Z", homeScore: 1, awayScore: 0, status: "finished" },
    // MD2
    { id: "gs_l3", stage: "Group L", homeTeam: "eng", awayTeam: "gha", kickoffUTC: "2026-06-23T20:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_l4", stage: "Group L", homeTeam: "pan", awayTeam: "cro", kickoffUTC: "2026-06-23T23:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    // MD3
    { id: "gs_l5", stage: "Group L", homeTeam: "pan", awayTeam: "eng", kickoffUTC: "2026-06-27T21:00:00Z", homeScore: null, awayScore: null, status: "scheduled" },
    { id: "gs_l6", stage: "Group L", homeTeam: "cro", awayTeam: "gha", kickoffUTC: "2026-06-27T21:00:00Z", homeScore: null, awayScore: null, status: "scheduled" }

  ],

  // Manual override: add team IDs here to mark them eliminated
  // regardless of match data (e.g. after group stage is complete)
  eliminated: []
};
