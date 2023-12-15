<template>
  <Background>
    <div
      class="flex flex-col items-center justify-center w-screen min-h-screen overflow-hidden"
    >
      <div class="flex flex-col justify-start items-center w-screen h-screen">
        <TitleRouter route="home" />
        <div class="w-full h-16" />

        <!-- content -->
        <Loading :property="theme" :fill="true">
          <p class="font-source font-semibold text-light text-3xl">
            {{ theme?.name }}
          </p>
        </Loading>
      </div>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { collection } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import { doc, getDoc } from "firebase/firestore";

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
