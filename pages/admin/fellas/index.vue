<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="fellas" />

      <AdminContent>
        <Loading :property="fellas">
          <div
            :key="fella.id"
            v-for="(fella, index) in fellas"
            class="flex items-start justify-start flex-col w-[40vw] relative"
          >
            <div class="flex gap-x-2">
              <img :src="fella.picture" alt="Picture" class="w-32 rounded-xl" />

              <div class="flex items-start justify-start flex-col">
                <p class="font-source font-semibold text-lg text-light">
                  {{ fella.name }} ({{ fella.role || "[role]" }},
                  {{ fella.priority || "[priority]" }})
                </p>
                <p class="font-source font-semibold text-lg text-light">
                  {{ fella.contact || "[contact]" }}
                </p>

                <p
                  v-html="processText(fella.lore)"
                  class="font-source text-lg text-unim"
                />
              </div>
            </div>

            <div
              class="absolute top-2 right-2 flex items-center justify-center gap-x-2"
            >
              <NuxtLink
                :to="`/admin/fellas/edit/${fella.id}`"
                class="flex-shrink-0"
              >
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </NuxtLink>

              <button
                @click="() => deleteFella(fella.id)"
                class="flex-shrink-0"
              >
                <img src="/icons/delete.svg" alt="Delete" class="w-8 h-8" />
              </button>
            </div>

            <div
              v-if="index !== fellas?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </AdminContent>

      <NuxtLink to="/admin/fellas/new">
        <img
          src="/icons/plus.svg"
          alt="Add"
          class="w-12 h-12 fixed bottom-4 right-4"
        />
      </NuxtLink>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import type { Fella } from "~/composables/useFirestore";
import { collection, deleteDoc, getDocs } from "@firebase/firestore";
import { doc } from "firebase/firestore";

const fellas = ref<Fella[] | undefined>(undefined);

function deleteFella(fellaId: string) {
  if (!confirm("Are you sure you want to delete this fella?")) return;

  fellas.value = undefined;
  deleteDoc(doc(collection(useFirestore(), "fellas"), fellaId))
    .then(fetch)
    .catch(alert);
}

function fetch() {
  getDocs(collection(useFirestore(), "fellas")).then((snapshot) => {
    fellas.value = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Fella,
    );
  });
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
