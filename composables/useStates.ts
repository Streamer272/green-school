import type { GSFile, GSMember } from "~/composables/useGSTypes";

export function useInfo() {
  return useState<boolean>("info", () => false);
}

export function useProjects() {
  return useState<boolean>("projectsOpen", () => false);
}

export function useFileList() {
  return useState<GSFile[]>("fileList", () => []);
}

export function useMemberList() {
  return useState<GSMember[]>("memberList", () => []);
}

export function useTextEditor(defaultValue: string = "") {
  return useState<string>("textEditor", () => defaultValue);
}
