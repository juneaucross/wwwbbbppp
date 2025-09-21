<template>
  <van-tabbar
    v-model="active"
    route
    safe-area-inset-bottom
    active-color="var(--wpb-secondary-color)"
  >
    <AppTabBarItem
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      :icon="item.icon"
      :label="item.label"
    />
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue';
import AppTabBarItem from './AppTabBarItem.vue';

const active = ref(0);
const items = [
  { to: '/', icon: 'home-o', label: 'Бронь' },
  { to: '/journal', icon: 'search', label: 'Журнал' },
  { to: '/floor', icon: 'friends-o', label: 'Этажи' },
  { to: '/room', icon: 'setting-o', label: 'КИР' },
];
</script>
