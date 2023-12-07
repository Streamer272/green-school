<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="timeline" />

      <!-- content -->
      <Loading :property="theme" :fill="true">
        <form
          @submit="submit"
          class="w-full h-full flex items-center justify-center flex-col gap-y-2"
        >
          <div class="w-full flex items-center justify-center gap-x-4">
            <input
              v-model="name"
              placeholder="Name..."
              required
              class="rounded-full py-2 px-4 bg-light text-dark w-80"
            />

            <button
              type="submit"
              class="bg-light text-dark py-2 px-4 rounded-full"
            >
              Submit
            </button>
          </div>

          <div class="w-full flex items-center justify-center gap-x-4">
            <input
              v-model="icon"
              placeholder="Icon..."
              required
              class="rounded-full py-2 px-4 bg-light text-dark"
            />

            <input
              v-model="start"
              placeholder="Start..."
              required
              type="number"
              class="rounded-full py-2 px-4 bg-light text-dark w-40"
            />

            <input
              v-model="end"
              placeholder="End..."
              required
              type="number"
              class="rounded-full py-2 px-4 bg-light text-dark w-40"
            />
          </div>

          <div
            v-if="files.length > 0"
            class="w-full flex items-center justify-center gap-x-4"
          >
            <div
              v-for="(file, index) in files"
              class="flex items-center justify-center"
            >
              <p class="font-source font-semibold text-lg text-light">
                {{ file.name }} ({{ file.type }})
              </p>

              <a :href="file.link" class="ml-2">
                <img src="/icons/open.svg" alt="Open" />
              </a>

              <div
                v-if="index !== files.length - 1"
                class="bg-unim h-6 w-px mx-2"
              />
            </div>
          </div>

          <div class="w-full flex items-center justify-center gap-x-4">
            <input
              v-model="fileName"
              placeholder="File name..."
              class="rounded-full py-2 px-4 bg-light text-dark w-80"
            />

            <input
              v-model="fileType"
              placeholder="File type..."
              class="rounded-full py-2 px-4 bg-light text-dark w-80"
            />
          </div>

          <div class="w-full flex items-center justify-center gap-x-4">
            <input
              v-model="fileLink"
              placeholder="File link..."
              class="rounded-full py-2 px-4 bg-light text-dark w-80"
            />

            <button @click="addFile()" type="button" class="px-4 rounded-full">
              <img src="/icons/plus.svg" alt="Add" class="w-10 h-10" />
            </button>
          </div>

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
import { useAuthGuard, useFirestore } from "~/composables/useFirebase";
import type { Ref } from "vue";

const id = useId();
const theme = ref<Theme | undefined>(undefined);
const name = ref("");
const description = ref("");
const icon = ref("");
const start = ref(0);
const end = ref(0);
const files: Ref<ThemeFile[]> = ref([]);
const fileName = ref("");
const fileType = ref("");
const fileLink = ref("");

function fetch() {
  getDoc(doc(collection(useFirestore(), "themes"), id))
    .then((snapshot) => {
      const data = snapshot.data() as Theme | undefined;

      if (!data) {
        navigateTo("/admin/themes");
        return;
      }
      theme.value = {
        ...data,
        id: snapshot.id,
      };

      name.value = data.name;
      description.value = data.description;
      icon.value = data.icon;
      start.value = data.start;
      end.value = data.end;
      files.value = data.files;
    })
    .catch(alert);
}

function submit(event: Event) {
  event.preventDefault();
  theme.value = undefined;

  setDoc(doc(collection(useFirestore(), "themes"), id), {
    name: name.value,
    description: description.value,
    icon: icon.value,
    start: start.value,
    end: end.value,
    files: files.value,
  })
    .then(fetch)
    .catch(alert);
}

function addFile() {
  const array = files.value;
  array.push({
    name: fileName.value,
    type: fileType.value,
    link: fileLink.value,
  });

  fileName.value = "";
  fileType.value = "";
  fileLink.value = "";
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
