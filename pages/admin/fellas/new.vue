<template>
  <Background>
    <div class="w-full h-full flex items-start justify-start">
      <AdminSidebar current="fellas" />

      <AdminContent>
        <Loading :property="loading" :is-boolean="true" :fill="true">
          <form
            @submit="submit"
            class="w-full h-full flex items-center justify-center flex-col gap-y-2"
          >
            <div class="w-full flex items-center justify-center gap-x-4">
              <input
                v-model="name"
                placeholder="Name..."
                required
                class="rounded-full py-2 px-4 bg-light text-dark w-80"
              />

              <button
                type="submit"
                class="bg-light text-dark py-2 px-4 rounded-full"
              >
                Submit
              </button>
            </div>

            <div class="w-full flex items-center justify-center gap-x-4">
              <input
                v-model="role"
                placeholder="Role..."
                class="rounded-full py-2 px-4 bg-light text-dark w-80"
              />

              <input
                v-model="contact"
                placeholder="Contact"
                class="rounded-full py-2 px-4 bg-light text-dark w-80"
              />
            </div>

            <div class="w-full flex items-center justify-center gap-x-4">
              <input
                v-model="picture"
                placeholder="Picture..."
                class="rounded-full py-2 px-4 bg-light text-dark w-80"
              />

              <input
                v-model="priority"
                type="number"
                placeholder="Priority..."
                class="rounded-full py-2 px-4 bg-light text-dark w-40"
              />
            </div>

            <TextEditor />
          </form>
        </Loading>
      </AdminContent>
    </div>
  </Background>
</template>

<script lang="ts" setup>
import { addDoc, collection } from "@firebase/firestore";

const name = ref("");
const role = ref("");
const contact = ref("");
const priority = ref(0);
const picture = ref("");
const lore = useTextEditor();
const loading = ref(false);

function submit(event: Event) {
  event.preventDefault();
  loading.value = true;

  addDoc(collection(useFirestore(), "fellas"), {
    name: name.value,
    role: role.value || undefined,
    contact: contact.value || undefined,
    priority: priority.value || undefined,
    picture: picture.value,
    lore: lore.value,
  })
    .then(() => {
      navigateTo("/admin/fellas");
    })
    .catch((err) => {
      loading.value = false;
      alert(err);
    });
}

useAuthGuard(true);
</script>
