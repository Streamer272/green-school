<template>
  <Background>
    <TitleRouter route="home" />
    <div class="w-full h-16" />

    <Loading :property="isEverythingLoading" is-boolean fill>
      <div class="flex items-start justify-start flex-col w-[90vw] md:w-[60vw]">
        <!-- theme -->
        <Loading :property="theme" fill>
          <div
            class="flex items-center justify-center w-full flex-col md:flex-row"
          >
            <!-- left -->
            <div class="flex justify-center flex-col md:basis-1/2">
              <!-- custom width wrapper -->
              <div
                class="flex items-center justify-center flex-col w-full md:w-[70%]"
              >
                <!-- card -->
                <div
                  class="flex items-center justify-between w-full mx-2 px-6 py-4 rounded-2xl font-source font-bold text-[1.375rem] text-light text-left bg-ghetto"
                >
                  {{ theme.name }}
                  <img :src="theme.icon" alt="Theme icon" />
                </div>

                <div class="flex justify-center flex-col py-2 px-4 w-full">
                  <p
                    class="font-source font-bold text-xl text-light w-full text-center"
                  >
                    {{ theme.start }} - {{ theme.end }}
                  </p>

                  <div class="bg-gray w-full h-px m-2" />

                  <FileList
                    dir="vertical"
                    :files="theme.files"
                    size="lg"
                    class="mt-2"
                  />
                  <MemberList
                    color="limp"
                    :members="theme.members"
                    class="mt-2"
                  />
                </div>
              </div>
            </div>

            <!-- right -->
            <div class="md:basis-1/2">
              <Text :text="theme.description" styles="description" />
            </div>
          </div>
        </Loading>

        <div class="w-full h-8" />

        <!-- blog -->
        <Loading :property="blog" fill>
          <div class="flex gap-4 flex-wrap">
            <NuxtLink
              :key="post.id"
              v-for="post in blog"
              :to="`/blog/${post.id}`"
              class="flex flex-col rounded-[1.25rem] w-[90vw] md:w-[30rem] h-[15rem] bg-dark p-4"
            >
              <!-- top row -->
              <div class="w-full flex items-center justify-between">
                <p class="font-source font-bold text-lg text-light">
                  {{ post.title }}
                </p>

                <p class="font-bold text-nice font-source flex-shrink-0">
                  {{ GSDate.pretty(post.date) }}
                </p>
              </div>

              <div class="w-full overflow-hidden mt-2">
                <Text
                  :text="post.content"
                  styles="description"
                  trim
                  :max="256"
                />
              </div>

              <div class="flex-grow" />

              <MemberList :members="post.authors" size="sm" color="limp" bold />
            </NuxtLink>
          </div>
        </Loading>
      </div>
    </Loading>

    <Info />
  </Background>
</template>

<script setup lang="ts">
import type { Post, Theme } from "~/composables/useFirestore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "@firebase/firestore";

const theme = ref<Theme | undefined>(undefined);
const blog = ref<Post[] | undefined>(undefined);
const isEverythingLoading = computed(() => {
  return theme.value === undefined && blog.value === undefined;
});

onMounted(() => {
  const currentYear = new Date().getFullYear();
  getDocs(
    query(
      collection(useFirestore(), "themes"),
      where("end", ">=", currentYear),
      orderBy("end", "desc"),
      limit(1),
    ),
  )
    .then((snapshot) => {
      const doc = snapshot.docs[0];
      theme.value = {
        ...doc.data(),
        id: doc.id,
      } as Theme;
    })
    .catch(alert);

  getDocs(
    query(
      collection(useFirestore(), "posts"),
      where("status", "==", "public"),
      where("hidden", "==", false),
      orderBy("date", "desc"),
      limit(12),
    ),
  )
    .then((snapshot) => {
      const array: Post[] = [];
      snapshot.docs.forEach((it) => {
        array.push({
          ...it.data(),
          id: it.id,
        } as Post);
      });
      blog.value = array;
    })
    .catch(console.log);
});
</script>
