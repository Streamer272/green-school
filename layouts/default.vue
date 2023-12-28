<template>
  <slot />
</template>

<script lang="ts" setup>
onMounted(() => {
  useHotkeys();
});
</script>
