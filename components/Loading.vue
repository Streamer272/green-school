<template>
  <div v-if="property === undefined" class="flex items-center justify-center">
    <img src="/images/loading.gif" alt="Rotating leaf" class="w-24 h-24" />
  </div>
  <slot v-else />
</template>

<script lang="ts" setup>
defineProps<{
  property: any;
}>();
</script>
