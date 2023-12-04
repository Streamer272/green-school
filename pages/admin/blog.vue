<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="blog" />

      <!-- content -->
      <div
        class="w-full h-full flex items-center justify-center flex-col overflow-auto"
      >
        <Loading :property="posts">
          <div
            v-for="(post, index) in posts"
            class="flex items-start justify-start flex-col w-[40vw]"
          >
            <p class="font-source font-bold text-lg text-light">
              {{ post.title }} ({{ post.author }})
            </p>
            <p class="font-source font-semibold text-lg text-light">
              {{ post.date }} ({{ post.status }})
            </p>

            <p
              v-html="processText(post.content)"
              class="font-source text-lg text-light"
            />

            <div
              v-if="index !== posts?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </div>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { collection, getDocs } from "@firebase/firestore";
import { processText } from "~/composables/useEditorText";

const posts = ref<Post[] | undefined>(undefined);

interface Post {
  title: string;
  content: string;
  date: string;
  author: string;
  status: "private" | "public";
}

onMounted(() => {
  getDocs(collection(useFirestore(), "posts")).then((snapshot) => {
    const array: Post[] = [];
    snapshot.forEach((item) => {
      array.push(item.data() as Post);
    });
    array.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    posts.value = array;
  });
});

useAuthGuard(true);
</script>
