<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="index" />

      <AdminContent />
    </div>
  </Background>
</template>

<script lang="ts" setup>
// TODO: fix client firebase errors
// TODO: add an archive

useAuthGuard(true);
</script>
