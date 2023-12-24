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
        {{ member.name }} ({{ member.role || "[role]" }},
        {{ member.priority || "[priority]" }},
        {{ member.contact || "[contact]" }})
      </p>

      <button @click="() => removeMember(index)" class="ml-2">
        <img src="/icons/delete.svg" alt="Delete" class="w-6 h-6" />
      </button>

      <div v-if="index !== members.length - 1" class="bg-unim h-6 w-px mx-2" />
    </div>
  </div>

  <div class="w-full flex items-center justify-center gap-x-4">
    <input
      v-model="name"
      placeholder="Member name..."
      class="rounded-full py-2 px-4 bg-light text-dark w-80"
    />

    <input
      v-model="priority"
      type="number"
      placeholder="Member priority..."
      class="rounded-full py-2 px-4 bg-light text-dark w-40"
    />

    <button @click="addMember()" type="button">
      <img src="/icons/plus.svg" alt="Add" class="w-10 h-10" />
    </button>
  </div>

  <div class="w-full flex items-center justify-center gap-x-4">
    <input
      v-model="role"
      placeholder="Member role..."
      class="rounded-full py-2 px-4 bg-light text-dark w-80"
    />

    <input
      v-model="contact"
      placeholder="Member contact..."
      class="rounded-full py-2 px-4 bg-light text-dark w-80"
    />
  </div>
</template>

<script lang="ts" setup>
import { useMemberList } from "~/composables/useStates";

const members = useMemberList();
const name = ref("");
const role = ref("");
const contact = ref("");
const priority = ref(0);

function addMember() {
  members.value.push({
    name: name.value,
    role: role.value || undefined,
    contact: contact.value || undefined,
    priority: priority.value || undefined,
  });
  name.value = "";
  role.value = "";
  contact.value = "";
  priority.value = 0;
}

function removeMember(index: number) {
  members.value.splice(index, 1);
}
</script>
