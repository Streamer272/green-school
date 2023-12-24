<template>
  <div
    v-if="files.length > 0"
    :data-dir="getDir()"
    class="w-full flex items-start data-[dir=vertical]:flex-col gap-x-1"
  >
    <div
      v-for="(file, index) in sortedFiles"
      class="flex items-center justify-center"
    >
      <p
        :data-size="getSize()"
        :data-color="getColor()"
        class="font-source font-semibold data-[color=weak]:text-unim data-[color=strong]:text-light data-[size=md]:text-lg data-[size=lg]:text-xl"
      >
        {{ file.name }} ({{ file.type }})
      </p>

      <NuxtLink :to="file.link" class="ml-2">
        <img
          src="/icons/open.svg"
          alt="Open"
          :data-size="getSize()"
          class="data-[size=sm]:w-6 data-[size=sm]:h-6 data-[size=md]:w-6 data-[size=md]:h-6"
        />
      </NuxtLink>

      <div
        v-if="index !== files.length - 1 && getDir() === 'horizontal'"
        class="bg-unim h-6 w-px mx-2"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { GSFile } from "~/composables/useGSTypes";

const props = defineProps<{
  dir?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  color?: "strong" | "weak";
  files: GSFile[];
}>();

const sortedFiles = computed(() => {
  return props.files.sort((a, b) => {
    if (a.priority && !b.priority) return -1;
    else if (!a.priority && b.priority) return 1;
    else return (a.priority ?? 0) - (b.priority ?? 0);
  });
});

function getDir() {
  return props.dir ?? "horizontal";
}

function getSize() {
  return props.size ?? "md";
}

function getColor() {
  return props.color ?? "strong";
}
</script>
