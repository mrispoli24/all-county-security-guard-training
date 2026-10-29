// Registration page routes. Each course page collects the student's
// details, saves them to Turso, then redirects to the Stripe Payment Link
// for that course (see src/lib/courses.ts for the payment links).

export const STRIPE_LINKS = {
  preAssignment: '/register/pre-assignment',
  onTheJob: '/register/on-the-job',
  annualInService: '/register/annual-in-service',
} as const;

export type StripeLinkKey = keyof typeof STRIPE_LINKS;
