<template>
  <div>
    <p
        :data-size="getSize()"
        :data-color="getColor()"
        :data-bold="getBold()"
        class="relative inline font-source font-semibold data-[bold=true]:font-bold data-[color=limp]:text-disc data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
    >
      {{ prefix ?? "By" }}
    </p>

    <p
        :key="member.name"
        v-for="(member, index) in sortedMembers"
        :data-size="getSize()"
        :data-color="getColor()"
        :data-bold="getBold()"
        :data-has-contact="!!member.contact"
        class="tool overflow-visible inline data-[has-contact=true]:cursor-pointer ml-1 font-source font-semibold data-[bold=true]:font-bold data-[color=limp]:text-disc data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
    >
      {{ member.name }}{{
        member.role ? ` (${member.role})` : ""
      }}{{ index !== members.length - 1 ? "," : "" }}

      <p
          v-if="member.contact"
          :data-size="getSize()"
          :data-color="getColor()"
          class="tip cursor-auto w-48 h-fit bg-dark rounded-2xl py-2 px-4 z-10 transition-opacity font-source font-semibold data-[bold=true]:font-bold data-[color=limp]:text-disc data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
      >
        {{ member.contact }}
      </p>
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
  }

  &:hover {
    .tip {
      opacity: 100;
      pointer-events: all;
    }
  }
}
</style>

<script lang="ts" setup>
import type {GSMember} from "~/composables/useGSTypes";
import {useMemberSort} from "~/composables/useHelp";

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
