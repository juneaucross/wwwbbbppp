<template>
  <header class="header">
    <van-button
      type="primary"
      icon="send-gift-o"
      @click="stateStore.changeState(stateStore.prevState)"
    />
    <h1>{{ router.currentRoute.value.meta.title }}</h1>
    <van-button
      type="primary"
      icon="info-o"
    />
  </header>
</template>

<script setup>
import router from '../router';
import { useStateStore } from '../stores/state';

const stateStore = useStateStore();
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
}

h1 {
  margin: 0;
  color: white;
}
</style>
