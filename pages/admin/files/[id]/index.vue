<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="files" />

      <!-- content -->
      <div
        class="w-full h-full flex items-center justify-center flex-col overflow-auto gap-y-1"
      >
        <Loading :property="files">
          <div
            :key="file.fullPath"
            v-for="(file, index) in files"
            class="flex items-center justify-start w-[25vw]"
          >
            <p class="font-source font-semibold text-light text-xl flex-shrink">
              {{ file.name }}
            </p>

            <div class="flex-grow" />
            <button @click="() => downloadFile(index)" class="flex-shrink-0">
              <img src="/icons/download.svg" alt="Download" />
            </button>

            <button @click="() => copyUrl(index)" class="flex-shrink-0 ml-2">
              <img src="/icons/copy.svg" alt="Copy" />
            </button>
            <button @click="() => deleteFile(index)" class="flex-shrink-0 ml-2">
              <img src="/icons/delete.svg" alt="Delete" />
            </button>
          </div>
        </Loading>
      </div>

      <NuxtLink :to="`/admin/files/${id}/new`">
        <img
          src="/icons/plus.svg"
          alt="Add"
          class="w-12 h-12 fixed bottom-4 right-4"
        />
      </NuxtLink>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref as sref,
  type StorageReference,
} from "firebase/storage";
import { useAuthGuard } from "~/composables/useFirebase";

const id = useId();
const files = ref<StorageReference[] | undefined>(undefined);

function fetch() {
  const folder = sref(useFireStorage(), `${id}/`);
  listAll(folder)
    .then((res) => {
      files.value = res.items;
    })
    .catch(alert);
}

function deleteFile(index: number) {
  const file = files.value![index];
  if (!confirm("Are you sure you want to delete this file?")) return;

  files.value = undefined;
  deleteObject(file).then(fetch).catch(alert);
}

function copyUrl(index: number) {
  const file = files.value![index];
  const savedFiles = files.value;
  files.value = undefined;

  getDownloadURL(file)
    .then((url) => {
      navigator.clipboard.writeText(url);
      files.value = savedFiles;
    })
    .catch(alert);
}

function downloadFile(index: number) {
  const file = files.value![index];
  const savedFiles = files.value;
  files.value = undefined;

  getDownloadURL(file)
    .then((url) => {
      window.open(url, "_blank");
      files.value = savedFiles;
    })
    .catch(alert);
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
