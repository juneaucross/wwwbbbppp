<template>
  <van-tabbar v-model="active">
    <van-tabbar-item
      replace
      to="/"
      icon="home-o"
      >Бронь</van-tabbar-item
    >
    <van-tabbar-item
      replace
      to="/journal"
      icon="search"
      >Журнал</van-tabbar-item
    >
    <van-tabbar-item
      replace
      to="/floor"
      icon="friends-o"
      >Этажи</van-tabbar-item
    >
    <van-tabbar-item
      replace
      to="/room"
      icon="setting-o"
      >КИР</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>
