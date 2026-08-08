import { removalsServices, supportServices } from "./services";

export type NavLink = { label: string; to: string };

export const removalsNav: NavLink[] = removalsServices.map((s) => ({
  label: s.navLabel,
  to: `/${s.slug}`,
}));

export const supportNav: NavLink[] = supportServices.map((s) => ({
  label: s.navLabel,
  to: `/${s.slug}`,
}));

export const companyNav: NavLink[] = [
  { label: "About TTT", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "Areas We Cover", to: "/areas-we-cover" },
  { label: "Contact", to: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
];
