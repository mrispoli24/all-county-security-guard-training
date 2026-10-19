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
  // TODO: Replace with real Stripe Payment Links from dad's Stripe dashboard
  // (Stripe Dashboard → Payments → Payment Links, one per product).
  paymentLink: string;
  time: string;
}

export const COURSES: Record<string, Course> = {
  'pre-assignment': {
    slug: 'pre-assignment',
    name: '8 Hour Pre-Assignment Training',
    price: '$60.00',
    priceCents: 6000,
    stripeProductId: 'prod_VTHRTcIFHJH9bZ',
    paymentLink: 'https://buy.stripe.com/REPLACE-PRE-ASSIGNMENT',
    time: '9:00am - 5:00pm',
  },
  'on-the-job': {
    slug: 'on-the-job',
    name: '16 Hour On-the-Job Training',
    price: '$120.00',
    priceCents: 12000,
    stripeProductId: 'prod_VTHRgWrTTM7luO',
    paymentLink: 'https://buy.stripe.com/REPLACE-ON-THE-JOB',
    time: '9:00am - 5:00pm',
  },
  'annual-in-service': {
    slug: 'annual-in-service',
    name: '8 Hour Annual In-Service Training',
    price: '$50.00',
    priceCents: 5000,
    stripeProductId: 'prod_VTHQfhv6T3pn15',
    paymentLink: 'https://buy.stripe.com/REPLACE-ANNUAL-IN-SERVICE',
    time: '9:00am - 5:00pm',
  },
};

export function getCourse(slug: string): Course | undefined {
  return COURSES[slug];
}
