<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="meetings" />

      <AdminContent>
        <Loading :property="meeting" :fill="true">
          <form
            @submit="submit"
            class="w-full h-full flex items-center justify-center flex-col gap-y-2"
          >
            <div class="w-full flex items-center justify-center gap-x-4">
              <input
                v-model="date"
                type="date"
                placeholder="Date..."
                class="rounded-full py-2 px-4 bg-light text-dark"
              />
              <input
                v-model="present"
                placeholder="Present..."
                class="rounded-full py-2 px-4 bg-light text-dark"
              />
              <button
                type="submit"
                class="bg-light text-dark py-2 px-4 mr-44 rounded-full"
              >
                Submit
              </button>
            </div>

            <FileListEditor />

            <div class="w-[60%]">
              <TextEditor v-model="notes" />
            </div>
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
import type { Meeting } from "~/composables/useFirestore";
import { useMemberList } from "~/composables/useStates";

const id = useId();
const meeting = ref<Meeting | undefined>(undefined);
const date = ref("");
const present = useMemberList();
const notes = ref("");
const files = useFileList();

function fetch() {
  getDoc(doc(collection(useFirestore(), "meetings"), id))
    .then((snapshot) => {
      const data = snapshot.data() as Meeting | undefined;

      if (!data) {
        navigateTo("/admin/meetings");
        return;
      }
      meeting.value = {
        ...data,
        id: snapshot.id,
      };

      date.value = GSDate.ugly(data.date);
      present.value = data.present;
      notes.value = data.notes;
      files.value = data.files;
    })
    .catch(alert);
}

function submit(event: Event) {
  event.preventDefault();
  meeting.value = undefined;

  setDoc(doc(collection(useFirestore(), "meetings"), id), {
    date: GSDate.to(date.value),
    present: present.value,
    notes: notes.value,
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
