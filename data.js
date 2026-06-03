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
  // Matches are populated automatically by the API sync (syncClient.js).
  // Add manual overrides here only if the API is missing data.
  matches: [],

  // Manual override: add team IDs here to mark them eliminated
  // regardless of match data (e.g. after group stage is complete)
  eliminated: []
};
