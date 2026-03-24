import { asset } from "../lib/asset";

export const journalGallery = [
  {
    alt: "PandAnna nella neve",
    src: asset("assets/images/panda-hero-snow.jpg"),
  },
  {
    alt: "Dettaglio del ponte e del gruppo ruota",
    src: asset("assets/images/panda-axle.jpg"),
  },
  {
    alt: "PandAnna vista frontale in garage",
    src: asset("assets/images/panda-front-garage.jpg"),
  },
  {
    alt: "Dettaglio del fondo e della ruggine",
    src: asset("assets/images/panda-rust-floor.jpg"),
  },
  {
    alt: "Sottoscocca della Panda in lavorazione",
    src: asset("assets/images/panda-underbody.jpg"),
  },
] as const;

export const journalSections = [
  {
    label: "01",
    meta: `${journalGallery.length} foto`,
    title: "Foto",
    to: "/journal/foto",
  },
  {
    label: "02",
    meta: "coming soon",
    title: "Diario di bordo",
    to: "/journal/diario",
  },
  {
    label: "03",
    meta: "coming soon",
    title: "Altro",
    to: "/journal/altro",
  },
] as const;
