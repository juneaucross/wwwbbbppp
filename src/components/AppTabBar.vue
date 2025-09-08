<template>
  <tabbar v-model="active">
    <tabbar-item icon="home-o">Tab</tabbar-item>
    <tabbar-item icon="search">Tab</tabbar-item>
    <tabbar-item icon="friends-o">Tab</tabbar-item>
    <tabbar-item icon="setting-o">Tab</tabbar-item>
  </tabbar>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant';
import { ref } from 'vue'

const active = ref(0)
</script>