// Change the brand here only. Components read from this file.
export const siteConfig = {
  brand: { name: 'Khanya Solar', tagline: 'Solar equipment and engineering for South Africa', currency: 'ZAR' },
  refPrefix: 'KS',
  vat: { rate: 0.15, note: 'VAT treatment to be confirmed' },
  legal: { copyrightName: 'Khanya SA', poweredBy: ['Solar Farming Systems Capital (Pty) Ltd', 'Hanchu Energy SA'] },
  // Contact details are Solar Farming Systems Capital's, exactly as published on solarfarmingsystems.co.za.
  contact: {
    person: 'Jan-Hendrik Wiesemann', phone: '061 525 7936', whatsapp: '061 525 7936', email: 'wisemannengineering@outlook.com',
    location: 'Volksrust, KwaZulu-Natal, South Africa', serviceAreas: 'KZN · Mpumalanga · Free State · Gauteng border',
    hours: ['Mon – Fri: 07:00 – 17:00', 'Sat: 08:00 – 13:00'], response: 'within 1 business day',
  },
  supplier: { name: 'Hanchu Energy', note: 'Proposed supply and fulfilment partner' },
  engineering: { name: 'Solar Farming Systems Capital (SFSC)', short: 'SFSC', note: 'Engineering, EPC and project development' },
  // Home hero photo. Both folder spellings are tried, so public/images/banners/solar.jpg or public/images/banner/solar.jpg works.
  heroImages: ['/images/banners/solar.jpg', '/images/banner/solar.jpg'],
  demoNotice: 'Demonstration site. Prices, stock and the partnership are provisional until formally agreed.',
};
