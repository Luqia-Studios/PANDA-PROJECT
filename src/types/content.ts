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

export type JournalMediaKind = "photo" | "video";

export type JournalMediaOrientation = "landscape" | "portrait" | "square";

type JournalMediaBase = {
  id: string;
  alt: string;
  caption: string;
  orientation: JournalMediaOrientation;
  title: string;
};

export type JournalPhoto = JournalMediaBase & {
  kind: "photo";
  src: string;
};

export type JournalVideo = JournalMediaBase & {
  kind: "video";
  duration?: string;
  poster?: string;
  src: string;
};

export type JournalMediaItem = JournalPhoto | JournalVideo;
