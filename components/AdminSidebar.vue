<template>
  <div class="w-80 h-full flex items-center justify-center flex-col gap-y-2">
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
      to="/admin/files"
      :data-current="current === 'files'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Files
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  current: "index" | "blog" | "timeline" | "projects" | "meetings" | "files";
}>();
</script>
