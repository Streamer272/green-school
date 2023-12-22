<template>
  <Background>
    <div class="flex flex-col items-center justify-center w-screen h-screen">
      <TitleRouter route="home" />
      <div class="w-full h-16" />

      <div
        class="flex flex-col justify-start items-center w-[60vw] h-full overflow-auto"
      >
        <!-- content -->
        <Loading :property="theme" :fill="true">
          <p class="font-source font-semibold text-light text-3xl">
            {{ theme?.name }}
          </p>

          <p
            v-html="theme?.description"
            class="font-source font-semibold text-unim mt-6 text-lg w-full"
          />

          <div class="w-full h-px bg-unim my-2" />
          <p class="font-source font-semibold text-unim text-lg w-full">
            Members: {{ theme?.members.join(", ") }}
          </p>
        </Loading>
      </div>
    </div>

    <Projects />
    <Info />
  </Background>
</template>

<script lang="ts" setup>
import { collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import { doc, getDoc } from "firebase/firestore";
import type { Theme } from "~/composables/useFirestore";

const id = useId();
const theme = ref<Theme | undefined>(undefined);

onMounted(() => {
  getDoc(doc(collection(useFirestore(), "themes"), id))
    .then((snapshot) => {
      const data = snapshot.data() as Theme | undefined;

      if (!data) {
        navigateTo("/");
        return;
      }
      theme.value = {
        ...data,
        id: snapshot.id,
      };
    })
    .catch((err) => {
      console.error(err);
      navigateTo("/");
    });
});
</script>
