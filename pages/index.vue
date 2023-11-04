<template>
  <Background>
    <div
      class="flex flex-col justify-center items-center w-screen min-h-screen overflow-hidden"
    >
      <section
        class="flex flex-col justify-start items-center w-screen h-screen"
      >
        <p class="text-2xl font-bold mt-9 text-white font-source">
          Welcome to the Green School!
        </p>
        <div class="w-full h-72" />

        <!-- theme row -->
        <div
          class="flex items-center justify-start w-full ml-72 pl-[0.6875rem]"
        >
          <div
            v-for="(theme, index) in themes"
            class="flex items-center justify-center w-[18.75rem]"
          >
            <button
              :data-current="index === currentTheme"
              @click="changeTheme(index)"
              class="flex items-center justify-center px-6 py-4 w-[17.5rem] rounded-[1.25rem] font-source font-bold text-[1.375rem] text-light text-left data-[current=true]:bg-hood data-[current=false]:bg-ghetto"
            >
              {{ theme.name }}
              <div class="flex-grow" />
              <img :src="theme.icon" alt="Theme icon" />
            </button>
          </div>
        </div>

        <!-- timeline -->
        <div
          class="w-full h-1 ml-72 mt-8 bg-gray rounded-full relative timeline"
        >
          <div class="ball big">
            <p class="year">2017</p>
          </div>
          <div class="ball small" />
          <div class="ball big">
            <p class="year">2019</p>
          </div>
          <div class="ball small" />
          <div class="ball big">
            <p class="year">2021</p>
          </div>
          <div class="ball small" />
          <div class="ball big">
            <p class="year">2023</p>
          </div>
        </div>

        <!-- theme description -->
        <div
          :data-selected="currentTheme !== -1 && !due"
          class="flex ml-48 mt-28 data-[selected=false]:opacity-0 data-[selected=true]:opacity-100 transition-all"
        >
          <div class="basis-[50%]">
            <p class="font-source font-semibold text-3xl text-caucasian">
              {{ getValue("name") }}
            </p>
            <p class="font-source font-semibold text-lg text-disc">
              Current goal
            </p>

            <p class="font-source font-semibold text-lg text-unim mt-6">
              {{ getValue("description") }}
            </p>
          </div>

          <!-- files -->
          <div
            class="flex items-center justify-center flex-col gap-y-1 basis-[50%]"
          >
            <div class="flex items-center justify-center w-56">
              <p class="font-source font-bold text-lg text-light">EAP &nbsp;</p>
              <p class="font-source font-bold text-lg text-disc">(PDF)</p>
              <div class="flex-grow" />
              <img src="/icons/download.png" alt="Download" />
            </div>
            <div class="flex items-center justify-center w-56">
              <p class="font-source font-bold text-lg text-light">
                Report &nbsp;
              </p>
              <p class="font-source font-bold text-lg text-disc">(PDF)</p>
              <div class="flex-grow" />
              <img src="/icons/download.png" alt="Download" />
            </div>
            <div class="flex items-center justify-center w-56">
              <p class="font-source font-bold text-lg text-light">
                Members &nbsp;
              </p>
              <p class="font-source font-bold text-lg text-disc">(PDF)</p>
              <div class="flex-grow" />
              <img src="/icons/download.png" alt="Download" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <Sidebar />
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
        left: calc(9.375rem * ($i - 1));
      }
    }
  }
}
</style>

<script lang="ts" setup>
const currentTheme = ref(-1);
const due = ref(false);
const themes = [
  {
    name: "Energy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus id tellus nec condimentum. Ut sed dolor vitae lorem tempor viverra. Mauris lobortis tempus risus ac tincidunt. Nam lacinia aliquet purus dictum condimentum. Phasellus velit enim, facilisis at sagittis quis, tincidunt eu nibh.",
    icon: "/icons/zap.png",
  },
  {
    name: "Waste",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus id tellus nec condimentum. Ut sed dolor vitae lorem tempor viverra. Mauris lobortis tempus risus ac tincidunt. Nam lacinia aliquet purus dictum condimentum. Phasellus velit enim, facilisis at sagittis quis, tincidunt eu nibh.",
    icon: "/icons/trash.png",
  },
  {
    name: "Commute",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus id tellus nec condimentum. Ut sed dolor vitae lorem tempor viverra. Mauris lobortis tempus risus ac tincidunt. Nam lacinia aliquet purus dictum condimentum. Phasellus velit enim, facilisis at sagittis quis, tincidunt eu nibh.",
    icon: "/icons/bike.png",
  },
];

function changeTheme(index: number) {
  if (
    currentTheme.value === -1 || // at the beginning we don't want to wait 250ms before animation
    (currentTheme.value !== -1 && index !== -1 && currentTheme.value !== index) // when changing from a to b we don't want to wait 250ms before animation
  ) {
    currentTheme.value = index;
    return;
  }

  due.value = true;
  setTimeout(() => {
    if (currentTheme.value === index) currentTheme.value = -1;
    else currentTheme.value = index;

    due.value = false;
  }, 250);
}

function getValue(value: "name" | "description"): string {
  if (currentTheme.value === -1) return "";
  return themes[currentTheme.value][value];
}
</script>
