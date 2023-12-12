<template>
  <Background>
    <div
      class="flex flex-col justify-center items-center w-screen min-h-screen overflow-hidden"
    >
      <div class="flex flex-col justify-start items-center w-screen h-screen">
        <TitleRouter route="home" />
        <div class="w-full h-48" />

        <!-- theme row -->
        <Loading :property="themes">
          <div
            class="flex items-center justify-start w-full ml-72 pl-[0.6875rem]"
          >
            <div
              v-for="(theme, index) in themes"
              :class="`flex items-center justify-center ${getThemeWidthClass(
                theme,
              )}`"
            >
              <button
                :data-current="index === currentTheme"
                @click="changeTheme(index)"
                class="flex items-center justify-center mx-2 px-6 py-4 w-full rounded-2xl font-source font-bold text-[1.375rem] text-light text-left data-[current=true]:bg-hood data-[current=false]:bg-ghetto"
              >
                {{ theme.name }}
                <div class="flex-grow" />
                <img :src="theme.icon" alt="Theme icon" />
              </button>
            </div>
          </div>

          <!-- timeline -->
          <div class="ml-72 mt-8 w-full relative">
            <div
              class="h-1 bg-gray rounded-full relative timeline"
              :style="`width: ${
                (getStartAndEndYears()[1] - getStartAndEndYears()[0]) * 10
              }rem`"
            >
              <div
                v-for="year in getYears()"
                :class="`ball ${year.big ? 'big' : 'small'}`"
              >
                <p v-if="year.big" class="year">{{ year.year }}</p>
              </div>
            </div>

            <div
              class="w-full border-gray border-t-4 border-dashed rounded-full h-0 ml-[1.3rem] absolute top-0 future-timeline"
              :style="`left: ${
                (getStartAndEndYears()[1] - getStartAndEndYears()[0]) * 10
              }rem`"
            />
          </div>

          <!-- theme description -->
          <div
            :data-selected="currentTheme !== -1 && !animationDueChange"
            class="flex w-[80vw] mt-28 data-[selected=false]:opacity-0 data-[selected=true]:opacity-100 transition-all"
          >
            <div class="basis-[50%]">
              <p class="font-source font-semibold text-3xl text-caucasian">
                {{ getValue("name") }}
              </p>
              <p
                v-if="isCurrentlyHappening()"
                class="font-source font-semibold text-lg text-disc"
              >
                Current goal
              </p>

              <p
                v-html="getValue('description')"
                class="font-source font-semibold text-lg text-unim mt-6"
              />
            </div>

            <!-- files -->
            <div
              class="flex items-center justify-center flex-col gap-y-1 basis-[50%]"
            >
              <div class="flex items-center justify-center w-56">
                <p class="font-source font-bold text-lg text-light">
                  EAP &nbsp;
                </p>
                <p class="font-source font-bold text-lg text-disc">(PDF)</p>
                <div class="flex-grow" />
                <img src="/icons/download.svg" alt="Download" />
              </div>
              <div class="flex items-center justify-center w-56">
                <p class="font-source font-bold text-lg text-light">
                  Report &nbsp;
                </p>
                <p class="font-source font-bold text-lg text-disc">(PDF)</p>
                <div class="flex-grow" />
                <img src="/icons/download.svg" alt="Download" />
              </div>
              <div class="flex items-center justify-center w-56">
                <p class="font-source font-bold text-lg text-light">
                  Members &nbsp;
                </p>
                <p class="font-source font-bold text-lg text-disc">(PDF)</p>
                <div class="flex-grow" />
                <img src="/icons/download.svg" alt="Download" />
              </div>
            </div>
          </div>
        </Loading>
      </div>
    </div>

    <Projects />
    <Info />
  </Background>
</template>

<style lang="scss" scoped>
.sector {
  @apply flex justify-center items-center w-[20rem] h-40 rounded-2xl transition-all duration-300;
  background-color: rgb(148, 201, 59, 0.25);

  &:hover {
    background-color: rgb(148, 201, 59, 0.5);
  }
}

@for $i from 1 through 3 {
  .length-#{$i} {
    width: calc(#{$i} * 10rem);
  }
}

.timeline {
  .ball {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    left: 0;
    margin-top: 0.15rem;

    &.big {
      width: 1.375rem;
      height: 1.375rem;
      background-color: #b3b3b3;
      border-radius: 100%;

      .year {
        @apply font-source font-semibold text-light absolute top-9 left-0 text-xl;
        transform: translateX(-20%);
      }
    }

    &.small {
      width: 1rem;
      height: 1rem;
      background-color: #909090;
      border-radius: 100%;
    }

    @for $i from 1 through 10 {
      &:nth-of-type(#{$i}) {
        left: calc(10rem * ($i - 1));
      }
    }
  }

  .future-timeline {
  }
}
</style>

<script lang="ts" setup>
import { collection, getDocs } from "@firebase/firestore";
import { useFirestore } from "~/composables/useFirebase";

const animationDueChange = ref(false);
const currentTheme = ref(-1);
const themes = useState<Theme[] | undefined>("themes", () => undefined);
const currentYear = new Date().getFullYear();

interface Year {
  year: number;
  big: boolean;
}

function changeTheme(index: number) {
  if (
    currentTheme.value === -1 || // at the beginning we don't want to wait 250ms before animation
    (currentTheme.value !== -1 && index !== -1 && currentTheme.value !== index) // when changing from a to b we don't want to wait 250ms before animation
  ) {
    currentTheme.value = index;
    return;
  }

  animationDueChange.value = true;
  setTimeout(() => {
    if (currentTheme.value === index) currentTheme.value = -1;
    else currentTheme.value = index;

    animationDueChange.value = false;
  }, 250);
}

function getValue(value: "name" | "description"): string {
  if (currentTheme.value === -1 || themes.value === undefined) return "";
  return themes.value[currentTheme.value][value];
}

function isCurrentlyHappening(): boolean {
  if (currentTheme.value === -1 || themes.value === undefined) return false;
  const start = themes.value[currentTheme.value].start;
  const end = themes.value[currentTheme.value].end;
  return start <= currentYear && currentYear <= end;
}

function getStartAndEndYears(): [number, number] {
  if (!themes.value) return [0, 0];

  let start = 9999;
  let end = 0;
  for (const theme of themes.value) {
    if (theme.start < start) start = theme.start;
    if (theme.end > end) end = theme.end;
  }

  return [start, end];
}

function getYears(): Year[] {
  if (!themes.value) return [];

  const [start, end] = getStartAndEndYears();

  const array: Year[] = [];
  for (let i = start; i <= end; i++) {
    let big = false;
    for (const theme of themes.value) {
      if (theme.start === i) big = true;
      else if (theme.end === i) big = true;
    }

    array.push({
      year: i,
      big: big,
    });
  }

  return array;
}

function getThemeWidthClass(theme: Theme): string {
  return `length-${theme.end - theme.start}`;
}

onMounted(() => {
  getDocs(collection(useFirestore(), "themes")).then((snapshot) => {
    const array: Theme[] = [];
    snapshot.forEach((item) => {
      array.push(item.data() as Theme);
    });
    array.sort((a, b) => a.start - b.start);
    themes.value = array;
  });
});
</script>
