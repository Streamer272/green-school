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
            <div
              v-if="meeting.files.length > 0"
              class="w-full flex items-center justify-start gap-x-1 mt-2"
            >
              <div
                v-for="(file, index) in meeting.files"
                class="flex items-center justify-center"
              >
                <p class="font-source font-semibold text-lg text-light">
                  {{ file.name }} ({{ file.type }})
                </p>

                <NuxtLink :to="file.link" class="ml-2">
                  <img src="/icons/open.svg" alt="Open" />
                </NuxtLink>

                <div
                  v-if="index !== meeting.files.length - 1"
                  class="bg-unim h-6 w-px mx-2"
                />
              </div>
            </div>

            <div
              class="absolute top-2 right-2 flex items-center justify-center gap-x-2"
            >
              <NuxtLink
                :to="`/admin/meetings/edit/${meeting.id}`"
                class="flex-shrink-0"
              >
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </NuxtLink>

              <button @click="() => deleteMeeting(index)" class="flex-shrink-0">
                <img src="/icons/delete.svg" alt="Delete" class="w-8 h-8" />
              </button>
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
import { collection, deleteDoc, getDocs } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import type { Meeting } from "~/composables/useFirestore";
import { doc } from "firebase/firestore";

const meetings = ref<Meeting[] | undefined>(undefined);

function deleteMeeting(index: number) {
  const meeting = meetings.value![index];
  if (!confirm("Are you sure you want to delete this meeting?")) return;

  meetings.value = undefined;
  deleteDoc(doc(collection(useFirestore(), "meetings"), meeting.id))
    .then(fetch)
    .catch(alert);
}

function fetch() {
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
}

onMounted(() => {
  fetch();
});

useAuthGuard(true);
</script>
