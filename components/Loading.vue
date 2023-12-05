<template>
  <div
    v-if="check()"
    :data-fill="fill"
    class="flex items-center justify-center data-[fill=true]:w-full data-[fill=true]:h-full"
  >
    <img src="/images/loading.gif" alt="Rotating leaf" class="w-24 h-24" />
  </div>
  <slot v-else />
</template>

<script lang="ts" setup>
const props = defineProps<{
  property: any;
  isBoolean?: boolean;
  fill?: boolean;
}>();

function check() {
  if (!props.isBoolean) return props.property === undefined;
  else return props.property === true;
}
</script>
