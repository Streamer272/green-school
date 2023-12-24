import type { GSMember } from "~/composables/useGSTypes";

const textCutoff = 128;

export function processText(content: string): string {
  if (content.length < textCutoff) return content;
  else return content.substring(0, textCutoff - 3) + "...";
}

export function useId(id?: string | string[]): string {
  id ??= useRoute().params.id;
  return typeof id === "object" ? id[0] : id;
}

// the more, the merrier
export function usePrioritySort() {
  return (a: { priority?: number }, b: { priority?: number }) => {
    if (a.priority && !b.priority) return -1;
    else if (!a.priority && b.priority) return 1;
    else return (b.priority ?? 0) - (a.priority ?? 0);
  };
}

export function useMemberSort() {
  return (a: GSMember, b: GSMember) => {
    // by priority
    const byPriority = usePrioritySort()(a, b);
    if (byPriority !== 0) return byPriority;
    // by role
    else if (a.role && !b.role) return -1;
    else if (!a.role && b.role) return 1;
    // by name
    else return a.name.localeCompare(b.name);
  };
}
