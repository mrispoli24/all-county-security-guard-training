// Stripe Payment Links for course registration.
//
// TODO: Replace each placeholder URL below with the real Stripe Payment Link
// created in dad's Stripe dashboard (Stripe Dashboard → Payments → Payment Links,
// one link per course with the matching price). Once replaced, the
// "Register & Pay" buttons on the course pages will work with no other changes.

export const STRIPE_LINKS = {
  // TODO: 8 Hour Pre-Assignment Training — $60.00
  preAssignment: 'https://buy.stripe.com/REPLACE-8HR-PRE-ASSIGNMENT',
  // TODO: 16 Hour On-the-Job Training — $120.00
  onTheJob: 'https://buy.stripe.com/REPLACE-16HR-ON-THE-JOB',
  // TODO: 8 Hour Annual In-Service Training — $50.00
  annualInService: 'https://buy.stripe.com/REPLACE-8HR-ANNUAL-IN-SERVICE',
} as const;

export type StripeLinkKey = keyof typeof STRIPE_LINKS;
