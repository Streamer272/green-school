interface Meeting {
  id: string;
  date: string;
  present: string;
  notes: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  status: "private" | "public";
}

interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  start: number;
  end: number;
  files: {
    name: string;
    type: string;
    link: string;
  }[];
}
