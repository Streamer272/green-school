<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="meetings" />

      <AdminContent>
        <Loading :property="meetings">
          <div
            :key="meeting.id"
            v-for="(meeting, index) in meetings"
            class="flex items-start justify-start flex-col w-[40vw] relative"
          >
            <p class="font-source font-semibold text-lg text-light">
              Date: {{ GSDate.pretty(meeting.date) }}
            </p>
            <MemberList prefix="Present: " :members="meeting.present" />

            <p
              v-html="processText(meeting.notes)"
              class="font-source text-lg text-light"
            />
            <FileList :files="meeting.files" />

            <div
              class="absolute top-2 right-2 flex items-center justify-center gap-x-2"
            >
              <NuxtLink
                :to="`/admin/meetings/edit/${meeting.id}`"
                class="flex-shrink-0"
              >
                <img src="/icons/open.svg" alt="Open" class="w-8 h-8" />
              </NuxtLink>

              <button
                @click="() => deleteMeeting(meeting.id)"
                class="flex-shrink-0"
              >
                <img src="/icons/delete.svg" alt="Delete" class="w-8 h-8" />
              </button>
            </div>

            <div
              v-if="index !== meetings?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </AdminContent>

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
import { type Meeting } from "~/composables/useFirestore";
import { doc } from "firebase/firestore";

const meetings = ref<Meeting[] | undefined>(undefined);

function deleteMeeting(meetingId: string) {
  if (!confirm("Are you sure you want to delete this meeting?")) return;

  meetings.value = undefined;
  deleteDoc(doc(collection(useFirestore(), "meetings"), meetingId))
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
      const dateA = GSDate.as(a.date);
      const dateB = GSDate.as(b.date);
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
