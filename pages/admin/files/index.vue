<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="files" />

      <AdminContent>
        <Loading :property="folders">
          <div
            :key="folder"
            v-for="folder in folders"
            class="flex items-center justify-start w-[10vw]"
          >
            <NuxtLink
              :to="`/admin/files/${folder}`"
              class="font-source font-semibold text-light text-xl"
            >
              {{ folder }}/
            </NuxtLink>
          </div>
        </Loading>
      </AdminContent>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { listAll, ref as sref } from "firebase/storage";
const folders = ref<string[] | undefined>(undefined);

onMounted(() => {
  const root = sref(useFireStorage());
  listAll(root)
    .then((res) => {
      folders.value = res.prefixes.map((x) => x.name);
    })
    .catch(alert);
});

useAuthGuard(true);
</script>
