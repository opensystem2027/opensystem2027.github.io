/*
 * Workshop content
 * ----------------
 * Most wording and all information that will change over time live in this
 * file. Update the values below; the page layout does not need to be edited.
 */

export const workshop = {
  formalName: "International Workshop on the GKLS Equation and Beyond",
  heroTitle: "International Workshop on the GKLS Equation and Beyond",
  date: "8–10 March 2027",
  registrationDeadline: "31 January 2027",
  abstractDeadline: "15 January 2027",
  venueShort: "RIKEN Wako Campus, Saitama, Japan",
  venueName: "RIKEN Wako Campus",
  venueRoom: "Large Conference Room, 2F, Administrative Headquarters (C00)",
  venueAddress: "2-1 Hirosawa, Wako, Saitama 351-0198, Japan",
  format: "In person",
  language: "English",
  expectedParticipants: "Approximately 50",
  summary:
    "The GKLS equation, formulated fifty years ago, established the standard framework for the Markovian dynamics of open quantum systems. This workshop will discuss further developments in open quantum systems, with a focus on non-Markovian dynamics and related developments in the GKLS framework. Related topics include the application of the GKLS equation and information aspects of quantum many-body physics.",
};

export const topics = [
  "Non-Markovian dynamics of open quantum systems",
  "GKLS equation",
  "Quantum information and correlations",
  "Experimental approaches to open quantum systems",
];

export type Speaker = {
  name: string;
  affiliation: string;
  photo?: string;
  talkTitle?: string;
};

/*
 * Add confirmed invited speakers here. Example:
 * { name: "Full Name", affiliation: "University", photo: "/speakers/name.jpg",
 *   talkTitle: "Title of the talk" }
 */
export const invitedSpeakers: Speaker[] = [
  {
    name: "Dariusz Chruściński",
    affiliation: "Nicolaus Copernicus University",
  },
  {
    name: "Ryusuke Hamazaki",
    affiliation: "RIKEN",
  },
  {
    name: "Naomichi Hatano",
    affiliation: "The University of Tokyo",
  },
  {
    name: "Gen Kimura",
    affiliation: "Tohoku University",
  },
  {
    name: "Neill Lambert",
    affiliation: "RIKEN",
  },
  {
    name: "Kavan Modi",
    affiliation: "Singapore University of Technology and Design",
  },
  {
    name: "Takashi Mori",
    affiliation: "Keio University",
  },
  {
    name: "Andrea Smirne",
    affiliation: "University of Milan",
  },
  {
    name: "Chikako Uchiyama",
    affiliation: "University of Yamanashi",
  },
];

export type ProgramItem = {
  time: string;
  type: "Talk" | "Break" | "Poster session" | "Other";
  speaker?: string;
  title: string;
};

export type ProgramDay = {
  date: string;
  label: string;
  items: ProgramItem[];
};

/* Provisional schedule. Update sessions as the program is confirmed. */
export const programDays: ProgramDay[] = [
  {
    "date": "Monday, 8 March 2027",
    "label": "Day 1",
    "items": [
      {
        "time": "9:30–9:40",
        "type": "Other",
        "title": "Opening"
      },
      {
        "time": "9:40–10:40",
        "type": "Talk",
        "title": "Invited talk (60 min)"
      },
      {
        "time": "10:40–11:10",
        "type": "Break",
        "title": "Coffee break"
      },
      {
        "time": "11:10–11:50",
        "type": "Talk",
        "title": "Invited talk (40 min)"
      },
      {
        "time": "11:50–12:30",
        "type": "Talk",
        "title": "Invited talk (40 min)"
      },
      {
        "time": "12:30–14:00",
        "type": "Break",
        "title": "Lunch"
      },
      {
        "time": "14:00–14:25",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "14:25–14:50",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "14:50–15:15",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "15:15–15:45",
        "type": "Break",
        "title": "Coffee break"
      },
      {
        "time": "15:45–17:45",
        "type": "Poster session",
        "title": "Poster session"
      },
      {
        "time": "18:00–",
        "type": "Other",
        "title": "Banquet / reception"
      }
    ]
  },
  {
    "date": "Tuesday, 9 March 2027",
    "label": "Day 2",
    "items": [
      {
        "time": "9:30–10:30",
        "type": "Talk",
        "title": "Invited talk (60 min)"
      },
      {
        "time": "10:30–11:00",
        "type": "Break",
        "title": "Coffee break"
      },
      {
        "time": "11:00–11:40",
        "type": "Talk",
        "title": "Invited talk (40 min)"
      },
      {
        "time": "11:40–12:20",
        "type": "Talk",
        "title": "Invited talk (40 min)"
      },
      {
        "time": "12:20–13:50",
        "type": "Break",
        "title": "Lunch"
      },
      {
        "time": "13:50–14:15",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "14:15–14:40",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "14:40–15:05",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "15:05–15:35",
        "type": "Break",
        "title": "Coffee break"
      },
      {
        "time": "15:35–16:00",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "16:00–16:25",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "16:25–17:15",
        "type": "Other",
        "title": "Discussion / reserve session"
      }
    ]
  },
  {
    "date": "Wednesday, 10 March 2027",
    "label": "Day 3",
    "items": [
      {
        "time": "9:30–10:30",
        "type": "Talk",
        "title": "Invited talk (60 min)"
      },
      {
        "time": "10:30–11:00",
        "type": "Break",
        "title": "Coffee break"
      },
      {
        "time": "11:00–11:40",
        "type": "Talk",
        "title": "Invited talk (40 min)"
      },
      {
        "time": "11:40–12:20",
        "type": "Talk",
        "title": "Invited talk (40 min)"
      },
      {
        "time": "12:20–13:50",
        "type": "Break",
        "title": "Lunch"
      },
      {
        "time": "13:50–14:15",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "14:15–14:40",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "14:40–15:10",
        "type": "Break",
        "title": "Coffee break"
      },
      {
        "time": "15:10–15:35",
        "type": "Talk",
        "title": "Contributed talk"
      },
      {
        "time": "15:35–16:15",
        "type": "Other",
        "title": "General discussion"
      },
      {
        "time": "16:15–16:25",
        "type": "Other",
        "title": "Closing"
      }
    ]
  }
];

/*
 * Add the external registration form URL when registration opens.
 * Leave empty while registration is closed.
 */
export const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLScNNFD8xRKGMTDHMZ2zorpgZ0UW8vpz4KyQXCklsHh6DfZelw/viewform";

export const venueLinks = {
  officialHomepage: "https://www.riken.jp/en/",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=RIKEN+Wako+Campus%2C+2-1+Hirosawa%2C+Wako%2C+Saitama",
  officialAccess: "https://www.riken.jp/en/access/wako-map/",
  officialBusDirections:
    "https://www.riken.jp/en/access/wako-map/bus_directions/",
  officialCampusMap:
    "https://www.riken.jp/medialibrary/riken/en/access/wako-map/campus_en_p.pdf",
  visitorEntry: "https://www.riken.jp/en/access/procedure/",
};

export const railRoutes = [
  {
    line: "Tobu Tojo Line",
    service: "Express / Semi Express",
    time: "Approx. 12 min",
  },
  {
    line: "Tokyo Metro Fukutoshin Line",
    service: "Express",
    time: "Approx. 14 min",
  },
  {
    line: "Tokyo Metro Yurakucho Line",
    service: "Local",
    time: "Approx. 19 min",
  },
];

export const airportRoutes = [
  {
    origin: "Narita Airport",
    steps: [
      "Nippori · Keisei Skyliner",
      "Ikebukuro · JR Yamanote Line",
      "Wako-shi",
    ],
  },
  {
    origin: "Haneda Airport",
    steps: [
      "Shinagawa · Keikyu Lines",
      "Ikebukuro · JR Yamanote Line",
      "Wako-shi",
    ],
  },
];

export type Organizer = {
  name: string;
  affiliation: string;
  role: string;
};

export const organizers: Organizer[] = [
  {
    name: "Hiroki Nakabayashi",
    affiliation: "The University of Tokyo and Riken",
    role: "Chief Organizer",
  },
  {
    name: "Takano Taira",
    affiliation: "Riken",
    role: "Organizer",
  },
  {
    name: "Tomotaka Kuwahara",
    affiliation: "Riken",
    role: "Organizer",
  },
];

export const contact = {
  name: "Hiroki Nakabayashi",
  affiliation: "The University of Tokyo and RIKEN",
  email: "nakaba@iis.u-tokyo.ac.jp",
};
