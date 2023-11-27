<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="attendance" />

      <!-- content -->
      <div class="w-full h-full flex items-center justify-center flex-col">
        Hello World!
      </div>
    </div>
  </Background>
</template>

<script lang="ts" setup>
useAuthGuard(true);
</script>
