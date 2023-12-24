<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <!-- sidebar -->
      <AdminSidebar current="index" />

      <!-- content -->
      <div class="w-full h-full"></div>
    </div>
  </Background>
</template>

<script lang="ts" setup>
// TODO: make meetings public
// TODO: refactor blog index
// TODO: figure out how to end projects
// TODO: fix overflows
// TODO: fix client firebase errors
// TODO: add keys to v-for's

useAuthGuard(true);
</script>
