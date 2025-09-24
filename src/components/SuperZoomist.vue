<template>
  <div class="super-zoomist zoomist-container">
    <div class="zoomist-wrapper">
      <div class="zoomist-image">
        <img
          src="../assets/floor2.jpg"
          alt="floor"
        />
        <!-- style="width: 90%; margin: 0 auto" -->
        <!-- <a class="zoomist-not-draggable" href="https://google.com" target="_blank">NOT DRAGGABLE</a>
            <a class="zoomist-not-wheelable" href="https://google.com" target="_blank">NOT WHEELABLE</a> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Zoomist from 'zoomist';
import 'zoomist/css';

import { ref, onMounted, onUnmounted } from 'vue';

const zoomist = ref(null);

onMounted(() => {
  zoomist.value = new Zoomist('.super-zoomist', {
    // bounds: false,
    // slider: true,
    zoomer: true,
    smooth: true,
  });
});

onUnmounted(() => {
  if (zoomist.value) {
    zoomist.value.destroy();
    zoomist.value = null;
  }
});
</script>

<style scoped>
@media (prefers-color-scheme: dark) {
  .super-zoomist {
    --zoomist-slider-bg-color: rgba(12, 12, 12, 0.8);
    --zoomist-slider-track-color: #444;
    --zoomist-slider-track-color-hover: #666;
    --zoomist-slider-button-color: #ccc;
    --zoomist-zoomer-button-color: rgba(12, 12, 12, 0.9);
    --zoomist-zoomer-button-color-hover: rgba(24, 24, 24, 0.9);
    --zoomist-zoomer-button-color-disabled: rgba(12, 12, 12, 0.8);
    --zoomist-zoomer-icon-color: #ccc;
    --zoomist-zoomer-icon-color-hover: #eee;
    --zoomist-zoomer-icon-color-disabled: #666;
    --body-background-image: linear-gradient(to bottom right, #333, #191919);
  }
}
@media (prefers-color-scheme: light) {
  .super-zoomist {
    --body-background-image: linear-gradient(to bottom right, #fff, #ccc);
  }
}
/* #app {
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: var(--body-background-image);
} */
.super-zoomist {
  width: 100%;
  max-width: 540px;
  max-height: 100dvh;
  /* aspect-ratio: 2 / 3; */
  margin-left: auto;
  margin-right: auto;
}
.zoomist-image {
  width: 100%;
  height: 100%;
  background-color: #333;
}
.zoomist-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.zoomer-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: rgba(30, 30, 30, 0.9) !important;
}
.zoomer-btn.zoomer-disabled {
  opacity: 0.2;
}
.change-image-btn {
  padding: 0.5rem;
  background-color: rgba(30, 30, 30, 0.9);
}
</style>
