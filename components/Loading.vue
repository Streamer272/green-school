<template>
  <!-- TODO: fix the goofy ahh loading animation -->
  <div v-if="property === undefined" class="flex items-center justify-center">
    <img
      src="/images/leaf-animation.gif"
      alt="Rotating leaf"
      class="w-64 h-48"
    />
  </div>
  <slot v-else />
</template>

<script lang="ts" setup>
defineProps<{
  property: any;
}>();
</script>
