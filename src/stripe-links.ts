// Stripe Payment Links for course-page buttons. The registration backend's
// matching payment links are defined in src/lib/courses.ts.

export const STRIPE_LINKS = {
  preAssignment: 'https://buy.stripe.com/00w4gybhI08g7Hye625EY05',
  onTheJob: 'https://buy.stripe.com/aFa4gy2LcdZ62ne3ro5EY04',
  annualInService: 'https://buy.stripe.com/aFa00iclM8EM2ne6DA5EY03',
} as const;

export type StripeLinkKey = keyof typeof STRIPE_LINKS;
