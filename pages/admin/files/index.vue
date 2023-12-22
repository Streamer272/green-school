<template></template>

<script lang="ts" setup>
import { listAll, ref as sref } from "firebase/storage";
import { useFireStorage } from "~/composables/useFirebase";

const folders = ref<string[] | undefined>(undefined);

onMounted(() => {
  const root = sref(useFireStorage());
  listAll(root)
    .then((res) => {
      folders.value = res.prefixes.map((x) => x.name);
    })
    .catch(alert);
});
</script>
