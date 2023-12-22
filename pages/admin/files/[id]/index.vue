<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="files" />

      <!-- content -->
      <div
        class="w-full h-full flex items-center justify-center flex-col overflow-auto"
      >
        <Loading :property="files">
          <div
            v-for="file in files"
            class="flex items-center justify-start w-[10vw]"
          >
            <p class="font-source font-semibold text-light text-xl">
              {{ file.name }}
            </p>
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
import { listAll, ref as sref, type StorageReference } from "firebase/storage";
import { useAuthGuard } from "~/composables/useFirebase";

const id = useId();
const files = ref<StorageReference[] | undefined>(undefined);

onMounted(() => {
  const folder = sref(useFireStorage(), `${id}/`);
  listAll(folder)
    .then((res) => {
      files.value = res.items;
    })
    .catch(alert);
});

useAuthGuard(true);
</script>
