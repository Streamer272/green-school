<template>
  <div
    class="w-64 h-full flex items-center justify-center flex-col gap-y-2 flex-shrink-0"
  >
    <NuxtLink to="/" class="font-source font-semibold text-2xl text-light">
      Go back home
    </NuxtLink>

    <div class="h-px w-[60%] bg-light" />

    <NuxtLink
      to="/admin/blog"
      :data-current="current === 'blog'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Blogs
    </NuxtLink>

    <NuxtLink
      to="/admin/timeline"
      :data-current="current === 'timeline'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Timeline
    </NuxtLink>

    <NuxtLink
      to="/admin/projects"
      :data-current="current === 'projects'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Projects
    </NuxtLink>

    <NuxtLink
      to="/admin/meetings"
      :data-current="current === 'meetings'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Meetings
    </NuxtLink>

    <NuxtLink
      to="/admin/fellas"
      :data-current="current === 'fellas'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Fellas
    </NuxtLink>

    <NuxtLink
      to="/admin/files"
      :data-current="current === 'files'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Files
    </NuxtLink>

    <button
      @click="() => (open = !open)"
      class="flex items-center justify-center absolute bottom-6 left-7 bg-dark rounded-full w-[3.125rem] h-[3.125rem]"
    >
      <img src="/icons/question.svg" alt="Question mark" class="w-8 h-8" />
    </button>

    <div
      :data-open="open"
      class="flex items-start justify-start flex-col absolute bottom-12 left-[5.25rem] bg-dark w-[25rem] p-6 rounded-[1.875rem] data-[open=false]:translate-y-8 data-[open=false]:-translate-x-4 data-[open=false]:opacity-0 transition-all"
    >
      <p class="font-source font-semibold text-lg text-light text-center">
        If you are experiencing any issues or have any questions, contact your
        maintainer, who is currently registered to be Daniel Svitan, available
        by phone at +421 948 309 804 or by WhatsApp at +1 (669) 294-9970.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  current:
    | "index"
    | "blog"
    | "timeline"
    | "projects"
    | "meetings"
    | "fellas"
    | "files";
}>();

const open = useInfo();
</script>
