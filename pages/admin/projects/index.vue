<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="projects" />

      <!-- content -->
      <div
        class="w-full h-full flex items-center justify-center flex-col overflow-auto"
      >
        <Loading :property="projects">
          <div
            v-for="(project, index) in projects"
            class="flex items-start justify-start flex-col w-[40vw] relative"
          >
            <p class="font-source font-bold text-xl text-light">
              {{ project.name }} ({{ project.start }})
            </p>

            <p
              v-html="processText(project.description)"
              class="font-source text-lg text-light"
            />
            <div class="absolute top-2 right-2">
              <a :href="`/admin/projects/edit/${project.id}`">
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </a>
            </div>

            <div
              v-if="index !== projects?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </div>

      <a href="/admin/projects/new">
        <img
          src="/icons/plus.svg"
          alt="Add"
          class="w-12 h-12 fixed bottom-4 right-4"
        />
      </a>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { collection, getDocs } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";

const projects = ref<Project[] | undefined>(undefined);

onMounted(() => {
  getDocs(collection(useFirestore(), "projects")).then((snapshot) => {
    const array: Project[] = [];
    snapshot.forEach((item) => {
      array.push({
        ...item.data(),
        id: item.id,
      } as Project);
    });
    array.sort((a, b) => {
      const splitA = a.start.split(".");
      const splitB = b.start.split(".");
      const dateA = new Date(+splitA[2], +splitA[1] - 1, +splitA[0]);
      const dateB = new Date(+splitB[2], +splitB[1] - 1, +splitB[0]);
      return dateB.getTime() - dateA.getTime();
    });
    projects.value = array;
  });
});

useAuthGuard(true);
</script>