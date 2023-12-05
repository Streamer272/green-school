<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="meetings" />

      <!-- content -->
      <form
        @submit="submit"
        class="w-full h-full flex items-center justify-center flex-col gap-y-2"
      >
        <div class="w-full flex items-center justify-center gap-x-4">
          <input
            v-model="date"
            placeholder="Date..."
            required
            class="rounded-full py-2 px-4 bg-light text-dark"
          />
          <input
            v-model="present"
            placeholder="Present..."
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

        <TextEditor v-model="notes" />
      </form>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { useEditorText } from "~/composables/useEditorText";
import { addDoc, collection } from "@firebase/firestore";

const date = ref("");
const present = ref("");
const notes = useEditorText();

function submit(event: Event) {
  event.preventDefault();

  addDoc(collection(useFirestore(), "meetings"), {
    date: date.value,
    present: present.value,
    notes: notes.value,
  })
    .then(() => {
      navigateTo("/admin/meetings");
    })
    .catch((err) => {
      alert(err);
    });
}

useAuthGuard(true);
</script>
