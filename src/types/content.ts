export type NavItem = {
  label: string;
  to: string;
  description: string;
};

export type LinkCard = {
  buttonLabel?: string;
  title: string;
  to: string;
};

export type ResourceItem = {
  category: string;
  title: string;
  description: string;
  bullets: string[];
};

export type SupportItem = {
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
};

export type TimelineItem = {
  phase: string;
  title: string;
  description: string;
  status: "done" | "active" | "next";
};

export type VehicleSpec = {
  label: string;
  value: string;
  note?: string;
};
