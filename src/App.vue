<script setup>
import AppTabBar from '@/components/AppTabBar.vue';
import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
  <van-config-provider theme="dark">
    <AppHeader />

    <router-view />

    <footer>
      <AppTabBar />
    </footer>
  </van-config-provider>
</template>
