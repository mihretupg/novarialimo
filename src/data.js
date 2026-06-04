export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Booking', href: '#booking' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES = [
  {
    id: 'airport',
    icon: 'AIR',
    title: 'Airport Transfer',
    subtitle: 'DFW & Love Field',
    description: 'Private DFW airport transportation for travelers who need punctual pickups, smooth departures, and luxury SUV comfort.',
    features: ['Flight tracking', 'Meet and greet', '24/7 availability', 'Fixed pricing'],
    pagePath: '/dfw-airport-transportation',
    color: 'from-blue-900/20 to-transparent',
  },
  {
    id: 'corporate',
    icon: 'CEO',
    title: 'Corporate Travel',
    subtitle: 'Executive Class',
    description: 'Executive car service for Dallas meetings, conferences, airport arrivals, client entertainment, and VIP guest movement.',
    features: ['Wi-Fi equipped', 'Privacy partition', 'Refreshments', 'Hourly billing'],
    pagePath: '/executive-car-service-dallas',
    color: 'from-purple-900/20 to-transparent',
  },
  {
    id: 'wedding',
    icon: 'VIP',
    title: 'Wedding & Events',
    subtitle: 'Special Occasions',
    description: 'Coordinated private transportation for weddings, formal events, family celebrations, and guest movement across DFW.',
    features: ['Event coordination', 'Premium vehicles', 'Photo stops', 'Custom packages'],
    pagePath: '/hourly-chauffeur-service',
    color: 'from-rose-900/20 to-transparent',
  },
  {
    id: 'hourly',
    icon: 'HR',
    title: 'Hourly Service',
    subtitle: 'At Your Disposal',
    description: 'Hourly chauffeur service for flexible schedules, multiple stops, shopping, tours, meetings, events, or a night out.',
    features: ['Flexible schedule', 'Multiple stops', 'Night out packages', 'City tours'],
    pagePath: '/hourly-chauffeur-service',
    color: 'from-amber-900/20 to-transparent',
  },
  {
    id: 'group',
    icon: 'GRP',
    title: 'Group Transportation',
    subtitle: 'Families & Teams',
    description: 'Coordinated DFW transportation for families, small groups, corporate visitors, events, and airport luggage needs.',
    features: ['Large capacity', 'Event coordination', 'Group planning', 'Multiple vehicles'],
    pagePath: '/corporate-transportation',
    color: 'from-teal-900/20 to-transparent',
  },
];

export const FLEET = [
  {
    id: 'escalade',
    name: 'Cadillac Escalade',
    category: 'Luxury SUV',
    passengers: 6,
    luggage: 6,
    features: ['Leather seating', 'Premium audio', 'USB charging', 'Tinted windows'],
    bestFor: ['Airport Transfer', 'Corporate Travel', 'Hourly Service'],
    badge: 'Most Popular',
    badgeColor: 'bg-gold-500 text-black',
    image: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/2022_Cadillac_Escalade_ESV_Sport_in_Black_Raven,_rear_left.jpg',
    imageAlt: 'Black Cadillac Escalade luxury SUV for Dallas-Fort Worth airport transportation',
  },
  {
    id: 'suburban',
    name: 'Chevrolet Suburban',
    category: 'Full-Size SUV',
    passengers: 7,
    luggage: 7,
    features: ['Spacious interior', 'DVD entertainment', 'Bar area', 'Privacy glass'],
    bestFor: ['Airport Transfer', 'Family Travel', 'Group Transportation'],
    badge: null,
    badgeColor: '',
    image: 'https://images.unsplash.com/photo-1758025550252-2eb870da49cc?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Black full-size luxury SUV for DFW chauffeur service',
  },
];

export const STATS = [
  { value: '5,000+', label: 'Rides Completed' },
  { value: '4.9', label: 'Average Rating' },
  { value: '24/7', label: 'Availability' },
  { value: '15min', label: 'Avg. Response' },
];

export const TESTIMONIALS = [
  {
    name: 'Marcus T.',
    title: 'CEO, Dallas Tech Group',
    text: 'Novaria Transportation has been our go-to for executive travel in Dallas-Fort Worth. Impeccable service every single time.',
    rating: 5,
  },
  {
    name: 'Sarah & James K.',
    title: 'Wedding Clients',
    text: 'Our wedding day was perfect partly because of Novaria Transportation. The team kept our family and guests on schedule all day.',
    rating: 5,
  },
  {
    name: 'Dr. Alicia R.',
    title: 'Frequent Traveler',
    text: 'I fly out of DFW weekly and Novaria Transportation is always on time. I never have to worry about my airport transfer.',
    rating: 5,
  },
];

export const PHONE_NUMBER = '+14704190528';
export const PHONE_DISPLAY = '+1 (470) 419-0528';
export const WHATSAPP_NUMBER = PHONE_NUMBER;
export const EMAIL_ADDRESS = 'mirkanodawit@gmail.com';
