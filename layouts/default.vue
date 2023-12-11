<template>
  <slot />
</template>

<script lang="ts" setup>
import { useFireAuth } from "~/composables/useFirebase";
import { useHotkeys } from "~/composables/useHotkeys";

const user = useUser();

onMounted(() => {
  const auth = useFireAuth();
  useHotkeys(user.value, auth);
});
</script>
