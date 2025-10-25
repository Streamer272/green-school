<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="timeline" />

      <AdminContent>
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
                type="number"
                pattern="\d+"
                required
                class="rounded-full py-2 px-4 bg-light text-dark w-40"
              />

              <input
                v-model="end"
                placeholder="End..."
                type="number"
                pattern="\d+"
                required
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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import type { Theme } from "~/composables/useFirestore";

const id = useId();
const theme = ref<Theme | undefined>(undefined);
const name = ref("");
const description = useTextEditor();
const icon = ref("");
const start = ref(0);
const end = ref(0);
const embed = ref<string | undefined>();
const files = useFileList();
const members = useMemberList();

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
      embed.value = data.embed;
      files.value = data.files;
      members.value = data.members;
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
    embed: embed.value,
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
