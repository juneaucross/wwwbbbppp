<template>
  <div
    id="openseadragon1"
    class="openseadragon-viewer"
  ></div>
</template>

<script setup>
import OpenSeadragon from 'openseadragon';
import { onMounted, onUnmounted, ref } from 'vue';

const viewer = ref(null);

onMounted(() => {
  try {
    viewer.value = OpenSeadragon({
      id: 'openseadragon1',
      prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/',
      tileSources: {
        type: 'image',
        url: 'openseadragon/floor2.jpg',
      },
      showZoomControl: false,
      showHomeControl: false,
      showFullPageControl: true,
      showRotationControl: false,
    });
  } catch (error) {
    console.error('Error initializing OpenSeadragon:', error);
  }
});

onUnmounted(() => {
  if (viewer.value) {
    try {
      viewer.value.destroy();
    } catch (error) {
      console.warn('Error destroying OpenSeadragon:', error);
    }
  }
});
</script>

<style scoped>
.openseadragon-viewer {
  width: 100%;
  height: 80vh;
  margin-top: 20px;
}
</style>
