<template>
  <Background>
    <p class="font-source font-semibold text-light text-xl">Hello World!</p>
  </Background>
</template>

<script lang="ts" setup>
import { useAuthGuard } from "~/composables/useFirebase";

useAuthGuard();
</script>
