import { serverTimestamp, Timestamp } from "@firebase/firestore";

export interface Meeting {
  id: string;
  date: string;
  present: string;
  notes: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  status: "private" | "public";
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  start: number;
  end: number;
  files: GSFile[];
  members: string[];
}

export interface GSFile {
  name: string;
  type: string;
  link: string;
  priority?: number;
  date?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  start: string;
  files: GSFile[];
}

export function now(date?: Date) {
  if (date) return Timestamp.fromDate(date);
  return serverTimestamp();
}

export function ddmmyy(date: string) {
  const dateParts = date.split(".");
  return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
}
