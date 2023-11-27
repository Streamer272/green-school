<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="timeline" />

      <!-- content -->
      <div class="w-full h-full flex items-center justify-center flex-col">
        Hello World!
      </div>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { useAuthGuard } from "~/composables/useFirebase";

useAuthGuard();
</script>
