<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="blog" />

      <AdminContent>
        <Loading :property="post" :fill="true">
          <form
            @submit="submit"
            class="w-full h-full flex items-center justify-center flex-col gap-y-2"
          >
            <div class="w-full flex items-center justify-center gap-x-4">
              <input
                v-model="title"
                placeholder="Title..."
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
                v-model="date"
                type="date"
                placeholder="Date..."
                required
                class="rounded-full py-2 px-4 bg-light text-dark"
              />

              <select
                v-model="status"
                required
                class="rounded-full py-2 px-4 bg-light text-dark"
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>

              <div class="flex items-center justify-center gap-x-2">
                <input
                  v-model="hidden"
                  type="checkbox"
                  name="hidden-post"
                  id="hidden-post"
                  class="bg-dark accent-gray"
                />
                <label
                  for="hidden-post"
                  class="font-source font-semibold text-lg text-light"
                >
                  Hidden
                </label>
              </div>
            </div>

            <MemberListEditor />

            <div class="w-[60%]">
              <TextEditor v-model="content" />
            </div>
          </form>
        </Loading>
      </AdminContent>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { Post } from "~/composables/useFirestore";

const id = useId();
const post = ref<Post | undefined>(undefined);
const title = ref("");
const content = ref("");
const date = ref("");
const authors = useMemberList();
const status = ref("");
const hidden = ref(false);

function fetch() {
  getDoc(doc(collection(useFirestore(), "posts"), id))
    .then((snapshot) => {
      const data = snapshot.data() as Post | undefined;

      if (!data) {
        navigateTo("/admin/blog");
        return;
      }
      post.value = {
        ...data,
        id: snapshot.id,
      };

      title.value = data.title;
      content.value = data.content;
      date.value = GSDate.ugly(data.date);
      authors.value = data.authors;
      status.value = data.status;
      hidden.value = data.hidden;
    })
    .catch(alert);
}

function submit(event: Event) {
  event.preventDefault();
  post.value = undefined;

  setDoc(doc(collection(useFirestore(), "posts"), id), {
    title: title.value,
    content: content.value,
    date: date.value,
    authors: authors.value,
    status: status.value,
    hidden: hidden.value,
  })
    .then(fetch)
    .catch(alert);
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
