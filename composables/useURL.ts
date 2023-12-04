export function useId(id?: string | string[]): string {
  id ??= useRoute().params.id;
  return typeof id === "object" ? id[0] : id;
}
