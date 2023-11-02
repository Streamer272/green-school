<template>
  <button
    @click="() => (open = !open)"
    class="flex items-center justify-center gap-x-6 absolute top-10 left-10 z-20 font-source font-semibold text-white text-xl"
  >
    <img
      :data-open="open"
      src="/icons/menu.png"
      alt="Menu"
      class="data-[open=true]:rotate-90 transition"
    />

    Projects
  </button>

  <div
    :data-open="open"
    class="flex flex-col justify-start items-center absolute top-0 left-0 w-[28.125rem] h-full pt-[6.5rem] pb-2 bg-black custom-sidebar -translate-x-full data-[open=true]:translate-x-0 z-10 transition gap-y-4"
  >
    <div
      v-for="(project, index) in projects"
      class="bg-despair rounded-[1.25rem] w-[23.125rem]"
    >
      <div
        class="flex items-center justify-start gap-x-4 py-4 px-6 bg-dark rounded-[1.25rem] w-full"
      >
        <p class="font-source font-bold text-xl text-white">
          {{ project.name }}
        </p>
        <p class="font-source font-semibold text-lg text-disc">
          {{ project.start }}
        </p>
        <div class="flex-grow" />

        <button @click="changeCurrentProject(index)">
          <img
            :data-open="currentProject === index"
            src="/icons/arrow-right.png"
            alt="Arrow right"
            class="data-[open=true]:rotate-90 transition"
          />
        </button>
      </div>

      <!-- TODO: animate me -->
      <p
        :data-open="currentProject === index"
        class="font-source font-semibold m-4 text-unim data-[open=false]:hidden"
      >
        {{ project.description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-sidebar {
  a {
    font-size: 1.15rem;
  }
}
</style>

<script lang="ts" setup>
const open = useState("sidebar", () => false);
const currentProject = ref(-1);
const projects = [
  {
    name: "Project 1",
    start: "23.08.2006",
    description: "This is the project of my life.",
  },
  {
    name: "Project 2",
    start: "04.08.2022",
    description: "This is the project of exploring.",
  },
  {
    name: "Project 3",
    start: "01.09.2025",
    description: "This is the project of improving.",
  },
];

function changeCurrentProject(index: number) {
  if (currentProject.value === index) currentProject.value = -1;
  else currentProject.value = index;
}
</script>
