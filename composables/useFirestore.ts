export interface Meeting {
  id: string;
  date: GSDate;
  present: string;
  notes: string;
  files: GSFile[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: GSDate;
  author: string;
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
  files: GSFile[];
  members: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  start: GSDate;
  files: GSFile[];
}

export interface GSFile {
  name: string;
  type: string;
  link: string;
  priority?: number;
  date?: GSDate;
}

export class GSDate extends String {
  constructor(date: string) {
    super(date);
  }

  static from(it: Date) {
    return new GSDate(it.toISOString());
  }

  static fromString(it: string) {
    return new GSDate(new Date(it).toISOString());
  }

  static now() {
    return GSDate.from(new Date());
  }

  static as(it: string): Date {
    return new Date(it.toString());
  }

  static pretty(it: string) {
    const date = GSDate.as(it);
    return date.toLocaleDateString("sk-SK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
