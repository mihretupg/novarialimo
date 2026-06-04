import { PHONE_DISPLAY, PHONE_NUMBER } from './data';

export const SITE_URL = 'https://www.novariatransportation.com';
export const BUSINESS_NAME = 'Novaria Transportation';
export const BUSINESS_ADDRESS = 'Dallas-Fort Worth, TX 75201';
export const GOOGLE_BUSINESS_URL = 'https://www.google.com/maps/place/PLACEHOLDER_NOVARIA_TRANSPORTATION';
export const SAME_AS_LINKS = [
  GOOGLE_BUSINESS_URL,
  'https://www.linkedin.com/company/PLACEHOLDER_NOVARIA_TRANSPORTATION',
  'https://www.facebook.com/PLACEHOLDER_NOVARIA_TRANSPORTATION',
  'https://www.instagram.com/PLACEHOLDER_NOVARIA_TRANSPORTATION',
];

export const SERVICE_PAGE_LINKS = [
  { label: 'DFW Airport Transportation', path: '/dfw-airport-transportation' },
  { label: 'Executive Car Service Dallas', path: '/executive-car-service-dallas' },
  { label: 'Corporate Transportation', path: '/corporate-transportation' },
  { label: 'Hourly Chauffeur Service', path: '/hourly-chauffeur-service' },
  { label: 'Service Areas', path: '/service-areas' },
];

export const HOME_FAQS = [
  {
    question: 'Does Novaria Transportation provide DFW airport transportation?',
    answer: 'Yes. Novaria Transportation provides private airport transportation to and from Dallas Fort Worth International Airport, Dallas Love Field, hotels, homes, offices, and event venues across the Dallas-Fort Worth area.',
  },
  {
    question: 'What is included with executive car service in Dallas?',
    answer: 'Executive car service includes a professional chauffeur, a clean late-model vehicle, route planning, flight or schedule monitoring when applicable, and discreet door-to-door transportation for business travelers and clients.',
  },
  {
    question: 'How do I book a luxury transportation service?',
    answer: 'You can request a ride through the booking form, by phone, SMS, or WhatsApp. Share your pickup location, destination, date, time, passenger count, luggage needs, and preferred vehicle so the team can confirm availability and pricing.',
  },
  {
    question: 'What vehicle options are available?',
    answer: 'Novaria Transportation offers luxury SUVs and full-size SUVs suited for airport travelers, executives, families, and small groups. Vehicle recommendations are based on passenger count, luggage, service type, and comfort needs.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'Novaria Transportation serves Dallas, Fort Worth, DFW Airport, Dallas Love Field, Plano, Frisco, Irving, Arlington, Grapevine, Southlake, Las Colinas, and nearby North Texas communities.',
  },
  {
    question: 'Can corporate clients arrange recurring transportation?',
    answer: 'Yes. Corporate clients can request recurring airport transfers, executive point-to-point rides, hourly chauffeur service, conference transportation, and coordinated transportation for visiting teams or VIP guests.',
  },
];

export const HOME_SEO = {
  title: 'Novaria Transportation | DFW Luxury Airport Transfers & Chauffeur Service',
  description: 'Novaria Transportation provides luxury transportation, DFW airport transfers, executive car service, and chauffeur service for travelers, executives, families, and corporate clients across Dallas-Fort Worth.',
  path: '/',
  keywords: 'Novaria Transportation, Dallas Fort Worth luxury transportation, DFW airport transfers, executive car service Dallas, chauffeur service DFW',
};

const commonFaq = {
  booking: {
    question: 'How do I book this service?',
    answer: 'Use the online booking form or contact Novaria Transportation by phone, SMS, or WhatsApp. Provide the travel date, pickup time, pickup and drop-off addresses, passenger count, luggage details, and any special instructions.',
  },
  vehicles: {
    question: 'Which vehicle should I choose?',
    answer: 'Most airport travelers and executives choose a luxury SUV for comfort, privacy, and luggage capacity. Families and small groups may prefer a full-size SUV when extra seating or luggage space is needed.',
  },
  advance: {
    question: 'How far in advance should I reserve?',
    answer: 'Advance reservations are recommended, especially for early flights, corporate roadshows, conferences, holidays, and peak airport travel windows. Same-day requests are accepted when vehicles are available.',
  },
};

export const SERVICE_PAGES = {
  'dfw-airport-transportation': {
    title: 'DFW Airport Transportation',
    h1: 'DFW Airport Transportation',
    path: '/dfw-airport-transportation',
    metaTitle: 'DFW Airport Transportation | Novaria Transportation',
    metaDescription: 'Private DFW airport transportation with luxury SUVs, professional chauffeurs, flight-aware scheduling, and service across Dallas-Fort Worth.',
    eyebrow: 'Airport Transfers',
    summary: 'Private luxury airport transfers for DFW Airport, Dallas Love Field, hotels, homes, offices, and events across North Texas.',
    intro: [
      'Novaria Transportation provides private DFW airport transportation for travelers who want a calm, reliable alternative to rideshare uncertainty, taxi lines, and crowded shuttle service. Whether you are arriving at Dallas Fort Worth International Airport for a board meeting, returning home with your family, or coordinating transportation for a visiting client, the experience is built around punctuality, comfort, and clear communication.',
      'Airport travel has its own rhythm. Flight times change, terminals get busy, luggage takes longer than expected, and Dallas-Fort Worth traffic can shift quickly. Novaria plans around those realities. Your reservation includes professional route planning, thoughtful pickup timing, and chauffeur service designed to help you move from curbside, baggage claim, hotel, home, or office with less friction.',
    ],
    sections: [
      {
        heading: 'A smoother airport arrival',
        body: 'For arriving passengers, Novaria can coordinate pickup instructions based on your terminal, luggage needs, and preferred meeting style. Airport travelers often need help with more than a ride; they need a dependable handoff from aircraft to vehicle. Families appreciate space for bags and car seats when requested, executives appreciate discretion and quiet, and out-of-town guests appreciate a driver who understands the DFW area.',
      },
      {
        heading: 'Departures planned with time to spare',
        body: 'For departures, the chauffeur service is scheduled around your flight time, airport, terminal, traffic patterns, and the level of buffer you prefer. The goal is not simply to arrive on time, but to arrive composed. Novaria serves both DFW Airport and Dallas Love Field, with transportation from Dallas, Fort Worth, Plano, Frisco, Irving, Arlington, Grapevine, Southlake, Las Colinas, and surrounding communities.',
      },
      {
        heading: 'Who airport service is best for',
        body: 'DFW airport transportation is ideal for business travelers, families, wedding guests, conference attendees, VIP visitors, and anyone who wants a scheduled private vehicle instead of a last-minute app-based ride. It is also useful for corporate assistants and travel coordinators who need predictable communication and professional service for executives or clients.',
      },
    ],
    faqs: [
      {
        question: 'Do you serve both DFW Airport and Dallas Love Field?',
        answer: 'Yes. Novaria Transportation provides airport transfers for Dallas Fort Worth International Airport and Dallas Love Field, plus nearby hotels, homes, offices, and event venues.',
      },
      {
        question: 'Can the chauffeur track my flight?',
        answer: 'Flight details can be used to plan timing and adjust for delays where possible. Include your airline, flight number, arrival time, and terminal details when booking.',
      },
      commonFaq.vehicles,
      commonFaq.booking,
    ],
    related: ['executive-car-service-dallas', 'corporate-transportation', 'service-areas'],
  },
  'executive-car-service-dallas': {
    title: 'Executive Car Service Dallas',
    h1: 'Executive Car Service in Dallas',
    path: '/executive-car-service-dallas',
    metaTitle: 'Executive Car Service Dallas | Novaria Transportation',
    metaDescription: 'Professional executive car service in Dallas for airport transfers, meetings, client transportation, roadshows, and discreet chauffeur service.',
    eyebrow: 'Executive Travel',
    summary: 'Discreet, professional transportation for executives, entrepreneurs, consultants, legal teams, investors, and visiting clients.',
    intro: [
      'Novaria Transportation offers executive car service in Dallas for travelers who need more than a ride between appointments. Business transportation has to be quiet, punctual, flexible, and polished. A missed pickup, a distracted driver, or an uncomfortable vehicle can affect the tone of a meeting before it begins. Novaria is designed for professionals who value time, privacy, and consistency.',
      'The service is well suited for airport arrivals, hotel transfers, client dinners, investor meetings, legal appointments, site visits, conferences, and multi-stop days across Dallas-Fort Worth. Chauffeurs focus on professional presentation, route awareness, and a steady experience that lets passengers prepare, make calls, answer messages, or simply decompress between commitments.',
    ],
    sections: [
      {
        heading: 'Built around business schedules',
        body: 'Executive travel often changes during the day. Meetings run long, lunch locations move, and flight times shift. Novaria can support point-to-point reservations as well as hourly chauffeur service when your schedule requires flexibility. For simple airport transfers, the focus is timing and direct movement. For roadshows and multi-stop itineraries, the focus is continuity, discretion, and keeping the vehicle available when the next stop is ready.',
      },
      {
        heading: 'A professional impression for guests',
        body: 'Companies often use executive car service to welcome clients, speakers, board members, candidates, and VIP guests. A private chauffeur creates a more intentional first impression than asking a guest to find a rideshare pickup zone or wait outside a hotel. It also gives hosts a clearer view of where the guest is in the travel process and when they are likely to arrive.',
      },
      {
        heading: 'Dallas-Fort Worth coverage',
        body: 'Service is available throughout Dallas, Fort Worth, DFW Airport, Love Field, Uptown, Downtown Dallas, Las Colinas, Plano, Frisco, Southlake, Grapevine, Arlington, and surrounding business districts. For trips outside the metroplex, include the destination and schedule details so the team can recommend the right vehicle and reservation structure.',
      },
    ],
    faqs: [
      {
        question: 'What makes executive car service different from rideshare?',
        answer: 'Executive car service is scheduled in advance with a professional chauffeur, private vehicle, clearer communication, and service standards designed for business travelers and client transportation.',
      },
      {
        question: 'Can I book an executive vehicle for multiple stops?',
        answer: 'Yes. Multi-stop service can be arranged as point-to-point transportation or hourly chauffeur service depending on the schedule and wait-time needs.',
      },
      commonFaq.advance,
      commonFaq.booking,
    ],
    related: ['dfw-airport-transportation', 'corporate-transportation', 'hourly-chauffeur-service'],
  },
  'corporate-transportation': {
    title: 'Corporate Transportation',
    h1: 'Corporate Transportation in Dallas-Fort Worth',
    path: '/corporate-transportation',
    metaTitle: 'Corporate Transportation DFW | Novaria Transportation',
    metaDescription: 'Corporate transportation in Dallas-Fort Worth for executive transfers, airport pickups, client visits, conferences, events, and recurring business travel.',
    eyebrow: 'Corporate Accounts',
    summary: 'Coordinated private transportation for companies, assistants, travel managers, conference planners, and client-facing teams.',
    intro: [
      'Novaria Transportation provides corporate transportation across Dallas-Fort Worth for companies that need reliable service for employees, executives, clients, and guests. Business travel is rarely one-size-fits-all. Some rides are simple airport transfers. Others involve back-to-back meetings, group arrivals, conference schedules, executive dinners, or coordinated pickups for visiting teams. Novaria helps make those movements feel organized and professional.',
      'Corporate clients choose private transportation because it reduces uncertainty. Instead of leaving a guest to search for a car after landing, a scheduled chauffeur can be ready with the right vehicle, route, and contact details. Instead of asking an executive to manage parking between meetings, hourly chauffeur service can keep the day moving. Instead of coordinating multiple rides manually, the transportation plan can be handled as part of the event or travel schedule.',
    ],
    sections: [
      {
        heading: 'Transportation for teams and guests',
        body: 'Corporate service can support airport pickups, hotel transfers, office transportation, trade show movement, dinner transfers, board meetings, candidate visits, and VIP itineraries. For groups, Novaria can help recommend vehicle types based on passenger count, luggage, timing, and the number of simultaneous arrivals or departures.',
      },
      {
        heading: 'Helpful for assistants and planners',
        body: 'Executive assistants, office managers, travel coordinators, and event planners need details they can trust. When booking, you can provide passenger names, pickup notes, flight details, preferred contact methods, and special instructions. The goal is to reduce follow-up and give the coordinator a clearer view of what will happen on the travel day.',
      },
      {
        heading: 'Flexible reservation formats',
        body: 'Corporate transportation can be arranged as airport transfer service, point-to-point rides, hourly chauffeur service, or recurring transportation. Hourly service is useful when the passenger needs the same vehicle available across several stops. Point-to-point service works well for direct hotel-to-office, office-to-restaurant, or airport-to-meeting transportation.',
      },
    ],
    faqs: [
      {
        question: 'Can Novaria handle transportation for visiting clients?',
        answer: 'Yes. Novaria Transportation can provide airport pickups, hotel transfers, office transportation, dinner transfers, and multi-stop itineraries for visiting clients and VIP guests.',
      },
      {
        question: 'Do you offer recurring corporate transportation?',
        answer: 'Recurring service can be requested for frequent airport travelers, regular client visits, executive schedules, and ongoing company transportation needs.',
      },
      commonFaq.vehicles,
      commonFaq.booking,
    ],
    related: ['executive-car-service-dallas', 'dfw-airport-transportation', 'hourly-chauffeur-service'],
  },
  'hourly-chauffeur-service': {
    title: 'Hourly Chauffeur Service',
    h1: 'Hourly Chauffeur Service in Dallas-Fort Worth',
    path: '/hourly-chauffeur-service',
    metaTitle: 'Hourly Chauffeur Service DFW | Novaria Transportation',
    metaDescription: 'Hourly chauffeur service in Dallas-Fort Worth for meetings, events, nights out, shopping, appointments, and flexible multi-stop transportation.',
    eyebrow: 'At Your Disposal',
    summary: 'Private chauffeur service by the hour for schedules that need flexibility, multiple stops, or a vehicle waiting nearby.',
    intro: [
      'Novaria Transportation offers hourly chauffeur service for passengers who need more flexibility than a single transfer. With hourly service, the vehicle and chauffeur remain available for a defined block of time, making it easier to move through a changing schedule without arranging a new ride at every stop. It is a practical option for executive meetings, client entertainment, medical appointments, shopping days, weddings, special events, and nights out in Dallas-Fort Worth.',
      'Hourly transportation is especially useful when timing is uncertain. A dinner may run long. A meeting may shift locations. A family may need extra time between stops. A corporate guest may need to visit several offices in one afternoon. Instead of rebuilding the plan each time, hourly chauffeur service gives you continuity, comfort, and a professional driver who already understands the itinerary.',
    ],
    sections: [
      {
        heading: 'Designed for flexible schedules',
        body: 'A private hourly chauffeur can support multiple stops, wait time, route adjustments, and return transportation within the reserved period. The service works well for passengers who prefer the same vehicle throughout the experience, especially when privacy, luggage, presentation, or timing matter.',
      },
      {
        heading: 'Common hourly use cases',
        body: 'Popular uses include corporate roadshows, wedding day transportation, prom and formal events, anniversary dinners, shopping appointments, medical visits, real estate tours, hotel-to-restaurant transfers, and entertainment districts where parking or pickup zones can be difficult. Families also use hourly service when children, luggage, or multiple stops make standard rides less convenient.',
      },
      {
        heading: 'How to plan your hourly reservation',
        body: 'When requesting hourly chauffeur service, share the estimated start time, pickup address, expected stops, passenger count, luggage needs, and the latest time you expect to finish. If the schedule is still developing, provide the known details and note where flexibility may be needed. Novaria can help recommend the right reservation window and vehicle option.',
      },
    ],
    faqs: [
      {
        question: 'What is hourly chauffeur service best for?',
        answer: 'Hourly chauffeur service is best for multi-stop schedules, events, business meetings, nights out, weddings, and any trip where you want a private vehicle waiting between stops.',
      },
      {
        question: 'Can the itinerary change during the reservation?',
        answer: 'Reasonable itinerary adjustments can usually be accommodated within the reserved time and service area. Share changes with the chauffeur or dispatch contact as early as possible.',
      },
      commonFaq.vehicles,
      commonFaq.advance,
    ],
    related: ['executive-car-service-dallas', 'corporate-transportation', 'service-areas'],
  },
  'service-areas': {
    title: 'Service Areas',
    h1: 'Dallas-Fort Worth Transportation Service Areas',
    path: '/service-areas',
    metaTitle: 'Dallas-Fort Worth Service Areas | Novaria Transportation',
    metaDescription: 'Novaria Transportation serves Dallas, Fort Worth, DFW Airport, Love Field, Plano, Frisco, Irving, Arlington, Grapevine, Southlake, Las Colinas, and nearby communities.',
    eyebrow: 'DFW Coverage',
    summary: 'Luxury transportation and chauffeur service across Dallas-Fort Worth, including airports, business districts, hotels, homes, venues, and suburbs.',
    intro: [
      'Novaria Transportation serves Dallas-Fort Worth with private luxury transportation for airport travelers, executives, families, event guests, and corporate clients. The service area includes the major airports, central business districts, hotels, residential neighborhoods, entertainment areas, and many nearby North Texas communities. If your trip begins or ends in the DFW metroplex, Novaria can usually help plan a reliable transportation option.',
      'The most common service areas include Dallas, Fort Worth, Dallas Fort Worth International Airport, Dallas Love Field, Irving, Las Colinas, Arlington, Grapevine, Southlake, Plano, Frisco, McKinney, Richardson, Addison, Highland Park, University Park, Uptown Dallas, Downtown Dallas, Design District, Bishop Arts, Victory Park, and nearby suburbs. Longer-distance trips can be reviewed by request.',
    ],
    sections: [
      {
        heading: 'Airport and hotel transportation',
        body: 'Airport transportation is available for DFW Airport and Dallas Love Field, with pickups and drop-offs at terminals, hotels, homes, offices, and event venues. Travelers staying near Grapevine, Irving, Las Colinas, Downtown Dallas, Uptown, Fort Worth, Plano, or Frisco can request private transfers that match flight timing, luggage needs, and group size.',
      },
      {
        heading: 'Business districts and corporate destinations',
        body: 'Corporate travelers frequently request service to Downtown Dallas, Uptown, Las Colinas, Legacy West, Plano, Frisco, Fort Worth, Arlington, and Southlake. Novaria can support airport arrivals, office transfers, hotel-to-meeting transportation, roadshows, client dinners, and hourly service for multi-stop business days.',
      },
      {
        heading: 'Events, families, and special occasions',
        body: 'Novaria also serves wedding venues, restaurants, stadiums, concert venues, private homes, schools, and special event locations throughout the area. Families appreciate private vehicles for airport arrivals and special occasions, while event guests appreciate scheduled transportation that reduces parking and pickup uncertainty.',
      },
    ],
    faqs: [
      {
        question: 'Which cities are in the Novaria Transportation service area?',
        answer: 'Core service areas include Dallas, Fort Worth, Irving, Arlington, Grapevine, Southlake, Plano, Frisco, Las Colinas, Addison, Richardson, McKinney, and nearby Dallas-Fort Worth communities.',
      },
      {
        question: 'Can I request transportation outside the DFW metroplex?',
        answer: 'Longer trips may be available by request. Share the pickup city, destination, schedule, passenger count, and luggage needs so Novaria can confirm availability.',
      },
      commonFaq.booking,
      commonFaq.advance,
    ],
    related: ['dfw-airport-transportation', 'executive-car-service-dallas', 'hourly-chauffeur-service'],
  },
};

export function pageUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TransportationService'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_DISPLAY || PHONE_NUMBER,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dallas-Fort Worth',
      addressRegion: 'TX',
      addressCountry: 'US',
      streetAddress: 'PLACEHOLDER_STREET_ADDRESS',
      postalCode: 'PLACEHOLDER_POSTAL_CODE',
    },
    areaServed: [
      'Dallas, TX',
      'Fort Worth, TX',
      'Dallas Fort Worth International Airport',
      'Dallas Love Field',
      'Plano, TX',
      'Frisco, TX',
      'Irving, TX',
      'Arlington, TX',
      'Grapevine, TX',
      'Southlake, TX',
      'Las Colinas, TX',
    ],
    serviceType: [
      'Luxury transportation',
      'Airport transfers',
      'Executive car service',
      'Chauffeur service',
      'Corporate transportation',
      'Hourly chauffeur service',
    ],
    sameAs: SAME_AS_LINKS,
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${page.path}#service`,
    name: page.title,
    url: pageUrl(page.path),
    provider: {
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
    },
    areaServed: 'Dallas-Fort Worth, TX',
    serviceType: page.title,
    description: page.metaDescription,
  };
}
