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
// TODO: add contact info for the green school lead team
// TODO: figure out how to end projects
// TODO: figure out how to structure members
// TODO: refactor meeting.present to be a string[]
// TODO: make a member list component

useAuthGuard(true);
</script>
