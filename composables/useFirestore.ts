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
