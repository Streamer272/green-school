<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="files" />

      <!-- content -->
      <Loading :property="loading" :is-boolean="true" :fill="true">
        <form
          @submit="submit"
          class="w-full h-full flex items-center justify-center flex-col gap-y-2"
        >
          <input
            v-model="name"
            placeholder="Name..."
            class="rounded-full py-2 px-4 bg-light text-dark"
          />

          <input
            @change="selectFile"
            type="file"
            placeholder="File..."
            required
            class="rounded-full py-2 px-4 bg-light text-dark"
          />

          <button
            type="submit"
            class="bg-light text-dark py-2 px-4 rounded-full"
          >
            Submit
          </button>
        </form>
      </Loading>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { ref as sref, uploadBytes } from "firebase/storage";
import { useAuthGuard, useFireStorage } from "~/composables/useFirebase";

const name = ref("");
const file = ref<File | null>(null);
const loading = ref(false);
const id = useId();

function selectFile(event: Event) {
  file.value = (event.target as HTMLInputElement).files?.item(0) ?? null;
}

function submit(event: Event) {
  event.preventDefault();
  if (!file.value) return;

  const trueName = name.value || file.value.name;
  const fileRef = sref(useFireStorage(), `${id}/${trueName}`);

  loading.value = true;
  uploadBytes(fileRef, file.value)
    .then(() => {
      navigateTo(`/admin/files/${id}`);
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
}

useAuthGuard(true);
</script>
