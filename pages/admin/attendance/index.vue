<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="attendance" />

      <!-- content -->
      <div
        class="w-full h-full flex items-center justify-center flex-col overflow-auto"
      >
        <Loading :property="attendance">
          <div
            v-for="(record, index) in attendance"
            class="flex items-start justify-start flex-col w-[40vw]"
          >
            <p class="font-source font-semibold text-lg text-light">
              Date: {{ record.date }}
            </p>
            <p class="font-source font-semibold text-lg text-light">
              Present: {{ record.present }}
            </p>
            <p v-html="record.notes" class="font-source text-lg text-light" />

            <div
              v-if="index !== attendance?.length - 1"
              class="bg-unim h-px w-full my-2"
            />
          </div>
        </Loading>
      </div>

      <a
        href="/admin/attendance/new"
        class="font-source font-semibold text-xl text-light"
      >
        <img
          src="/icons/plus.svg"
          alt="Add"
          class="w-12 h-12 fixed bottom-4 right-4"
        />
      </a>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { collection, getDocs } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";

const attendance = ref<AttendanceRecord[] | undefined>(undefined);

interface AttendanceRecord {
  date: string;
  present: string;
  notes: string;
}

onMounted(() => {
  getDocs(collection(useFirestore(), "attendance")).then((snapshot) => {
    const array: AttendanceRecord[] = [];
    snapshot.forEach((item) => {
      array.push(item.data() as AttendanceRecord);
    });
    array.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
    attendance.value = array;
  });
});

useAuthGuard(true);
</script>
