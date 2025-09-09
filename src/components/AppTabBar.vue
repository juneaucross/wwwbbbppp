<template>
  <Tabbar v-model="active">
    <TabbarItem icon="home-o">Бронь</TabbarItem>
    <TabbarItem icon="search">Журнал</TabbarItem>
    <TabbarItem icon="friends-o">Этажи</TabbarItem>
    <TabbarItem icon="setting-o">КИР</TabbarItem>
  </Tabbar>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>