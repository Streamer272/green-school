import type { GSFile, GSMember } from "~/composables/useGSTypes";

export function useInfo() {
  return useState("info", () => false);
}

export function useProjects() {
  return useState("projectsOpen", () => false);
}

export function useFileList() {
  return useState<GSFile[]>("fileList", () => []);
}

export function useMemberList() {
  return useState<GSMember[]>("memberList", () => []);
}
