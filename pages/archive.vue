<template>
  <Background>
    <TitleRouter route="archive" />
    <div class="w-full h-4" />

    <div class="w-[60vw] flex items-start justify-start flex-col gap-y-2 mb-8">
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

        <p v-if="found" class="ml-2 font-source font-semibold text-unim">
          Found {{ found.length }}
          {{ found.length === 1 ? "match" : "matches" }}
        </p>
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
              <span v-html="highlight(item.name)" /> (<span
                v-html="highlightOr(item.role, '[role]')"
              />, {{ item?.priority || "[priority]" }})
            </p>
            <p
              v-html="highlightOr(item?.contact, '[contact]')"
              class="font-source font-semibold text-lg text-light"
            />

            <Text
              v-if="item?.lore"
              :text="highlightOr(item?.lore, '')"
              styles="small-description"
            />
          </div>
        </div>

        <div v-else-if="item.type === 'meeting'">
          <p class="font-source font-semibold text-lg text-light">
            Date: {{ GSDate.pretty(item.date) }}
          </p>
          <MemberList
            prefix="Present: "
            :members="highlightMembers(item.present)"
          />

          <Text :text="highlight(item.notes)" styles="text" />
          <FileList :files="highlightFiles(item.files)" />
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
              <span v-html="highlight(item.title)" />
            </p>
            <MemberList :members="highlightMembers(item.authors)" size="lg" />
            <p class="font-source font-semibold text-lg text-light">
              {{ GSDate.pretty(item.date) }} ({{ item.status }})
            </p>

            <Text
              :text="highlight(item.content)"
              styles="text"
              can-toggle
              trim
              :max="512"
            />
          </div>
        </div>

        <div v-else-if="item.type === 'project'">
          <p class="font-source font-bold text-xl text-light">
            <span v-html="highlight(item.name)" /> (<span
              v-html="GSDate.pretty(item.start)"
            />
            - <span v-html="GSDate.prettyish(item.end, '?')" />)
          </p>

          <Text :text="highlight(item.description)" styles="text" />

          <MemberList :members="highlightMembers(item.members)" />
          <FileList :files="highlightFiles(item.files)" />
        </div>

        <div v-else-if="item.type === 'theme'">
          <div class="flex items-center justify-center">
            <p
              v-html="highlight(item.name)"
              class="font-source font-bold text-xl text-light"
            />
            <img :src="item.icon" alt="Theme icon" class="ml-2" />
            <p class="font-source font-semibold text-lg text-light ml-2">
              (<span v-html="highlight(item.start)" /> -
              <span v-html="highlight(item.end)" />)
            </p>
          </div>

          <FileList :files="highlightFiles(item.files)" />
          <MemberList :members="highlightMembers(item.members)" />

          <p
            v-html="highlight(item.description)"
            class="font-source text-lg text-light"
          />
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
  where,
} from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";
import type { Fella, Meeting, Post, Project } from "~/composables/useFirestore";
import type { Theme } from "tinymce";
import Fuse, { type FuseResult, type IFuseOptions } from "fuse.js";
import type { Archived, GSFile, GSMember } from "~/composables/useGSTypes";
import { query as firequery } from "@firebase/firestore";

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

const options: IFuseOptions<any> = {
  includeMatches: true,
  findAllMatches: true,
  threshold: 0.2,
  ignoreLocation: true,
};

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

function mapFound<T>(array: FuseResult<DocumentData>[], type: string) {
  const processed = array.map((it) => it.item);
  return processed.map(
    (it) =>
      ({
        ...it,
        type: type,
      }) as T,
  );
}

function highlight(text: string | number): string {
  if (typeof text === "number") text = text.toString();

  const regexp = new RegExp(query.value, "ig");
  let highlighted = text;
  let offset = 0;

  let matches = [];
  for (const match of text.matchAll(regexp)) {
    matches.push(match);
  }

  for (const match of matches) {
    const found = match["0"];
    const changed = `<mark>${found}</mark>`;

    if (match.index === undefined) continue;
    highlighted =
      highlighted.slice(0, match.index + offset) +
      changed +
      highlighted.slice(match.index + offset + found.length);

    offset += changed.length - found.length;
  }

  return highlighted;
}

function highlightOr(text: string | undefined, or: string): string {
  if (typeof text !== "undefined") return highlight(text);
  return or;
}

function highlightIf(text: string | undefined): string | undefined {
  if (typeof text !== "undefined") return highlight(text);
  return undefined;
}

function highlightMembers(array: GSMember[]): GSMember[] {
  return array.map((member) => {
    return {
      name: highlight(member.name),
      role: highlightIf(member.role),
      contact: highlightIf(member.contact),
      priority: member.priority,
    };
  });
}

function highlightFiles(array: GSFile[]): GSFile[] {
  return array.map((file) => {
    return {
      name: highlight(file.name),
      type: highlight(file.type),
      link: file.link,
      priority: file.priority,
      date: file.date,
    };
  });
}

async function search(event: Event) {
  event.preventDefault();

  const fellasRaw = await fetch(searchFellas.value, "fellas");
  const meetingsRaw = await fetch(searchMeetings.value, "meetings");
  const postsRaw = searchPosts.value
    ? await getDocs(
        firequery(
          collection(useFirestore(), "posts"),
          where("status", "==", "public"),
        ),
      )
    : undefined;
  const projectsRaw = await fetch(searchProjects.value, "projects");
  const themesRaw = await fetch(searchThemes.value, "themes");

  const fellas = transformRaw(fellasRaw);
  const meetings = transformRaw(meetingsRaw);
  const posts = transformRaw(postsRaw);
  const projects = transformRaw(projectsRaw);
  const themes = transformRaw(themesRaw);

  const foundFellas = new Fuse(fellas, {
    ...options,
    keys: ["name", "role", "contact", "lore"],
  }).search(query.value);

  const foundMeetings = new Fuse(meetings, {
    ...options,
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
  }).search(query.value);

  const foundPosts = new Fuse(posts, {
    ...options,
    keys: [
      "id",
      "title",
      "content",
      "date",
      "authors.name",
      "authors.role",
      "authors.contact",
    ],
  }).search(query.value);

  const foundProjects = new Fuse(projects, {
    ...options,
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
  }).search(query.value);

  const foundThemes = new Fuse(themes, {
    ...options,
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
  }).search(query.value);

  found.value = [
    ...mapFound<Archived<Fella>>(foundFellas, "fella"),
    ...mapFound<Archived<Meeting>>(foundMeetings, "meeting"),
    ...mapFound<Archived<Post>>(foundPosts, "post"),
    ...mapFound<Archived<Project>>(foundProjects, "project"),
    ...mapFound<Archived<Theme>>(foundThemes, "theme"),
  ];
}
</script>
