<template>
  <div class="flex items-center justify-center w-screen">
    <div class="flex bg-despair rounded-[1.25rem] gap-x-2 p-2 my-6">
      <NuxtLink
        to="/"
        :data-current="route === 'home'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl"
      >
        Domov
      </NuxtLink>

      <NuxtLink
        to="/themes"
        :data-current="route === 'themes'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl"
      >
        Témy
      </NuxtLink>

      <NuxtLink
        to="/blog"
        :data-current="route === 'blog'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl"
      >
        Blog
      </NuxtLink>

      <NuxtLink
        to="/about"
        :data-current="route === 'about'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl"
      >
        O nás
      </NuxtLink>

      <NuxtLink
        to="/archive"
        :data-current="route === 'archive'"
        class="text-unim font-bold font-source text-xl px-4 py-2 data-[current=true]:bg-ghetto rounded-2xl"
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
