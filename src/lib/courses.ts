// Course definitions for All County Security Guard Training registration.
// Stripe product IDs are from dad's Stripe dashboard. Payment Links are
// created per product in the Stripe dashboard; set STRIPE_PAYMENT_LINKS
// env vars or update the fallback URLs below once created.

export interface Course {
  slug: string;
  name: string;
  price: string;
  priceCents: number;
  stripeProductId: string;
  // Real Stripe Payment Links from dad's Stripe dashboard (verified live
  // 2026-10-21: each link's checkout page shows the matching course + price).
  paymentLink: string;
  date?: string;
  time: string;
}

export const COURSES: Record<string, Course> = {
  'pre-assignment': {
    slug: 'pre-assignment',
    name: '8 Hour Pre-Assignment Training',
    price: '$80.00',
    priceCents: 8000,
    stripeProductId: 'prod_VTHRTcIFHJH9bZ',
    paymentLink: 'https://buy.stripe.com/00w4gybhI08g7Hye625EY05',
    date: 'November 28 and 29, 2026',
    time: '9am to 1pm each day',
  },
  'on-the-job': {
    slug: 'on-the-job',
    name: '16 Hour On-the-Job Training',
    price: '$160.00',
    priceCents: 16000,
    stripeProductId: 'prod_VTHRgWrTTM7luO',
    paymentLink: 'https://buy.stripe.com/aFa4gy2LcdZ62ne3ro5EY04',
    time: '9:00am - 5:00pm',
  },
  'annual-in-service': {
    slug: 'annual-in-service',
    name: '8 Hour Annual In-Service Training',
    price: '$80.00',
    priceCents: 8000,
    stripeProductId: 'prod_VTHQfhv6T3pn15',
    paymentLink: 'https://buy.stripe.com/aFa00iclM8EM2ne6DA5EY03',
    time: '9:00am - 5:00pm',
  },
};

export function getCourse(slug: string): Course | undefined {
  return COURSES[slug];
}
