<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="projects" />

      <AdminContent>
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

              <button
                type="submit"
                class="bg-light text-dark py-2 px-4 rounded-full"
              >
                Submit
              </button>
            </div>

            <div class="w-full flex items-center justify-center gap-x-4">
              <input
                v-model="start"
                type="date"
                placeholder="Start..."
                required
                class="rounded-full py-2 px-4 bg-light text-dark"
              />

              <input
                v-model="end"
                type="date"
                placeholder="End..."
                class="rounded-full py-2 px-4 bg-light text-dark"
              />

              <button type="button" @click="cancel">
                <img src="/icons/cancel.svg" alt="Cancel" class="w-10 h-10" />
              </button>
            </div>

            <MemberListEditor />
            <FileListEditor />
            <TextEditor />
          </form>
        </Loading>
      </AdminContent>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import type { Project } from "~/composables/useFirestore";
import { GSDate } from "~/composables/useGSTypes";

const id = useId();
const project = ref<Project | undefined>(undefined);
const name = ref("");
const description = useTextEditor();
const start = ref("");
const end = ref("");
const files = useFileList();
const members = useMemberList();

function cancel() {
  end.value = "";
}

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
      start.value = GSDate.ugly(data.start);
      end.value = GSDate.uglyish(data.end);
      files.value = data.files;
      members.value = data.members;
    })
    .catch(alert);
}

function submit(event: Event) {
  event.preventDefault();
  project.value = undefined;

  setDoc(doc(collection(useFirestore(), "projects"), id), {
    name: name.value,
    description: description.value,
    start: GSDate.to(start.value),
    end: GSDate.toish(end.value),
    files: files.value,
    members: members.value,
  })
    .then(fetch)
    .catch(alert);
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
