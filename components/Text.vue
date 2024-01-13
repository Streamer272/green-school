<template>
  <div class="flex flex-col items-center gap-y-4 mb-2">
    <p
      v-html="text()"
      :class="`font-source ${styleClasses()}`"
      class="inline-block transition-all"
    />

    <div v-if="canToggle()" class="relative bg-gray h-px w-full">
      <button
        @click="() => (open = !open)"
        :data-open="open"
        class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 m-0 border-0 inline-block rotate-90 data-[open=true]:-rotate-90 transition-all"
      >
        <img
          src="/icons/arrow-circle-right.svg"
          alt="Expand"
          class="z-10 bg-despair rounded-full"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string;
  trim: boolean | undefined;
  max: number | undefined;
  canToggle: boolean | undefined;
  open: boolean | undefined;
  styles: "description" | "small-description" | undefined;
}>();

const open = ref(props.open ?? false);

function text() {
  if (props.trim && !open.value) return processText(props.text, max());
  else return props.text;
}

function max() {
  return props.max ?? 128;
}

function canToggle() {
  return props.canToggle ?? false;
}

function styleClasses() {
  switch (props.styles) {
    case "description":
      return "font-semibold text-lg text-disc";
    case "small-description":
      return "font-semibold text-unim";
    default:
      return "";
  }
}
</script>
