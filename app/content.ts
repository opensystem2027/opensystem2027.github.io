/*
 * Workshop content
 * ----------------
 * Most wording and all information that will change over time live in this
 * file. Update the values below; the page layout does not need to be edited.
 */

export const workshop = {
  formalName: "International Workshop on the GKLS equation beyond",
  heroTitle: "International Workshop on the GKLS equation beyond",
  date: "7–8 March 2027",
  registrationDeadline: "TBA",
  venueShort: "RIKEN Wako Campus, Saitama, Japan",
  venueName: "RIKEN Wako Campus",
  venueAddress: "2-1 Hirosawa, Wako, Saitama 351-0198, Japan",
  format: "In person",
  language: "English",
  expectedParticipants: "Approximately 50",
  summary:
    "The Gorini-Kossakowski-Lindblad-Sudarshan equation was proposed about 50 years ago. This workshop aims to give a further development beyond the GKLS equation",
};

export const previewNotice =
  "Draft preview — confirm the workshop dates and replace all organizer and contact TBA fields before publication.";

export const aboutParagraphs = [
  workshop.summary,
];

export const topics = [
  "Non-Markovian dynamics of open quantum systems",
  "GKLS equation",
  "Quantum information and correlations",
  "Quantum thermodynamics",
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
export const invitedSpeakers: Speaker[] = [];

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

/* Add one object per day when the schedule is ready. */
export const programDays: ProgramDay[] = [];

/*
 * Add the external registration form URL when registration opens.
 * Leave empty while registration is closed.
 */
export const registrationUrl = "";

export const venueLinks = {
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
];

export const contact = {
  name: "TBA",
  affiliation: "TBA",
  email: "TBA",
};
