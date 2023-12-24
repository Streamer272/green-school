<template>
  <div
    v-if="files.length > 0"
    class="w-full flex items-center justify-center gap-x-1"
  >
    <div
      v-for="(file, index) in files"
      class="flex items-center justify-center"
    >
      <p class="font-source font-semibold text-lg text-light">
        {{ file.name }} ({{ file.type }}, {{ file.priority || "[priority]" }},
        {{ file.date || "[date]" }})
      </p>

      <NuxtLink :to="file.link" class="ml-2">
        <img src="/icons/open.svg" alt="Open" class="w-6 h-6" />
      </NuxtLink>
      <button @click="() => removeFile(index)" class="ml-2">
        <img src="/icons/delete.svg" alt="Delete" class="w-6 h-6" />
      </button>

      <div v-if="index !== files.length - 1" class="bg-unim h-6 w-px mx-2" />
    </div>
  </div>

  <div class="w-full flex items-center justify-center gap-x-4">
    <input
      v-model="name"
      placeholder="File name..."
      class="rounded-full py-2 px-4 bg-light text-dark w-80"
    />

    <input
      v-model="type"
      placeholder="File type..."
      class="rounded-full py-2 px-4 bg-light text-dark w-40"
    />

    <input
      type="number"
      pattern="\d*"
      v-model="priority"
      placeholder="File priority..."
      class="rounded-full py-2 px-4 bg-light text-dark w-40"
    />
  </div>

  <div class="w-full flex items-center justify-center gap-x-4">
    <input
      v-model="link"
      placeholder="File link..."
      class="rounded-full py-2 px-4 bg-light text-dark w-80"
    />

    <input
      v-model="date"
      type="date"
      placeholder="File date..."
      class="rounded-full py-2 px-4 bg-light text-dark w-40"
    />

    <button @click="addFile()" type="button">
      <img src="/icons/plus.svg" alt="Add" class="w-10 h-10" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useFileList } from "~/composables/useStates";

const files = useFileList();
const name = ref("");
const type = ref("");
const link = ref("");
const date = ref("");
const priority = ref(0);

function addFile() {
  files.value.push({
    name: name.value,
    type: type.value,
    link: link.value,
    date: date.value ? GSDate.to(date.value) : undefined,
    priority: priority.value || undefined,
  });

  name.value = "";
  type.value = "";
  link.value = "";
  date.value = "";
  priority.value = 0;
}

function removeFile(index: number) {
  files.value.splice(index, 1);
}
</script>
