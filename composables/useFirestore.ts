import type { GSDate, GSFile, GSMember } from "~/composables/useGSTypes";

export interface Meeting {
  id: string;
  date: GSDate;
  present: GSMember[];
  notes: string;
  files: GSFile[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: GSDate;
  authors: GSMember[];
  image?: string;
  status: "private" | "public";
  hidden: boolean;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  start: number;
  end: number;
  embed?: string;
  files: GSFile[];
  members: GSMember[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  start: GSDate;
  end: GSDate;
  files: GSFile[];
  members: GSMember[];
}

export interface Fella extends GSMember {
  id: string;
  picture?: string;
  lore?: string;
}
