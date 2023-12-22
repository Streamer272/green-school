<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="projects" />

      <!-- content -->
      <Loading :property="loading" :is-boolean="true" :fill="true">
        <form
          @submit="submit"
          class="w-full h-full flex items-center justify-center flex-col gap-y-2"
        >
          <div class="w-full flex items-center justify-center gap-x-4">
            <input
              v-model="name"
              placeholder="Name..."
              required
              class="rounded-full py-2 px-4 bg-light text-dark"
            />
            <input
              v-model="start"
              placeholder="Start..."
              required
              class="rounded-full py-2 px-4 bg-light text-dark"
            />

            <button
              type="submit"
              class="bg-light text-dark py-2 px-4 rounded-full"
            >
              Submit
            </button>
          </div>

          <FileListEditor />

          <div class="w-[60%]">
            <TextEditor v-model="description" />
          </div>
        </form>
      </Loading>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { addDoc, collection } from "@firebase/firestore";
import { useAuthGuard, useFirestore } from "~/composables/useFirebase";

const name = ref("");
const description = ref("");
const start = ref("");
const files = useFileList();
const loading = ref(false);

function submit(event: Event) {
  event.preventDefault();
  loading.value = true;

  addDoc(collection(useFirestore(), "projects"), {
    name: name.value,
    description: description.value,
    start: start.value,
    files: files.value,
  })
    .then(() => {
      navigateTo("/admin/projects");
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
}

useAuthGuard(true);
</script>
