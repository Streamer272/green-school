<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="index" />

      <AdminContent />
    </div>
  </Background>
</template>

<script lang="ts" setup>
// TODO: make meetings public
// TODO: refactor blog index
// TODO: figure out how to end projects
// TODO: fix client firebase errors

useAuthGuard(true);
</script>
