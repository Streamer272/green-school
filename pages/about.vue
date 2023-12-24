<template>
  <Background>
    <main
      class="flex flex-col justify-start items-center w-screen min-h-screen overflow-auto"
    >
      <TitleRouter route="about" />
      <div class="w-full h-4" />

      <!-- about -->
      <div
        class="flex items-start justify-start flex-col mx-72 w-[50vw] gap-y-4"
      >
        <p
          class="font-source font-bold text-light text-3xl w-full text-center mb-4"
        >
          Meet the Green School
        </p>

        <!-- row wrapper -->
        <Loading :property="sortedFellas" :fill="true">
          <div
            v-for="(fella, index) in sortedFellas"
            :data-odd="index % 2 === 1"
            class="flex items-center justify-start w-full data-[odd=true]:flex-row-reverse"
          >
            <div
              :data-odd="index % 2 === 1"
              class="flex items-start justify-center w-[25vw] gap-x-4 data-[odd=true]:flex-row-reverse"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg"
                alt="Man"
                class="h-80"
              />

              <div class="flex items-start justify-start flex-col">
                <p class="font-source font-bold text-xl text-light">
                  {{ fella.name }}
                </p>

                <p class="font-source font-semibold text-unim">
                  {{ fella.lore }}
                </p>
              </div>
            </div>
          </div>

          <div class="h-36" />
        </Loading>
      </div>
    </main>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import type { Fella } from "~/composables/useFirestore";
import { collection, getDocs } from "@firebase/firestore";
import { useMemberSort } from "~/composables/useHelp";

const fellas = ref<Fella[] | undefined>(undefined);
const sortedFellas = computed(() => {
  if (!fellas.value) return undefined;
  return fellas.value.sort(useMemberSort());
});

onMounted(() => {
  getDocs(collection(useFirestore(), "fellas")).then((snapshot) => {
    fellas.value = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        picture: data.picture,
        lore: data.lore,
        role: data.lore,
        contact: data.contact,
        priority: data.priority,
      };
    });
  });
});
</script>
