<template>
  <div
    v-if="members.length > 0"
    class="w-full flex items-center justify-center gap-x-1"
  >
    <div
      v-for="(member, index) in members"
      class="flex items-center justify-center"
    >
      <p class="font-source font-semibold text-lg text-light">
        {{ member }}
      </p>

      <button @click="() => removeMember(index)" class="ml-2">
        <img src="/icons/delete.svg" alt="Delete" class="w-6 h-6" />
      </button>

      <div v-if="index !== members.length - 1" class="bg-unim h-6 w-px mx-2" />
    </div>
  </div>

  <div class="w-full flex items-center justify-center gap-x-4">
    <input
      v-model="member"
      placeholder="Member..."
      class="rounded-full p-2 px-4 bg-light text-dark w-80"
    />

    <button @click="addMember()" type="button">
      <img src="/icons/plus.svg" alt="Add" class="w-10 h-10" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useMemberList } from "~/composables/useStates";

const members = useMemberList();
const member = ref("");

function addMember() {
  members.value.push(member.value);
  member.value = "";
}

function removeMember(index: number) {
  members.value.splice(index, 1);
}
</script>
