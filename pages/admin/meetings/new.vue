<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="meetings" />

      <AdminContent>
        <Loading :property="loading" :is-boolean="true" :fill="true">
          <form
            @submit="submit"
            class="w-full h-full flex items-center justify-center flex-col gap-y-2"
          >
            <div class="w-full flex items-center justify-center gap-x-4">
              <input
                v-model="date"
                type="date"
                placeholder="Date..."
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
import { addDoc, collection } from "@firebase/firestore";

const date = ref("");
const present = useMemberList();
const notes = useTextEditor();
const files = useFileList();
const loading = ref(false);

function submit(event: Event) {
  event.preventDefault();
  loading.value = true;

  addDoc(collection(useFirestore(), "meetings"), {
    date: GSDate.to(date.value),
    present: present.value,
    notes: notes.value,
    files: files.value,
  })
    .then(() => {
      navigateTo("/admin/meetings");
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
}

useAuthGuard(true);
</script>
