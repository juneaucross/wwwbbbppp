<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">Бронь</van-tabbar-item>
    <van-tabbar-item icon="search">Журнал</van-tabbar-item>
    <van-tabbar-item icon="friends-o">Этажи</van-tabbar-item>
    <van-tabbar-item icon="setting-o">КИР</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>