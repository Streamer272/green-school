<template></template>

<script lang="ts" setup>
import { addDoc, collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";

const name = ref("");
const description = ref("");
const icon = ref("");
const start = ref(0);
const end = ref(0);
const files = ref([]);
const fileName = ref("");
const fileType = ref("");
const fileLink = ref("");
const loading = ref(false);

function submit(event: Event) {
  event.preventDefault();
  loading.value = true;

  addDoc(collection(useFirestore(), "themes"), {
    name: name.value,
    description: description.value,
    icon: icon.value,
    start: start.value,
    end: end.value,
    files: files.value,
  })
    .then(() => {
      navigateTo("/admin/timeline");
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
}

useAuthGuard(true);
</script>
