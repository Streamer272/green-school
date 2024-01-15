<template>
  <div class="custom-background-layer custom-layer-image">
    <div class="custom-background-layer custom-layer-one">
      <div class="custom-background-layer custom-layer-two">
        <div class="custom-background-layer custom-layer-three" />
      </div>
    </div>
  </div>

  <div
    class="flex justify-start items-center flex-col w-screen min-h-screen overflow-y-auto overflow-x-visible"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.custom-background-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
}

.custom-layer-image {
  background-image: url(/images/background.png);
  background-repeat: no-repeat;
  background-size: cover;
}

.custom-layer-one {
  background-color: rgb(22, 22, 22, 0.65);
}

.custom-layer-two {
  background-color: rgb(25, 25, 25, 0.15);
}

.custom-layer-three {
  background: linear-gradient(rgb(16, 16, 16, 0.6), rgb(16, 16, 16, 0.25));
}
</style>
