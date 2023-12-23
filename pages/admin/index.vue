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
// TODO: refactor timestamps
// TODO: make meetings public
// TODO: add members to projects
// TODO: refactor blog index
// TODO: add contact info for the green school lead team

useAuthGuard(true);
</script>
