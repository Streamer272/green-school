<template>
  <p class="font-source font-semibold text-unim">
    By {{ sortedMembers.join(", ") }}
  </p>
</template>

<script lang="ts" setup>
import type { GSMember } from "~/composables/useGSTypes";
// TODO: where show role

const props = defineProps<{
  members: GSMember[];
}>();

const sortedMembers = computed(() => {
  return props.members.sort((a, b) => {
    // if one has priority
    if (a.priority && !b.priority) return -1;
    else if (!a.priority && b.priority) return 1;
    // if both have different priority
    else if (a.priority && b.priority && a.priority !== b.priority)
      return a.priority - b.priority;
    // if both don't have / have the same priority
    else if (a.role && !b.role) return -1;
    else if (!a.role && b.role) return 1;
    // else (compare names - alphabetical)
    else return a.name.localeCompare(b.name);
  });
});
</script>
