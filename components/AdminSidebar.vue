<template>
  <div class="w-80 h-full flex items-center justify-center flex-col gap-y-2">
    <a href="/" class="font-source font-semibold text-2xl text-light">
      Go back home
    </a>

    <a
      href="/admin/blog"
      :data-current="current === 'blog'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Blogs
    </a>

    <a
      href="/admin/timeline"
      :data-current="current === 'timeline'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Timeline
    </a>

    <a
      href="/admin/projects"
      :data-current="current === 'projects'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Projects
    </a>

    <a
      href="/admin/attendance"
      :data-current="current === 'attendance'"
      class="font-source font-semibold text-2xl text-light data-[current=true]:underline"
    >
      Attendance
    </a>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  current: "index" | "blog" | "timeline" | "projects" | "attendance";
}>();
</script>
