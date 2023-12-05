<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="blog" />

      <!-- content -->
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
            placeholder="Date..."
            required
            class="rounded-full py-2 px-4 bg-light text-dark"
          />
          <input
            v-model="author"
            placeholder="Author..."
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
        </div>

        <TextEditor v-model="content" />
      </form>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { addDoc, collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";

const title = ref("");
const content = ref("");
const date = ref("");
const author = ref("");
const status = ref("");

function submit(event: Event) {
  event.preventDefault();

  addDoc(collection(useFirestore(), "posts"), {
    title: title.value,
    content: content.value,
    date: date.value,
    author: author.value,
    status: status.value,
  })
    .then(() => {
      navigateTo("/admin/blog");
    })
    .catch((err) => {
      alert(err);
    });
}

useAuthGuard(true);
</script>
