<template>
  <Background>
    <TitleRouter route="blog" />

    <Loading :property="posts" :fill="true">
      <div class="flex justify-center items-start flex-col gap-y-4">
        <div
          :key="post.id"
          v-for="post in posts"
          class="flex rounded-[1.25rem] w-[50rem] h-[20rem] relative"
        >
          <!-- image -->
          <div
            class="flex items-center justify-center basis-[50%] bg-despair p-4 rounded-l-[1.25rem]"
          >
            <img
              :src="post.image"
              alt="Image"
              class="w-full h-full rounded-l-2xl"
            />
          </div>

          <!-- text -->
          <div
            class="flex items-start justify-start flex-col basis-[50%] bg-dark p-8 rounded-r-[1.25rem]"
          >
            <div class="flex justify-between items-start w-full">
              <p class="text-2xl text-light font-source font-bold">
                {{ processText(post.title) }}
              </p>

              <p class="font-bold text-nice font-source my-1 flex-shrink-0">
                {{ GSDate.pretty(post.date) }}
              </p>
            </div>

            <p
              v-html="processText(post.content)"
              class="text-unim font-source font-bold mt-4"
            />

            <div class="flex-grow" />

            <MemberList :members="post.authors" size="sm" color="limp" bold />
          </div>

          <NuxtLink
            :to="`/blog/${post.id}`"
            class="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </Loading>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import type { Post } from "~/composables/useFirestore";

const posts = useState<Post[] | undefined>("posts", () => undefined);
// TODO: sort posts by date

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
