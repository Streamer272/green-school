<template>
  <Background>
    <div
      class="flex flex-col justify-start items-center w-screen min-h-screen overflow-hidden"
    >
      <TitleRouter route="blog" />
      <div class="w-full h-16" />

      <div class="flex justify-center items-start gap-x-4">
        <!-- column 1 -->
        <div class="flex items-center justify-start flex-col gap-y-2">
          <div
            v-for="article in getArticles(0)"
            class="rounded-3xl bg-hood text-light w-60 px-6 py-4"
          >
            <p class="text-lg text-white font-source font-semibold">
              {{ processText(article.title) }}
            </p>
            <p
              v-html="processText(article.content)"
              class="text-light font-source"
            />
          </div>
        </div>

        <!-- column 2 -->
        <div class="flex items-center justify-start flex-col gap-y-2">
          <div
            v-for="article in getArticles(1)"
            class="rounded-3xl bg-hood text-light w-60 px-6 py-4"
          >
            <p class="text-lg text-white font-source font-semibold">
              {{ processText(article.title) }}
            </p>
            <p
              v-html="processText(article.content)"
              class="text-light font-source"
            />
          </div>
        </div>

        <!-- column 3 -->
        <div class="flex items-center justify-start flex-col gap-y-2">
          <div
            v-for="article in getArticles(2)"
            class="rounded-3xl bg-hood text-light w-60 px-6 py-4"
          >
            <p class="text-lg text-white font-source font-semibold">
              {{ processText(article.title) }}
            </p>
            <p
              v-html="processText(article.content)"
              class="text-light font-source"
            />
          </div>
        </div>
      </div>
    </div>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
import { processText } from "~/composables/useText";

type Article = {
  date: string;
  title: string;
  content: string;
  author: string;
};

const articles: Article[] = [
  {
    date: "2021-10-30",
    title: "Introduction to TypeScript",
    content:
      "<em>Introduction to TypeScript</em><p>TypeScript is a typed-superset of JavaScript that compiles to clean JavaScript output.</p>",
    author: "John Doe",
  },
  {
    date: "2021-10-31",
    title: "Learning React",
    content:
      "<h1>Learning React</h1><p>React is a JavaScript library for building user interfaces.</p>",
    author: "Jane Doe",
  },
  {
    date: "2021-10-30",
    title: "Introduction to TypeScript",
    content:
      "<h1>Introduction to TypeScript</h1><p>TypeScript is a typed-superset of JavaScript that compiles to clean JavaScript output.</p>",
    author: "John Doe",
  },
  {
    date: "2021-10-31",
    title: "Learning React",
    content:
      "<h1>Learning React</h1><p>React is a JavaScript library for building user interfaces.</p>",
    author: "Jane Doe",
  },
  {
    date: "2021-11-01",
    title: "Understanding Angular",
    content:
      "<h1>Understanding Angular</h1><p>Angular is a platform for building mobile and desktop web applications.</p>",
    author: "Alice",
  },
  {
    date: "2021-11-08",
    title: "Exploring Vue.js",
    content:
      "<h1>Exploring Vue.js</h1><p>Vue.js is a progressive framework for building user interfaces.</p>",
    author: "Bob",
  },
  {
    date: "2021-11-09",
    title: "Getting Started with Node.js",
    content:
      "<h1>Getting Started with Node.js</h1><p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.</p>",
    author: "Charlie",
  },
];

function getArticles(offset: number, divisor: number = 3): Article[] {
  const array: Article[] = [];
  for (let i = 0; i < articles.length; i += divisor + offset) {
    array.push(articles[i]);
  }
  return array;
}
</script>
