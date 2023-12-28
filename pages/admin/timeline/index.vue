<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="timeline" />

      <AdminContent>
        <Loading :property="themes">
          <div
            :key="theme.id"
            v-for="(theme, index) in themes"
            class="flex items-start justify-start flex-col w-[40vw] relative"
          >
            <div class="flex items-center justify-center">
              <p class="font-source font-bold text-xl text-light">
                {{ theme.name }}
              </p>
              <img :src="theme.icon" alt="Theme icon" class="ml-2" />
              <p class="font-source font-semibold text-lg text-light ml-2">
                ({{ theme.start }} - {{ theme.end }})
              </p>
            </div>

            <FileList :files="theme.files" />
            <MemberList :members="theme.members" />

            <p
              v-html="theme.description"
              class="font-source text-lg text-light"
            />
            <div class="absolute top-2 right-2">
              <NuxtLink :to="`/admin/timeline/edit/${theme.id}`">
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </NuxtLink>
            </div>

            <div
              v-if="index !== themes?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </AdminContent>

      <NuxtLink to="/admin/timeline/new">
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
import { collection, getDocs } from "@firebase/firestore";
import type { Theme } from "~/composables/useFirestore";

const themes = ref<Theme[] | undefined>(undefined);

onMounted(() => {
  getDocs(collection(useFirestore(), "themes")).then((snapshot) => {
    const array: Theme[] = [];
    snapshot.forEach((item) => {
      array.push({
        ...item.data(),
        id: item.id,
      } as Theme);
    });
    array.sort((a, b) => b.start - a.start);
    themes.value = array;
  });
});

useAuthGuard(true);
</script>
