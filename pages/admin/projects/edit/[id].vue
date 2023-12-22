<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="projects" />

      <!-- content -->
      <Loading :property="project" :fill="true">
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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import type { Project } from "~/composables/useFirestore";

const id = useId();
const project = ref<Project | undefined>(undefined);
const name = ref("");
const description = ref("");
const start = ref("");
const files = useFileList();

function fetch() {
  getDoc(doc(collection(useFirestore(), "projects"), id))
    .then((snapshot) => {
      const data = snapshot.data() as Project | undefined;

      if (!data) {
        navigateTo("/admin/projects");
        return;
      }
      project.value = {
        ...data,
        id: snapshot.id,
      };

      name.value = data.name;
      description.value = data.description;
      start.value = data.start;
      files.value = data.files;
    })
    .catch(alert);
}

function submit(event: Event) {
  event.preventDefault();
  project.value = undefined;

  setDoc(doc(collection(useFirestore(), "projects"), id), {
    name: name.value,
    description: description.value,
    start: start.value,
    files: files.value,
  })
    .then(fetch)
    .catch(alert);
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
