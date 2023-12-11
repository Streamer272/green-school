<template>
  <slot />
</template>

<script lang="ts" setup>
import { useHotkeys } from "~/composables/useHotkeys";

onMounted(() => {
  useHotkeys();
});
</script>
