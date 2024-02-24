<template>
  <button
    @click="() => (open = !open)"
    class="flex items-center justify-center absolute top-7 right-7 z-50 bg-dark rounded-full w-[3.125rem] h-[3.125rem]"
  >
    <img src="/icons/info.svg" alt="Info" class="w-8 h-8" />
  </button>

  <div
    :data-open="open"
    class="flex items-start justify-start flex-col absolute top-[6.25rem] right-[1.5625rem] bg-dark w-[20rem] md:w-[25rem] p-6 mx-4 rounded-[1.875rem] data-[open=false]:-translate-y-8 data-[open=false]:translate-x-4 data-[open=false]:opacity-0 data-[open=false]:invisible transition-all"
  >
    <p class="font-source font-semibold text-xl text-light">Sleduj nás</p>
    <div class="flex items-center justify-center my-2 px-4 gap-x-4">
      <NuxtLink to="https://www.instagram.com/insta.gercenka/" class="w-6 h-6">
        <img
          src="https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png"
          alt="Instagram"
        />
      </NuxtLink>

      <NuxtLink to="https://www.youtube.com/@youtube.gercenka" class="w-6 h-6">
        <img
          src="https://www.youtube.com/s/desktop/0f128ffd/img/favicon_48x48.png"
          alt="YouTube"
        />
      </NuxtLink>

      <NuxtLink
        to="https://www.facebook.com/zelenaskolagercenka"
        class="w-6 h-6"
      >
        <img
          src="https://www.facebook.com/images/fb_icon_325x325.png"
          alt="Facebook"
        />
      </NuxtLink>
    </div>

    <p class="font-source font-semibold text-xl text-light mt-2">Vytvorili</p>
    <div class="flex items-center justify-center ml-4">
      <p class="font-source font-semibold text-lg text-cece">
        Daniel Svitaň &nbsp;
      </p>
      <p class="text-disc">(kód)</p>

      <NuxtLink to="https://svitan.dev/" class="ml-2">
        <img src="/icons/open.svg" alt="Open" />
      </NuxtLink>
    </div>
    <div class="flex items-center justify-center ml-4">
      <p class="font-source font-semibold text-lg text-cece">
        Richard Sepši &nbsp;
      </p>
      <p class="text-disc">(dizajn)</p>
    </div>
    <p class="font-source font-semibold text-lg text-disc ml-4">
      pre zelenú školu
    </p>

    <p class="font-source font-semibold text-lg text-light mt-4">
      Naposledy aktualizované
    </p>
    <div class="flex items-center justify-center ml-4">
      <p class="font-source font-semibold text-lg text-cece">
        24. 2. 2024 09:58
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const open = useInfo();
</script>
