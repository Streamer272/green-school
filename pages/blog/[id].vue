<template>
  <Background>
    <TitleRouter route="blog" />
    <div class="w-full h-16" />

    <Loading :property="post" :fill="true">
      <div class="flex justify-center items-start flex-col w-[60vw] gap-x-4">
        <p class="font-source font-bold text-2xl text-light">
          {{ post.title }}
        </p>
        <MemberList :members="post.authors" size="lg" />
        <p class="font-source font-semibold text-xl text-light">
          {{ GSDate.pretty(post.date) }}
        </p>

        <p v-html="post?.content" class="font-source text-lg text-light mt-2" />
      </div>
    </Loading>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import { doc, getDoc, or } from "firebase/firestore";
import { collection, getDocs, query, where } from "@firebase/firestore";
import type { Post } from "~/composables/useFirestore";
import { usePost } from "~/composables/useStates";

const id = useId();
const post = usePost();

function searchBySLink() {
  getDocs(
    query(
      collection(useFirestore(), "posts"),
      or(where("id", "==", id), where("sLink", "==", id)),
    ),
  )
    .then((snapshot) => {
      if (snapshot.docs.length !== 1) {
        console.log(
          `Found a sus amount of snapshots (${snapshot.docs.length})`,
        );
      }

      for (const doc of snapshot.docs) {
        const data = doc.data() as Post | undefined;

        if (!data) {
          navigateTo("/blog");
          continue;
        }

        post.value = {
          ...data,
          id: doc.id,
        };
        return;
      }

      console.log("Nothing found");
      navigateTo("/blog");
    })
    .catch(alert);
}

onMounted(() => {
  if (post.value !== undefined && post.value.id === id && id) return;

  getDoc(doc(collection(useFirestore(), "posts"), id))
    .then((doc) => {
      const data = doc.data() as Post | undefined;

      if (!data) {
        console.log("Data not found, trying search by slink");
        return searchBySLink();
      }

      post.value = {
        ...data,
        id: doc.id,
      };
    })
    .catch(alert);
});
</script>
