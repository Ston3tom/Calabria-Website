export const SITE = {
  name: 'Calabria Essence',
  email: 'calabria.essence@gmail.com',
  instagram: 'https://www.instagram.com/calabria.essence?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  facebook: 'https://www.facebook.com/profile.php?id=61583536306626',
  tiktok: 'https://www.tiktok.com/@calabria.essence?_r=1&_t=ZN-91l7OyZoXOY',
  copyright: '© 2026 Kristýna Zouzalová / Lorenzo Mazzei. All rights reserved.',
};

export const EMAILJS = {
  serviceId: 'service_z8u9hhd',
  publicKey: 'D8Gv9KKB3FaW3b9P5',
  templates: {
    en: 'template_n7cym2v',
    it: 'template_n7cym2v',
    de: 'template_n7cym2v',
    cz: 'template_99y2afg',
  } as const,
};

/** Trip windows shown in the booking form (next season). */
export const TRIP_PERIODS = [
  {
    groupKey: 'mayJune' as const,
    options: [{ value: '2027-05-29_2027-06-03', labelKey: 'period1' as const }],
  },
  {
    groupKey: 'june' as const,
    options: [
      { value: '2027-06-05_2027-06-10', labelKey: 'period4' as const },
      { value: '2027-06-12_2027-06-17', labelKey: 'period3' as const },
    ],
  },
  {
    groupKey: 'july' as const,
    options: [
      { value: '2027-07-10_2027-07-15', labelKey: 'period7' as const },
      { value: '2027-07-17_2027-07-22', labelKey: 'period8' as const },
    ],
  },
];

/** Primary nav — theme pages stay linked from homepage tiles. */
export const NAV = [
  { href: '/#experience', key: 'why' as const },
  { href: '/itinerary', key: 'itineraries' as const },
  { href: '/about', key: 'about' as const },
];
