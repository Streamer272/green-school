<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="projects" />

      <!-- content -->
      <AdminContent>
        <Loading :property="projects">
          <div
            :key="project.id"
            v-for="(project, index) in projects"
            class="flex items-start justify-start flex-col w-[40vw] relative"
          >
            <p class="font-source font-bold text-xl text-light">
              {{ project.name }} ({{ GSDate.pretty(project.start) }} -
              {{ GSDate.prettyish(project.end, "?") }})
            </p>

            <p
              v-html="processText(project.description)"
              class="font-source text-lg text-light"
            />

            <MemberList :members="project.members" />
            <FileList :files="project.files" />

            <div
              class="absolute top-2 right-2 flex items-center justify-center gap-x-2"
            >
              <NuxtLink :to="`/admin/projects/edit/${project.id}`">
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </NuxtLink>

              <button @click="deleteProject(project.id)">
                <img src="/icons/delete.svg" alt="Delete" class="w-8 h-8" />
              </button>
            </div>

            <div
              v-if="index !== projects?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </AdminContent>

      <NuxtLink to="/admin/projects/new">
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
import { collection, deleteDoc, getDocs } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import type { Project } from "~/composables/useFirestore";

const projects = ref<Project[] | undefined>(undefined);

function deleteProject(projectId: string) {
  if (!confirm("Are you sure you want to delete this project?")) return;

  projects.value = undefined;
  deleteDoc(doc(collection(useFirestore(), "projects"), projectId))
    .then(fetch)
    .catch(alert);
}

function fetch() {
  getDocs(collection(useFirestore(), "projects")).then((snapshot) => {
    const array: Project[] = [];
    snapshot.forEach((item) => {
      array.push({
        ...item.data(),
        id: item.id,
      } as Project);
    });
    array.sort((a, b) => GSDate.sort({ date: a.start }, { date: b.start }));
    projects.value = array;
  });
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
