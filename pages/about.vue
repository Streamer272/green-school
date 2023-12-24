<template>
  <Background>
    <main
      class="flex flex-col justify-start items-center w-screen min-h-screen overflow-auto"
    >
      <TitleRouter route="about" />
      <div class="w-full h-4" />

      <!-- about -->
      <div
        class="flex items-start justify-start flex-col mx-72 w-[50vw] gap-y-4"
      >
        <p
          class="font-source font-bold text-light text-3xl w-full text-center mb-4"
        >
          Meet the Green School
        </p>

        <!-- row wrapper -->
        <div
          v-for="(member, index) in members"
          :data-odd="index % 2 === 1"
          class="flex items-center justify-start w-full data-[odd=true]:flex-row-reverse"
        >
          <div
            :data-odd="index % 2 === 1"
            class="flex items-start justify-center w-[25vw] gap-x-4 data-[odd=true]:flex-row-reverse"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/1200px-Outdoors-man-portrait_%28cropped%29.jpg"
              alt="Man"
              class="h-80"
            />

            <div class="flex items-start justify-start flex-col">
              <p class="font-source font-bold text-xl text-light">
                {{ member.name }}
              </p>

              <p class="font-source font-semibold text-unim">
                {{ member.lore }}
              </p>
            </div>
          </div>
        </div>

        <div class="h-36" />
      </div>
    </main>

    <Info />
  </Background>
</template>

<script lang="ts" setup>
const members = [
  {
    name: "Daniel Svitan",
    lore: "Daniel is a software engineer with a passion for education. He is co-founder of the Green School and is responsible for the technical development of the project.",
  },
  {
    name: "Janko Ivicic",
    lore: "Janko is a computer scientist with a focus on artificial intelligence. He is co-founder of the Green School and is responsible for the research and development of the project.",
  },
  {
    name: "Veronika Onderikova",
    lore: "Veronika is a product designer with a passion for sustainability. She is co-founder of the Green School and is responsible for the user experience and design of the project.",
  },
  {
    name: "Richard Sepsi",
    lore: "Richard is a business developer with a passion for education. He is co-founder of the Green School and is responsible for the business development and marketing of the project.",
  },
  {
    name: "John Doe",
    lore: "John is a student with a passion for learning. He is a member of the Green School and is helping to develop the project.",
  },
];
</script>
