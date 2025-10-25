<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="index" />

      <AdminContent />
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

const auth = useFireAuth();
const provider = new GoogleAuthProvider();
auth.useDeviceLanguage();

signInWithPopup(auth, provider).then(() => {
  navigateTo("/admin");
});
</script>
