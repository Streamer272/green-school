<template>
  <Background>
    <TitleRouter route="about" />
    <div class="w-full h-4" />

    <!-- about -->
    <div
      class="flex items-start justify-start flex-col mx-72 w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] gap-y-8 md:gap-y-4"
    >
      <p
        class="font-source font-bold text-light text-3xl w-full text-center mb-2"
      >
        Spoznaj kolégium
      </p>

      <div class="flex justify-center w-full">
        <p
          class="font-source font-bold text-unim text-lg text-center mb-4 w-[50rem]"
        >
          Sme KOLÉGIUM ZELENEJ ŠKOLY na
          <NuxtLink to="https://skolasvr.edupage.org/" class="underline">
            Spojenej škole sv. Rodiny
          </NuxtLink>
          . Naša škola je zapojená do medzinárodného projektu
          <NuxtLink to="https://zelenaskola.sk/" class="underline">
            Zelená škola
          </NuxtLink>
          a my ho na našej škole koordinujeme. Inak povedané: sme partia mladých
          ľudí, ktorým osud našej planéty nie je ľahostajný, a preto sa snažia o
          ekologizáciu školy, ktorú navštevujú. Našou koordinátorkou je pani
          učiteľka Renáta Tóthová.
        </p>
      </div>

      <!-- row wrapper -->
      <Loading :property="sortedFellas" :fill="true">
        <div
          :key="fella.id"
          v-for="(fella, index) in sortedFellas"
          :data-odd="index % 2 === 1"
          class="flex items-center justify-start w-full h-fit data-[odd=true]:flex-row-reverse"
        >
          <div
            :data-has-picture="!!fella.picture"
            :data-odd="index % 2 === 1"
            class="flex items-center justify-center w-screen md:w-[50vw] lg:w-[40vw] xl:w-[30vw] data-[has-picture=false]:w-full h-fit gap-x-4 data-[odd=true]:flex-row-reverse"
          >
            <img
              v-if="fella.picture"
              :src="fella.picture"
              alt="Picture"
              class="max-h-40 md:max-h-60 basis-[40%] rounded-2xl"
            />

            <div
              :data-centered="!fella.lore || !fella.picture"
              class="flex data-[centered=true]:justify-center flex-col basis-[60%] py-2"
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
      </Loading>

      <p
        class="font-source font-bold text-light text-3xl w-full text-center mb-2 mt-8"
      >
        Kontaktuj nás
      </p>

      <div id="contact" class="flex justify-center w-full">
        <p
          class="font-source font-bold text-unim text-lg text-center mb-4 w-[50rem]"
        >
          Môžeš nám napísať na náš email:
          <NuxtLink to="mailto:zelena.gercenka@svr.sk" class="underline">
            zelena.gercenka@svr.sk
          </NuxtLink>
          <br />
          Sú nejaké problémy so stránkou? Píš nášmu developerovi na +421 948 309
          804
        </p>
      </div>
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
