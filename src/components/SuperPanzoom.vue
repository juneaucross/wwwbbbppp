<template>
  <div class="panzoom-container">
    <img
      ref="panzoom"
      class="image"
      src="@/assets/floor2.jpg"
      alt=""
    />
  </div>
</template>

<script setup>
import Panzoom from '@panzoom/panzoom';

import { ref, useTemplateRef, onMounted, onUnmounted } from 'vue';

const panzoomEl = useTemplateRef('panzoom');

const panzoom = ref(null);

onMounted(() => {
  panzoom.value = Panzoom(panzoomEl.value, {
    maxScale: 5,
  });
});

onUnmounted(() => {
  if (panzoom.value) {
    panzoom.value.destroy();
    panzoom.value = null;
  }
});
</script>

<style scoped>
.image {
  width: 100%;
  height: 100%;
}

.panzoom-container {
  width: 100%;
  height: 100%;
}
</style>
