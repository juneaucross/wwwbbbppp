<template>
  <div id="photo-swipe-gallery">
    <a
      v-for="(image, key) in images"
      :key="key"
      :href="image.largeURL"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      target="_blank"
      rel="noreferrer"
    >
      <img
        :src="image.thumbnailURL"
        alt=""
        style="width: 96%; margin: 0 auto"
      />
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const images = [
  {
    largeURL: 'floor2.jpg',
    thumbnailURL: 'floor2.jpg',
    width: 736,
    height: 1076,
  },
  // {
  //   largeURL: 'floor.png',
  //   thumbnailURL: 'floor.png',
  //   width: 1080,
  //   height: 1000,
  // },
];

const lightbox = ref(null);

onMounted(() => {
  if (!lightbox.value) {
    lightbox.value = new PhotoSwipeLightbox({
      gallery: '#photo-swipe-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.value.init();
  }
});

onUnmounted(() => {
  if (lightbox.value) {
    lightbox.value.destroy();
    lightbox.value = null;
  }
});
</script>
