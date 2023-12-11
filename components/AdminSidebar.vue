<template>
  <div class="w-80 h-full flex items-center justify-center flex-col gap-y-2">
    <NuxtLink href="/" class="font-source font-semibold text-2xl text-light">
      Go back home
    </NuxtLink>

    <div class="h-px w-[60%] bg-light" />

    <NuxtLink
      href="/admin/blog"
      :data-current="current === 'blog'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Blogs
    </NuxtLink>

    <NuxtLink
      href="/admin/timeline"
      :data-current="current === 'timeline'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Timeline
    </NuxtLink>

    <NuxtLink
      href="/admin/projects"
      :data-current="current === 'projects'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Projects
    </NuxtLink>

    <NuxtLink
      href="/admin/meetings"
      :data-current="current === 'meetings'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Meetings
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  current: "index" | "blog" | "timeline" | "projects" | "meetings";
}>();
</script>
