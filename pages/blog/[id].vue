<template>
  <Background>
    <TitleRouter route="blog" />
    <div class="w-full h-16" />

    <Loading :property="post" :fill="true">
      <div class="flex justify-center items-start flex-col w-[60vw] gap-x-4">
        <p class="font-source font-bold text-2xl text-light">
          {{ post.title }}
        </p>
        <p class="font-source font-semibold text-xl text-light">
          {{ post.author }} · {{ post.date }}
        </p>

        <p v-html="post?.content" class="font-source text-lg text-light mt-2" />
      </div>
    </Loading>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import { doc, getDoc } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import type { Post } from "~/composables/useFirestore";

const id = useId();
const post = ref<Post | undefined>(undefined);

onMounted(() => {
  getDoc(doc(collection(useFirestore(), "posts"), id))
    .then((snapshot) => {
      const data = snapshot.data() as Post | undefined;

      if (!data) {
        navigateTo("/blog");
        return;
      }
      post.value = {
        ...data,
        id: snapshot.id,
      };
    })
    .catch(alert);
});
</script>
