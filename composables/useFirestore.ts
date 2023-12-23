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

  /* converts string to iso string */
  static to(it: string | GSDate) {
    const date = GSDate.as(it);
    return date.toISOString();
  }

  /* converts string to date */
  static as(it: string | GSDate): Date {
    return new Date(it.toString());
  }

  /* converts string to pretty string */
  static pretty(it: string | GSDate) {
    const date = GSDate.as(it);
    return date.toLocaleDateString("sk-SK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  /* converts string to ugly string (for date inputs) */
  static ugly(it: string | GSDate) {
    const date = GSDate.as(it);
    return date.toISOString().split("T")[0];
  }
}
