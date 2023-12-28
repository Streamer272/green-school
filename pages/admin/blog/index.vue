<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="blog" />

      <AdminContent>
        <Loading :property="posts">
          <div
            :key="post.id"
            v-for="(post, index) in posts"
            :data-hidden="post.hidden"
            class="flex items-start justify-start flex-col w-[40vw] relative data-[hidden=true]:opacity-75"
          >
            <div class="flex gap-x-2">
              <img
                v-if="post.image"
                :src="post.image"
                alt="Image"
                class="w-32 rounded-xl"
              />
              <p
                v-else
                class="text-light font-source font-semibold text-lg w-32 h-full"
              >
                No image
              </p>

              <div class="flex items-start justify-start flex-col">
                <p class="font-source font-bold text-xl text-light">
                  {{ post.title }}
                </p>
                <MemberList :members="post.authors" size="lg" />
                <p class="font-source font-semibold text-lg text-light">
                  {{ GSDate.pretty(post.date) }} ({{ post.status }})
                </p>

                <p
                  v-html="processText(post.content)"
                  class="font-source text-lg text-light"
                />
              </div>
            </div>

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

              <button @click="() => deletePost(post.id)" class="flex-shrink-0">
                <img src="/icons/delete.svg" alt="Delete" class="w-8 h-8" />
              </button>
            </div>

            <div
              v-if="index !== posts?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </AdminContent>

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
import { collection, deleteDoc, getDocs } from "@firebase/firestore";
import type { Post } from "~/composables/useFirestore";
import { doc } from "firebase/firestore";

const posts = ref<Post[] | undefined>(undefined);

function copyUrl(index: number) {
  const post = posts.value![index];
  navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
}

function deletePost(postId: string) {
  if (!confirm("Are you sure you want to delete this post?")) return;

  posts.value = undefined;
  deleteDoc(doc(collection(useFirestore(), "posts"), postId))
    .then(fetch)
    .catch(alert);
}

function fetch() {
  getDocs(collection(useFirestore(), "posts")).then((snapshot) => {
    const array: Post[] = [];
    snapshot.forEach((item) => {
      array.push({
        ...item.data(),
        id: item.id,
      } as Post);
    });
    array.sort(GSDate.sort);
    posts.value = array;
  });
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
