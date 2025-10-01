<template>
  <van-action-bar style="position: relative">
    <van-action-bar-icon
      icon="chat-o"
      text="Floor1"
      @click="changeFloor(1)"
    />
    <van-action-bar-icon
      icon="cart-o"
      text="Floor2"
      @click="changeFloor(2)"
    />
    <van-action-bar-button
      color="var(--wpb-secondary-color)"
      icon="plus"
      @click="zoomIn"
    />
    <van-action-bar-button
      color="var(--wpb-secondary-color)"
      icon="minus"
      @click="zoomOut"
    />
    <van-action-bar-button
      color="var(--wpb-secondary-color)"
      icon="cross"
      @click="resetZoom"
    />
  </van-action-bar>

  <div class="panzoom-container">
    <img
      ref="panzoomEl"
      class="image"
      :src="floorImg"
      alt=""
    />
  </div>
</template>

<script setup>
import Panzoom from '@panzoom/panzoom';

import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue';

const panzoomEl = useTemplateRef('panzoomEl');
const panzoom = ref(null);

const initPanzoom = () => {
  panzoom.value = Panzoom(panzoomEl.value, {
    maxScale: 5,
  });
};

const destroyPanzoom = () => {
  if (panzoom.value) {
    panzoom.value.destroy();
    panzoom.value = null;
  }
};

const floor = ref(1);
const floorImg = ref('floor1.jpg');

const changeFloor = (newFloor) => {
  floor.value = newFloor;

  destroyPanzoom();
  initPanzoom();

  if (floor.value === 1) {
    floorImg.value = `floor1.jpg`;
  } else if (floor.value === 2) {
    floorImg.value = `floor2.png`;
  }
};

const resetZoom = () => {
  panzoom.value.reset();
};

const zoomIn = () => {
  panzoom.value.zoomIn();
};

const zoomOut = () => {
  panzoom.value.zoomOut();
};

onMounted(() => {
  initPanzoom();
});

onUnmounted(() => {
  destroyPanzoom();
});
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
}

.panzoom-container {
  width: 100%;
  height: 100vh;
}
</style>
