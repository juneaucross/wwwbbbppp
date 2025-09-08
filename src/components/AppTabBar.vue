<template>
  <tabbar v-model="active">
    <tabbar-item icon="home-o">Бронь</tabbar-item>
    <tabbar-item icon="search">Журнал</tabbar-item>
    <tabbar-item icon="friends-o">Этажи</tabbar-item>
    <tabbar-item icon="setting-o">КИР</tabbar-item>
  </tabbar>
</template>

<script setup>
import { Tabbar, TabbarItem } from 'vant';
import { ref } from 'vue'

const active = ref(0)
</script>