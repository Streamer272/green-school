<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="timeline" />

      <AdminContent>
        <Loading :property="loading" :is-boolean="true" :fill="true">
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

            <input
              v-model="embed"
              placeholder="Embed..."
              class="rounded-full py-2 px-4 bg-light text-dark w-[40rem]"
            />

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

const name = ref("");
const description = useTextEditor();
const icon = ref("");
const start = ref(0);
const end = ref(0);
const embed = ref<string | undefined>();
const files = useFileList();
const members = useMemberList();
const loading = ref(false);

function submit(event: Event) {
  event.preventDefault();
  loading.value = true;

  addDoc(collection(useFirestore(), "themes"), {
    name: name.value,
    description: description.value,
    icon: icon.value,
    start: start.value,
    end: end.value,
    embed: embed.value || undefined,
    files: files.value,
    members: members.value,
  })
    .then(() => {
      navigateTo("/admin/timeline");
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
}

useAuthGuard(true);
</script>
