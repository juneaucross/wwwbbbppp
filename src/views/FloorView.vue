<template>
  <van-tabs
    v-model:active="activeTab"
    type="card"
    class="tab"
  >
    <van-tab
      title="OSD"
      name="osd"
      class="tab"
    >
      <SuperOpenSeaDragon />
    </van-tab>
    <van-tab
      title="Panzoom"
      name="panzoom"
      class="tab"
    >
      <SuperPanzoom />
    </van-tab>
    <van-tab
      title="PhotoSwipe"
      name="photoswipe"
      class="tab"
    >
      <SuperPhotoSwipe />
    </van-tab>
    <van-tab
      title="Zoomist"
      name="zoomist"
      class="tab"
    >
      <SuperZoomist />
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref } from 'vue';

import SuperOpenSeaDragon from '@/components/SuperOpenSeaDragon.vue';
import SuperPanzoom from '@/components/SuperPanzoom.vue';
import SuperPhotoSwipe from '@/components/SuperPhotoSwipe.vue';
import SuperZoomist from '@/components/SuperZoomist.vue';

const activeTab = ref(0);
</script>

<style scoped>
.tab {
  margin-top: 10px;
}
</style>
