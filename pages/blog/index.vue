<template>
  <Background>
    <div
      class="flex flex-col justify-start items-center w-screen min-h-screen overflow-hidden"
    >
      <TitleRouter route="blog" />
      <div class="w-full h-16" />

      <Loading :property="posts" :fill="true">
        <div class="flex justify-center items-start gap-x-4">
          <div
            :key="`index-${index}`"
            v-for="index in 3"
            class="flex items-center justify-start flex-col gap-y-2"
          >
            <div
              :key="article.id"
              v-for="article in getArticles(posts!!, index - 1)"
              class="rounded-3xl bg-hood text-light w-60 px-6 py-4 relative"
            >
              <p class="text-lg text-white font-source font-semibold">
                {{ processText(article.title) }}
              </p>
              <p
                v-html="processText(article.content)"
                class="text-light font-source"
              />

              <NuxtLink
                :to="`/blog/${article.id}`"
                class="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </Loading>
    </div>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import type { Post } from "~/composables/useFirestore";

const posts = useState<Post[] | undefined>("posts", () => undefined);

function getArticles(posts: Post[], index: number): Post[] {
  const array: Post[] = [];
  for (let i = index; i < posts.length; i += 3) {
    array.push(posts[i]);
  }

  return array;
}

onMounted(() => {
  getDocs(
    query(collection(useFirestore(), "posts"), where("hidden", "==", false)),
  ).then((snapshot) => {
    const array: Post[] = [];
    snapshot.forEach((item) => {
      array.push({
        ...item.data(),
        id: item.id,
      } as Post);
    });
    array.sort((a, b) => {
      const dateA = GSDate.as(a.date);
      const dateB = GSDate.as(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    posts.value = array;
  });
});
</script>
