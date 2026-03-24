import { asset } from "../lib/asset";
import type { JournalMediaItem } from "../types/content";

export const journalGallery: readonly JournalMediaItem[] = [
  {
    alt: "PandAnna nella neve",
    caption: "Il frame largo regge bene panoramiche, arrivi e scene di viaggio.",
    id: "pandanna-neve",
    kind: "photo",
    orientation: "landscape",
    src: asset("assets/images/panda-hero-snow.jpg"),
    title: "Ingresso in scena",
  },
  {
    alt: "Dettaglio del ponte e del gruppo ruota",
    caption: "I tag media permettono di mischiare scatti tecnici e clip nello stesso archivio.",
    id: "ponte-gruppo-ruota",
    kind: "photo",
    orientation: "square",
    src: asset("assets/images/panda-axle.jpg"),
    title: "Dettaglio tecnico",
  },
  {
    alt: "PandAnna vista frontale in garage",
    caption: "I formati verticali entrano nei moduli stretti senza schiacciare il soggetto.",
    id: "pandanna-garage",
    kind: "photo",
    orientation: "portrait",
    src: asset("assets/images/panda-front-garage.jpg"),
    title: "Ritratto in garage",
  },
  {
    alt: "Dettaglio del fondo e della ruggine",
    caption: "Le card larghe sono pronte per foto orizzontali e video di lavorazione.",
    id: "fondo-ruggine",
    kind: "photo",
    orientation: "landscape",
    src: asset("assets/images/panda-rust-floor.jpg"),
    title: "Fondo e lavorazioni",
  },
  {
    alt: "Sottoscocca della Panda in lavorazione",
    caption: "Le verticali restano leggibili anche nell'archivio quando il journal cresce.",
    id: "sottoscocca-panda",
    kind: "photo",
    orientation: "portrait",
    src: asset("assets/images/panda-underbody.jpg"),
    title: "Sottoscocca aperto",
  },
];

export const journalSections = [
  {
    label: "01",
    meta: `${journalGallery.length} media`,
    title: "Foto + Video",
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
