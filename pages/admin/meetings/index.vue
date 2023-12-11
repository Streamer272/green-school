<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="meetings" />

      <!-- content -->
      <div
        class="w-full h-full flex items-center justify-center flex-col overflow-auto"
      >
        <Loading :property="meetings">
          <div
            v-for="(meeting, index) in meetings"
            class="flex items-start justify-start flex-col w-[40vw] relative"
          >
            <p class="font-source font-semibold text-lg text-light">
              Date: {{ meeting.date }}
            </p>
            <p class="font-source font-semibold text-lg text-light">
              Present: {{ meeting.present }}
            </p>

            <p
              v-html="processText(meeting.notes)"
              class="font-source text-lg text-light"
            />
            <div class="absolute top-2 right-2">
              <NuxtLink :to="`/admin/meetings/edit/${meeting.id}`">
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </NuxtLink>
            </div>

            <div
              v-if="index !== meetings?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </div>

      <NuxtLink to="/admin/meetings/new">
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
import { collection, getDocs } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";

const meetings = ref<Meeting[] | undefined>(undefined);

onMounted(() => {
  getDocs(collection(useFirestore(), "meetings")).then((snapshot) => {
    const array: Meeting[] = [];
    snapshot.forEach((item) => {
      array.push({
        ...item.data(),
        id: item.id,
      } as Meeting);
    });
    array.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    meetings.value = array;
  });
});

useAuthGuard(true);
</script>
