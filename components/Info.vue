<template>
  <button
    @click="() => (open = !open)"
    class="flex items-center justify-center absolute top-[1.5625rem] right-[1.5625rem] bg-dark rounded-full w-[3.125rem] h-[3.125rem]"
  >
    <img src="/icons/info.png" alt="Info" />
  </button>

  <!-- TODO: Finish me -->
  <div
    :data-open="open"
    class="absolute top-[6.25rem] right-[1.5625rem] bg-dark w-[25rem] h-[21.875rem] rounded-[1.875rem] data-[open=false]:opacity-0 transition-all"
  >
    Hello World!
  </div>
</template>

<style scoped lang="scss"></style>

<script lang="ts" setup>
const open = useState("info", () => false);
</script>
