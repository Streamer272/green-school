<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="meetings" />

      <!-- content -->
      <div
        class="w-full h-full flex items-center justify-center flex-col gap-y-2"
      >
        <Loading :property="meeting">
          <div class="w-full flex items-center justify-center gap-x-4">
            <input
              v-model="date"
              placeholder="Date..."
              class="rounded-full py-2 px-4 bg-light text-dark"
            />
            <input
              v-model="present"
              placeholder="Present..."
              class="rounded-full py-2 px-4 bg-light text-dark"
            />
            <button
              @click="submit()"
              class="bg-light text-dark py-2 px-4 mr-44 rounded-full"
            >
              Submit
            </button>
          </div>

          <TextEditor v-model="notes" />
        </Loading>
      </div>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { useId } from "~/composables/useURL";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import { getTinymce } from "@tinymce/tinymce-vue/lib/es2015/main/ts/TinyMCE";

const id = useId();
const meeting = ref<Meeting | undefined>(undefined);
const date = ref("");
const present = ref("");
const notes = ref("");

function fetch() {
  getDoc(doc(collection(useFirestore(), "meetings"), id)).then((snapshot) => {
    const data = snapshot.data() as Meeting | undefined;

    if (!data) {
      navigateTo("/admin/meetings");
      return;
    }
    meeting.value = {
      ...data,
      id: snapshot.id,
    };

    date.value = data.date;
    present.value = data.present;
    notes.value = data.notes;
    getTinymce().activeEditor.setContent(data.notes);
  });
}

function submit() {
  meeting.value = undefined;

  setDoc(doc(collection(useFirestore(), "meetings"), id), {
    date: date.value,
    present: present.value,
    notes: notes.value,
  })
    .then(() => {
      fetch();
    })
    .catch((err) => {
      alert(err);
    });
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
