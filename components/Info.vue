<template>
  <button
    @click="() => (open = !open)"
    class="flex items-center justify-center absolute top-7 right-7 bg-dark rounded-full w-[3.125rem] h-[3.125rem]"
  >
    <img src="/icons/info.svg" alt="Info" class="w-8 h-8" />
  </button>

  <div
    :data-open="open"
    class="flex items-start justify-start flex-col absolute top-[6.25rem] right-[1.5625rem] bg-dark w-[25rem] p-6 rounded-[1.875rem] data-[open=false]:-translate-y-8 data-[open=false]:translate-x-4 data-[open=false]:opacity-0 transition-all"
  >
    <p class="font-source font-semibold text-xl text-light">Created by</p>
    <div class="flex items-center justify-center ml-4">
      <p class="font-source font-semibold text-lg text-cece">
        Daniel Svitan &nbsp;
      </p>
      <p class="text-disc">(code)</p>
    </div>
    <div class="flex items-center justify-center ml-4">
      <p class="font-source font-semibold text-lg text-cece">
        Richard Sepsi &nbsp;
      </p>
      <p class="text-disc">(design)</p>
    </div>
    <p class="font-source font-semibold text-lg text-disc ml-4">
      for the green school
    </p>

    <p class="font-source font-semibold text-xl text-light mt-4">
      Last updated
    </p>
    <div class="flex items-center justify-center ml-4">
      <p class="font-source font-semibold text-lg text-cece">
        28. 12. 2023 12:55
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useInfo } from "~/composables/useStates";

const open = useInfo();
</script>
