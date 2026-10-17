// Normalized site base path with a trailing slash, so `${BASE}images/…`
// style links work both on the GitHub Pages subpath and (later) a custom
// domain with base '/'.
const raw = import.meta.env.BASE_URL;
export const BASE: string = raw.endsWith('/') ? raw : `${raw}/`;
