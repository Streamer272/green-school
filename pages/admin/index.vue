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
// TODO: add deleting to things
// TODO: refactor timestamps
// TODO: make meetings public

useAuthGuard(true);
</script>
