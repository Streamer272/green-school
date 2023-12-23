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
            :data-hidden="post.hidden"
            class="flex items-start justify-start flex-col w-[40vw] relative data-[hidden=true]:opacity-75"
          >
            <p class="font-source font-bold text-xl text-light">
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
              class="absolute top-2 right-2 flex items-center justify-center gap-x-2"
            >
              <button @click="() => copyUrl(index)" class="flex-shrink-0">
                <img src="/icons/copy.svg" alt="Copy" class="w-8 h-8" />
              </button>

              <NuxtLink
                :to="`/admin/blog/edit/${post.id}`"
                class="flex-shrink-0"
              >
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </NuxtLink>
            </div>

            <div
              v-if="index !== posts?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </div>

      <NuxtLink to="/admin/blog/new">
        <img
          src="/icons/plus.svg"
          alt="Add"
          class="w-12 h-12 fixed bottom-4 right-4"
        />
      </NuxtLink>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { collection, getDocs } from "@firebase/firestore";
import { processText } from "~/composables/useText";
import type { Post } from "~/composables/useFirestore";

const posts = ref<Post[] | undefined>(undefined);

function copyUrl(index: number) {
  const post = posts.value![index];
  navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
}

onMounted(() => {
  getDocs(collection(useFirestore(), "posts")).then((snapshot) => {
    const array: Post[] = [];
    snapshot.forEach((item) => {
      array.push({
        ...item.data(),
        id: item.id,
      } as Post);
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
