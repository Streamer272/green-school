export function useInfo() {
  return useState("info", () => false);
}

export function useProjects() {
  return useState("projectsOpen", () => false);
}