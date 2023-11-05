<template>
  <!-- TODO: add an actual loading animation -->
  <div v-if="property === undefined">Loading</div>
  <slot v-else />
</template>

<script lang="ts" setup>
defineProps<{
  property: any;
}>();
</script>
