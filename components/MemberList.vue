<template>
  <div>
    <p
      :data-size="getSize()"
      :data-color="getColor()"
      :data-bold="getBold()"
      class="relative inline font-source font-semibold data-[bold=true]:font-bold data-[color=limp]:text-disc data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
    >
      {{ prefix ?? "By" }}
      <span
        :key="member.name"
        v-for="(member, index) in sortedMembers"
        :data-size="getSize()"
        :data-color="getColor()"
        :data-bold="getBold()"
        :data-has-contact="!!member.contact"
        class="tool overflow-visible inline data-[has-contact=true]:cursor-pointer font-source font-semibold data-[bold=true]:font-bold data-[color=limp]:text-disc data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
      >
        <span v-html="member.name" /><span
          v-html="member.role ? ` (${member.role})` : ''"
        />
        {{ index !== members.length - 1 ? "," : "" }}

        <p
          v-if="member.contact"
          :data-size="getSize()"
          :data-color="getColor()"
          class="tip cursor-auto overflow-auto w-48 h-fit bg-dark text-center rounded-2xl py-2 px-4 z-10 transition-opacity font-source font-semibold data-[bold=true]:font-bold data-[color=limp]:text-disc data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
        >
          {{ member.contact }}
        </p>
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.tool {
  position: relative;

  .tip {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    opacity: 0;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    .tip {
      opacity: 100;
      pointer-events: all;
      z-index: 10;
    }
  }
}
</style>

<script lang="ts" setup>
import type { GSMember } from "~/composables/useGSTypes";

const props = defineProps<{
  size?: "sm" | "md" | "lg";
  color?: "limp" | "weak" | "strong";
  prefix?: string;
  bold?: boolean;
  members: GSMember[];
}>();

const sortedMembers = computed(() => {
  return props.members.sort(useMemberSort());
});

function getSize() {
  return props.size ?? "md";
}

function getColor() {
  return props.color ?? "strong";
}

function getBold() {
  return props.bold ?? false;
}
</script>
