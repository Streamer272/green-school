<template>
  <button
    @click="() => (open = !open)"
    class="flex items-center justify-center gap-x-6 absolute top-9 left-9 z-20 font-source font-semibold text-white text-xl"
  >
    <img
      :data-open="open"
      src="/icons/menu.svg"
      alt="Menu"
      class="data-[open=true]:rotate-90 transition w-8 h-8"
    />

    Projects
  </button>

  <div
    :data-open="open"
    class="flex flex-col justify-start items-center absolute top-0 left-0 w-[28.125rem] h-full pt-[6.5625rem] pb-2 bg-black custom-sidebar -translate-x-full data-[open=true]:translate-x-0 z-10 transition gap-y-4"
  >
    <!-- projects column -->
    <Loading :property="projects">
      <div
        v-for="(project, index) in projects"
        class="bg-despair rounded-[1.25rem] w-[23.125rem]"
      >
        <div
          type="button"
          @click="changeCurrentProject(index)"
          class="flex items-center justify-start gap-x-4 py-4 px-6 bg-dark rounded-[1.25rem] w-full cursor-pointer"
        >
          <p class="font-source font-bold text-xl text-white">
            {{ project.name }}
          </p>
          <p class="font-source font-semibold text-lg text-disc">
            {{ GSDate.pretty(project.start) }}
          </p>
          <div class="flex-grow" />

          <img
            :data-open="currentProject === index"
            src="/icons/arrow-right.svg"
            alt="Arrow right"
            class="data-[open=true]:rotate-90 transition w-10 h-10"
          />
        </div>

        <div
          :data-open="currentProject === index"
          class="flex flex-col m-4 gap-y-2 data-[open=false]:opacity-0 data-[open=false]:my-0 data-[open=false]:max-h-px max-h-screen overflow-hidden transition-all"
        >
          <p
            v-html="project.description"
            class="font-source font-semibold text-unim"
          />
          <div
            v-if="project.files.length > 0 || project.members.length > 0"
            class="w-full bg-gray h-[0.125rem] my-1"
          />

          <MemberList size="sm" color="weak" :members="project.members" />
          <FileList
            dir="vertical"
            size="sm"
            color="weak"
            :files="project.files"
          />
        </div>
      </div>
    </Loading>
  </div>
</template>

<script lang="ts" setup>
import { collection, getDocs } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import { useProjects } from "~/composables/useStates";
import type { Project } from "~/composables/useFirestore";

const open = useProjects();
const currentProject = ref(-1);
const projects = useState<Project[] | undefined>("projects", () => undefined);

function changeCurrentProject(index: number) {
  if (currentProject.value === index) currentProject.value = -1;
  else currentProject.value = index;
}

onMounted(() => {
  getDocs(collection(useFirestore(), "projects")).then((snapshot) => {
    const array: Project[] = [];
    snapshot.forEach((item) => {
      array.push(item.data() as Project);
    });
    array.sort((a, b) => {
      const aSplit = a.start.split(".");
      const bSplit = b.start.split(".");
      const aValue =
        parseInt(aSplit[2]) * 100 +
        parseInt(aSplit[1]) * 10 +
        parseInt(aSplit[0]);
      const bValue =
        parseInt(bSplit[2]) * 100 +
        parseInt(bSplit[1]) * 10 +
        parseInt(bSplit[0]);
      return aValue - bValue;
    });
    projects.value = array;
  });
});
</script>
