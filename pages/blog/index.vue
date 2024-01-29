<template>
  <Background>
    <TitleRouter route="blog" />
    <div class="w-full h-4" />

    <Loading :property="posts" :fill="true">
      <div class="flex justify-center items-start flex-col gap-y-4">
        <NuxtLink
          :key="post.id"
          v-for="post in posts"
          :to="`/blog/${post.id}`"
          class="flex rounded-[1.25rem] w-[90vw] md:w-[50rem] h-[20rem] relative"
        >
          <!-- text -->
          <div
            :data-has-image="!!post.image"
            class="flex items-start justify-start flex-col w-full bg-dark p-8 flex-grow rounded-l-[1.25rem] data-[has-image=false]:rounded-r-[1.25rem]"
          >
            <div class="flex justify-between items-center w-full">
              <p class="text-2xl text-light font-source font-bold">
                {{ processText(post.title) }}
              </p>

              <p class="font-bold text-nice font-source flex-shrink-0">
                {{ GSDate.pretty(post.date) }}
              </p>
            </div>

            <Text
              :text="post.content"
              styles="description"
              trim
              :max="512"
              class="mt-4"
            />

            <div class="flex-grow" />

            <MemberList :members="post.authors" size="sm" color="limp" bold />
          </div>

          <!-- image -->
          <div
            v-if="post.image"
            class="h-full max-w-[20rem] rounded-r-2xl bg-despair p-4 flex-shrink-0"
          >
            <img
              :src="post.image"
              alt="Image"
              class="h-full w-full object-contain"
            />
          </div>
        </NuxtLink>
      </div>
    </Loading>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import { collection, getDocs, query, where } from "@firebase/firestore";
import type { Post } from "~/composables/useFirestore";

const posts = useState<Post[] | undefined>("posts", () => undefined);

onMounted(() => {
  getDocs(
    query(
      collection(useFirestore(), "posts"),
      where("hidden", "==", false),
      where("status", "==", "public"),
    ),
  ).then((snapshot) => {
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
});
</script>
