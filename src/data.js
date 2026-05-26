export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Booking', href: '#booking' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES = [
  {
    id: 'airport',
    icon: '✈',
    title: 'Airport Transfer',
    subtitle: 'DFW & Love Field',
    description: 'On-time pickups and drop-offs with flight tracking. Never miss a flight again.',
    features: ['Flight tracking', 'Meet & greet', '24/7 availability', 'Fixed pricing'],
    color: 'from-blue-900/20 to-transparent',
  },
  {
    id: 'corporate',
    icon: '💼',
    title: 'Corporate Travel',
    subtitle: 'Executive Class',
    description: 'Professional transportation for meetings, conferences, and client entertainment.',
    features: ['Wi-Fi equipped', 'Privacy partition', 'Refreshments', 'Hourly billing'],
    color: 'from-purple-900/20 to-transparent',
  },
  {
    id: 'wedding',
    icon: '💍',
    title: 'Wedding & Events',
    subtitle: 'Special Occasions',
    description: 'Make your special day unforgettable with our premium fleet and attentive chauffeurs.',
    features: ['Decorated vehicles', 'Red carpet', 'Photography stops', 'Custom packages'],
    color: 'from-rose-900/20 to-transparent',
  },
  {
    id: 'hourly',
    icon: '⏱',
    title: 'Hourly Service',
    subtitle: 'At Your Disposal',
    description: 'Book by the hour for complete flexibility — shopping, tours, or night out.',
    features: ['Flexible schedule', 'Multiple stops', 'Night out packages', 'City tours'],
    color: 'from-amber-900/20 to-transparent',
  },
  {
    id: 'group',
    icon: '👥',
    title: 'Group Transportation',
    subtitle: 'Up to 14 Passengers',
    description: 'Move your entire group in style with our luxury sprinter and SUV options.',
    features: ['Large capacity', 'Event coordination', 'Group discounts', 'Multiple vehicles'],
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
    imageAlt: '2022 black Cadillac Escalade ESV Sport',
  },
  {
    id: 'suburban',
    name: 'Chevrolet Suburban',
    category: 'Full-Size SUV',
    passengers: 7,
    luggage: 7,
    features: ['Spacious interior', 'DVD entertainment', 'Bar area', 'Privacy glass'],
    bestFor: ['Airport Transfer', 'Wedding & Events', 'Group Transportation'],
    badge: null,
    badgeColor: '',
    image: 'https://images.unsplash.com/photo-1758025550252-2eb870da49cc?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Black luxury SUV indoors',
  },
];

export const STATS = [
  { value: '5,000+', label: 'Rides Completed' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '24/7', label: 'Availability' },
  { value: '15min', label: 'Avg. Response' },
];

export const TESTIMONIALS = [
  {
    name: 'Marcus T.',
    title: 'CEO, Dallas Tech Group',
    text: 'Novaria has been our go-to for all executive travel. Impeccable service every single time. The drivers are professional and the vehicles are immaculate.',
    rating: 5,
  },
  {
    name: 'Sarah & James K.',
    title: 'Wedding Clients',
    text: 'Our wedding day was perfect partly because of Novaria. The team went above and beyond — decorated the car beautifully and kept us on schedule all day.',
    rating: 5,
  },
  {
    name: 'Dr. Alicia R.',
    title: 'Frequent Traveler',
    text: 'I fly out of DFW weekly and Novaria is always on time. The app makes booking effortless and I never have to worry about my airport transfer.',
    rating: 5,
  },
];

export const PHONE_NUMBER = '+14704190528';
export const PHONE_DISPLAY = '+1 (470) 419-0528';
export const WHATSAPP_NUMBER = PHONE_NUMBER;
export const EMAIL_ADDRESS = 'mirkanodawit@gmail.com';
