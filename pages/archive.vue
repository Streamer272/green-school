<template>
  <Background>
    <TitleRouter route="archive" />
    <div class="w-full h-4" />

    <div class="w-[60vw] flex items-start justify-start flex-col gap-y-2">
      <form @submit="search" class="flex items-center justify-start gap-x-1">
        <input
          v-model="query"
          placeholder="Query..."
          class="rounded-l-full py-2 px-4 bg-dark text-light focus:outline-none border border-unim border-solid"
        />

        <button
          type="submit"
          class="rounded-r-full py-2 px-4 bg-dark text-light border border-unim border-solid"
        >
          Search
        </button>
      </form>

      <div class="flex items-center justify-start gap-x-4">
        <button
          @click="toggleAll"
          class="font-source font-semibold text-light text-lg bg-none p-0 m-0"
        >
          Search for
        </button>

        <div class="flex items-center justify-start gap-x-1">
          <input
            v-model="searchFellas"
            type="checkbox"
            name="search-fellas"
            id="search-fellas"
            class="bg-dark accent-gray"
          />
          <label
            for="search-fellas"
            class="font-source font-semibold text-lg text-light"
          >
            Fellas
          </label>
        </div>

        <div class="flex items-center justify-start gap-x-1">
          <input
            v-model="searchMeetings"
            type="checkbox"
            name="search-meetings"
            id="search-meetings"
            class="bg-dark accent-gray"
          />
          <label
            for="search-meetings"
            class="font-source font-semibold text-lg text-light"
          >
            Meetings
          </label>
        </div>

        <div class="flex items-center justify-start gap-x-1">
          <input
            v-model="searchPosts"
            type="checkbox"
            name="search-posts"
            id="search-posts"
            class="bg-dark accent-gray"
          />
          <label
            for="search-posts"
            class="font-source font-semibold text-lg text-light"
          >
            Posts
          </label>
        </div>

        <div class="flex items-center justify-start gap-x-1">
          <input
            v-model="searchProjects"
            type="checkbox"
            name="search-projects"
            id="search-projects"
            class="bg-dark accent-gray"
          />
          <label
            for="search-projects"
            class="font-source font-semibold text-lg text-light"
          >
            Projects
          </label>
        </div>

        <div class="flex items-center justify-start gap-x-1">
          <input
            v-model="searchThemes"
            type="checkbox"
            name="search-themes"
            id="search-themes"
            class="bg-dark accent-gray"
          />
          <label
            for="search-themes"
            class="font-source font-semibold text-lg text-light"
          >
            Themes
          </label>
        </div>
      </div>

      <div v-for="item in found" class="relative bg-dark p-4 rounded-2xl">
        <div v-if="item.type === 'post'" class="absolute top-2 right-2">
          <NuxtLink :to="`/blog/${item.id}`">
            <img src="/icons/open.svg" alt="Open" />
          </NuxtLink>
        </div>

        <div v-if="item.type === 'fella'">
          <img :src="item?.picture" alt="Picture" class="w-32 rounded-xl" />

          <div class="flex items-start justify-start flex-col">
            <p class="font-source font-semibold text-lg text-light">
              {{ item.name }} ({{ item?.role || "[role]" }},
              {{ item?.priority || "[priority]" }})
            </p>
            <p class="font-source font-semibold text-lg text-light">
              {{ item?.contact || "[contact]" }}
            </p>

            <p
              v-html="processText(item?.lore)"
              class="font-source text-lg text-unim"
            />
          </div>
        </div>

        <div v-else-if="item.type === 'meeting'">
          <p class="font-source font-semibold text-lg text-light">
            Date: {{ GSDate.pretty(item.date) }}
          </p>
          <MemberList prefix="Present: " :members="item.present" />

          <p
            v-html="processText(item.notes)"
            class="font-source text-lg text-light"
          />
          <FileList :files="item.files" />
        </div>

        <div v-else-if="item.type === 'post'">
          <img
            v-if="item.image"
            :src="item.image"
            alt="Image"
            class="w-32 rounded-xl"
          />
          <p
            v-else
            class="text-light font-source font-semibold text-lg w-32 h-full"
          >
            No image
          </p>

          <div class="flex items-start justify-start flex-col">
            <p class="font-source font-bold text-xl text-light">
              {{ item.title }}
            </p>
            <MemberList :members="item.authors" size="lg" />
            <p class="font-source font-semibold text-lg text-light">
              {{ GSDate.pretty(item.date) }} ({{ item.status }})
            </p>

            <p
              v-html="processText(item.content)"
              class="font-source text-lg text-light"
            />
          </div>
        </div>

        <div v-else-if="item.type === 'project'">
          <p class="font-source font-bold text-xl text-light">
            {{ item.name }} ({{ GSDate.pretty(item.start) }} -
            {{ GSDate.prettyish(item.end, "?") }})
          </p>

          <p
            v-html="processText(item.description)"
            class="font-source text-lg text-light"
          />

          <MemberList :members="item.members" />
          <FileList :files="item.files" />
        </div>

        <div v-else-if="item.type === 'theme'">
          <div class="flex items-center justify-center">
            <p class="font-source font-bold text-xl text-light">
              {{ item.name }}
            </p>
            <img :src="item.icon" alt="Theme icon" class="ml-2" />
            <p class="font-source font-semibold text-lg text-light ml-2">
              ({{ item.start }} - {{ item.end }})
            </p>
          </div>

          <FileList :files="item.files" />
          <MemberList :members="item.members" />

          <p v-html="item.description" class="font-source text-lg text-light" />
        </div>
      </div>
    </div>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import {
  collection,
  type DocumentData,
  getDocs,
  QuerySnapshot,
} from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import type { Fella, Meeting, Post, Project } from "~/composables/useFirestore";
import type { Theme } from "tinymce";
import Fuse from "fuse.js";
import type { Archived } from "~/composables/useGSTypes";

// TODO: add highlighting queried text

const query = ref("");
const searchFellas = ref(false);
const searchMeetings = ref(false);
const searchPosts = ref(false);
const searchProjects = ref(false);
const searchThemes = ref(false);
const found = ref<AllArray>([]);

type AllArray =
  | Archived<Fella>[]
  | Archived<Meeting>[]
  | Archived<Post>[]
  | Archived<Project>[]
  | Archived<Theme>[];

function toggleAll() {
  searchFellas.value = !searchFellas.value;
  searchMeetings.value = !searchMeetings.value;
  searchPosts.value = !searchPosts.value;
  searchProjects.value = !searchProjects.value;
  searchThemes.value = !searchThemes.value;
}

function transformRaw(raw: QuerySnapshot | undefined): DocumentData[] {
  return (
    raw?.docs
      .filter((it) => !!it.data())
      .map((it) => ({ ...it.data(), id: it.id })) ?? []
  );
}

async function fetch(when: boolean, path: string) {
  return when ? await getDocs(collection(useFirestore(), path)) : undefined;
}

function mapFound<T>(array: Array<DocumentData>, type: string) {
  return array.map(
    (it) =>
      ({
        ...it,
        type: type,
      }) as T,
  );
}

async function search(event: Event) {
  event.preventDefault();

  const fellasRaw = await fetch(searchFellas.value, "fellas");
  const meetingsRaw = await fetch(searchMeetings.value, "meetings");
  // TODO: add query
  const postsRaw = await fetch(searchPosts.value, "posts");
  const projectsRaw = await fetch(searchProjects.value, "projects");
  const themesRaw = await fetch(searchThemes.value, "themes");

  const fellas = transformRaw(fellasRaw);
  const meetings = transformRaw(meetingsRaw);
  const posts = transformRaw(postsRaw);
  const projects = transformRaw(projectsRaw);
  const themes = transformRaw(themesRaw);

  const foundFellas = new Fuse(fellas, {
    keys: ["name", "role", "contact", "lore"],
  })
    .search(query.value)
    .map((it) => it.item);
  const foundMeetings = new Fuse(meetings, {
    keys: [
      "id",
      "date",
      "present.name",
      "present.role",
      "present.contact",
      "notes",
      "files.name",
      "files.type",
    ],
  })
    .search(query.value)
    .map((it) => it.item);
  const foundPosts = new Fuse(posts, {
    keys: [
      "id",
      "title",
      "content",
      "date",
      "authors.name",
      "authors.role",
      "authors.contact",
    ],
  })
    .search(query.value)
    .map((it) => it.item);
  const foundProjects = new Fuse(projects, {
    keys: [
      "id",
      "name",
      "description",
      "start",
      "end",
      "files.name",
      "files.type",
      "members.name",
      "members.role",
      "members.contact",
    ],
  })
    .search(query.value)
    .map((it) => it.item);
  const foundThemes = new Fuse(themes, {
    keys: [
      "id",
      "name",
      "description",
      "start",
      "end",
      "files.name",
      "files.type",
      "members.name",
      "members.role",
      "members.contact",
    ],
  })
    .search(query.value)
    .map((it) => it.item);

  found.value = [
    ...mapFound<Archived<Fella>>(foundFellas, "fella"),
    ...mapFound<Archived<Meeting>>(foundMeetings, "meeting"),
    ...mapFound<Archived<Post>>(foundPosts, "post"),
    ...mapFound<Archived<Project>>(foundProjects, "project"),
    ...mapFound<Archived<Theme>>(foundThemes, "theme"),
  ];
}
</script>
