<template>
  <Background>
    <TitleRouter route="about" />
    <div class="w-full h-4" />

    <!-- about -->
    <div class="flex items-start justify-start flex-col mx-72 w-[50vw] gap-y-4">
      <p
        class="font-source font-bold text-light text-3xl w-full text-center mb-4"
      >
        Meet the Green School
      </p>

      <!-- row wrapper -->
      <Loading :property="sortedFellas" :fill="true">
        <div
          :key="fella.id"
          v-for="(fella, index) in sortedFellas"
          :data-odd="index % 2 === 1"
          class="flex items-center justify-start w-full data-[odd=true]:flex-row-reverse"
        >
          <div
            :data-has-picture="!!fella.picture"
            :data-odd="index % 2 === 1"
            class="flex items-start justify-center w-[30vw] data-[has-picture=false]:w-full h-80 gap-x-4 data-[odd=true]:flex-row-reverse"
          >
            <img
              v-if="fella.picture"
              :src="fella.picture"
              alt="Picture"
              class="h-full basis-[40%] rounded-2xl"
            />

            <div
              :data-centered="!fella.lore || !fella.picture"
              class="flex items-start justify-start data-[centered=true]:justify-center flex-col basis-[60%] h-full py-2"
            >
              <p
                :data-has-lore="!!fella.lore"
                class="font-source font-bold text-xl text-light data-[has-lore=false]:mx-4"
              >
                {{ fella.name }}{{ fella.role ? ` - ${fella.role}` : "" }}
              </p>

              <Text
                v-if="fella.lore"
                :text="fella.lore"
                styles="small-description"
              />

              <div v-if="fella.lore && fella.picture" class="flex-grow" />

              <p
                v-if="fella.contact"
                class="font-source font-semibold text-unim"
              >
                {{ fella.contact }}
              </p>
            </div>
          </div>
        </div>

        <div class="h-36" />
      </Loading>
    </div>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import type { Fella } from "~/composables/useFirestore";
import { collection, getDocs } from "@firebase/firestore";

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
        role: data.role,
        contact: data.contact,
        priority: data.priority,
      };
    });
  });
});
</script>
