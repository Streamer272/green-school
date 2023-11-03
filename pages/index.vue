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
          <div class="flex items-center justify-center w-[18.75rem]">
            <div class="bg-ghetto px-6 py-4 w-[17.5rem] rounded-[1.25rem]">
              <p class="font-source font-bold text-[1.375rem] text-light">
                Energy
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center w-[18.75rem]">
            <div class="bg-ghetto px-6 py-4 w-[17.5rem] rounded-[1.25rem]">
              <p class="font-source font-bold text-[1.375rem] text-light">
                Waste
              </p>
            </div>
          </div>
          <div class="flex items-center justify-center w-[18.75rem]">
            <div class="bg-ghetto px-6 py-4 w-[17.5rem] rounded-[1.25rem]">
              <p class="font-source font-bold text-[1.375rem] text-light">
                Commute
              </p>
            </div>
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
