<template>
  <div class="flex flex-col justify-center items-center w-screen min-h-screen">
    <section class="flex flex-col justify-center items-center w-screen h-screen custom-bg-green">
      <p class="text-2xl font-bold">Welcome to the Green School!</p>
      <div class="flex flex-wrap mt-12 w-[41rem] gap-4">
        <div class="custom-sector">Sector 1</div>
        <div class="custom-sector">Sector 2</div>
        <div class="custom-sector">Sector 3</div>
        <div class="custom-sector">Sector 4</div>
      </div>
    </section>

    <p>Hello World!</p>
  </div>
</template>

<style lang="scss" scoped>
.custom-bg-green {
  background-image: url(/images/green.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.custom-sector {
  @apply flex justify-center items-center w-[20rem] h-40 rounded-2xl transition-all duration-300;
  background-color: rgba(148, 201, 59, 0.25);

  &:hover {
    background-color: rgba(148, 201, 59, 0.5);
  }
}
</style>
