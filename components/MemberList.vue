<template>
  <p
    :data-size="getSize()"
    :data-color="getColor()"
    class="font-source font-semibold data-[color=limp]:text-disc data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
  >
    {{ prefix ?? "By" }} {{ membersString }}
  </p>
</template>

<script lang="ts" setup>
import type { GSMember } from "~/composables/useGSTypes";
import { useMemberSort, usePrioritySort } from "~/composables/useHelp";
// TODO: where contact

const props = defineProps<{
  size?: "sm" | "md" | "lg";
  color?: "limp" | "weak" | "strong";
  prefix?: string;
  members: GSMember[];
}>();

const sortedMembers = computed(() => {
  return props.members.sort(useMemberSort());
});

const membersString = computed(() => {
  return sortedMembers.value
    .map((member) => member.name + (member.role ? ` (${member.role})` : ""))
    .join(", ");
});

function getSize() {
  return props.size ?? "md";
}

function getColor() {
  return props.color ?? "strong";
}
</script>
