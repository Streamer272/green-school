<template>
  <button
    @click="() => (open = !open)"
    class="flex items-center justify-center absolute top-7 right-7 bg-dark rounded-full w-[3.125rem] h-[3.125rem]"
  >
    <img src="/icons/info.svg" alt="Info" class="w-8 h-8" />
  </button>

  <div
    :data-open="open"
    class="flex items-start justify-start flex-col absolute top-[6.25rem] right-[1.5625rem] bg-dark w-[20rem] md:w-[25rem] p-6 mx-4 rounded-[1.875rem] data-[open=false]:-translate-y-8 data-[open=false]:translate-x-4 data-[open=false]:opacity-0 data-[open=false]:invisible transition-all"
  >
    <p class="font-source font-semibold text-xl text-light">Vytvorili</p>
    <div class="flex items-center justify-center ml-4">
      <p class="font-source font-semibold text-lg text-cece">
        Daniel Svitaň &nbsp;
      </p>
      <p class="text-disc">(kód)</p>
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
        15. 1. 2024 14:27
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const open = useInfo();
</script>
