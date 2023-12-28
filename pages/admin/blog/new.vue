<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="blog" />

      <AdminContent>
        <Loading :property="loading" :is-boolean="true" :fill="true">
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
            <TextEditor />
          </form>
        </Loading>
      </AdminContent>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { addDoc, collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";

const title = ref("");
const content = useTextEditor();
const date = ref("");
const authors = useMemberList();
const status = ref("");
const hidden = ref(false);
const loading = ref(false);

function submit(event: Event) {
  event.preventDefault();
  loading.value = true;

  addDoc(collection(useFirestore(), "posts"), {
    title: title.value,
    content: content.value,
    date: GSDate.to(date.value),
    authors: authors.value,
    status: status.value,
    hidden: hidden.value,
  })
    .then(() => {
      navigateTo("/admin/blog");
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
}

useAuthGuard(true);
</script>
