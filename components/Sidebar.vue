<template>
  <button
    @click="() => (open = !open)"
    :data-open="open"
    class="absolute top-4 left-4 w-12 h-12 z-10 data-[open=true]:ml-60 transition-all"
  >
    <img src="/icons/ham-menu.svg" alt="Menu" />
  </button>

  <div
    :data-open="open"
    class="flex flex-col justify-start items-start absolute top-0 left-0 w-60 h-full py-3 px-2 custom-bg custom-sidebar -translate-x-full data-[open=true]:translate-x-0 z-20 transition"
  >
    <a>Hello World Project</a>
    <a>NatArt Project</a>
    <a>Portfolio Project</a>
  </div>
</template>

<style lang="scss" scoped>
.custom-bg {
  background-color: rgba(148, 201, 59, 0.75);
}

.custom-sidebar {
  a {
    font-size: 1.15rem;
  }
}
</style>

<script lang="ts" setup>
const open = useState("sidebar", () => false);
</script>
