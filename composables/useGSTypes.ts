export interface GSFile {
  name: string;
  type: string;
  link: string;
  priority?: number;
  date?: GSDate;
}

export interface GSMember {
  name: string;
  role?: string;
  contact?: string;
  priority?: number;
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

  /* converts string to iso string if it's not empty */
  static toish(it: string | GSDate, or: string = "") {
    if (it === "") return or;
    const date = GSDate.as(it);
    return date.toISOString();
  }

  /* converts string to pretty string if it's not empty */
  static prettyish(it: string | GSDate, or: string = "") {
    if (it === "") return or;
    else return GSDate.pretty(it);
  }

  /* converts string to ugly string (for date inputs) if it's not empty */
  static uglyish(it: string | GSDate, or: string = "") {
    if (it === "") return or;
    else return GSDate.ugly(it);
  }

  /* sorts array by date (latest will be on top) */
  static sort(a: { date: string | GSDate }, b: { date: string | GSDate }) {
    return GSDate.as(b.date).getTime() - GSDate.as(a.date).getTime();
  }
}
