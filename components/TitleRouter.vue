<template>
  <div
    class="flex items-center justify-start md:justify-center w-screen fixed md:static left-1/2 bottom-0 -translate-x-1/2 md:translate-x-0 z-40"
  >
    <div
      class="flex bg-despair rounded-[1.25rem] gap-x-1 md:gap-x-2 p-2 mx-4 my-6 overflow-scroll"
    >
      <NuxtLink
        to="/"
        :data-current="route === 'home'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl flex-shrink-0"
      >
        Domov
      </NuxtLink>

      <NuxtLink
        to="/themes"
        :data-current="route === 'themes'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl flex-shrink-0"
      >
        Témy
      </NuxtLink>

      <NuxtLink
        to="/blog"
        :data-current="route === 'blog'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl flex-shrink-0"
      >
        Blog
      </NuxtLink>

      <NuxtLink
        to="/about"
        :data-current="route === 'about'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl flex-shrink-0"
      >
        O nás
      </NuxtLink>

      <NuxtLink
        to="/archive"
        :data-current="route === 'archive'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl flex-shrink-0 hidden md:inline-block"
      >
        Archív
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  route: "home" | "themes" | "blog" | "about" | "archive";
}>();
</script>
