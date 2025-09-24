<template>
  <header class="header">
    <van-button
      color="transparent"
      icon="send-gift-o"
      @click="stateStore.changeState(stateStore.prevState)"
    />
    <h1>{{ router.currentRoute.value.meta.title }}</h1>
    <van-button
      color="transparent"
      icon="info-o"
      @click="showDrawer = true"
    />
    <van-popup
      v-model:show="showDrawer"
      position="right"
      closeable
      class="drawer"
    >
      <van-image
        width="90%"
        style="padding-left: 16px"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQhweSX-arDvu4jqlftQqNfhowjHD6yyTaw&s"
      />

      <van-cell-group>
        <van-cell
          v-for="link in drawerLinks"
          :key="link.title"
          :title="link.title"
          is-link
          :url="link.url"
        />
      </van-cell-group>
    </van-popup>

    <van-popup
      v-model:show="showUserData"
      position="left"
      closeable
      class="drawer"
    >
      <pre v-if="user">{{ user }}</pre>
      <pre v-else>No user data</pre>
    </van-popup>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';
import { useStateStore } from '../stores/state';
import { useUserStore } from '../stores/user';

const user = useUserStore();

const stateStore = useStateStore();

const showDrawer = ref(false);
const showUserData = ref(false);

const drawerLinks = [
  {
    title: 'Сообщение об ошибке',
    url: 'https://github.com',
  },
  {
    title: 'Оставить отзыв',
    url: 'https://gitlab.com',
  },
  {
    title: 'Соглашение',
    url: 'https://bitbucket.com',
  },
  {
    title: 'Инструкция',
    url: 'https://stackoverflow.com',
  },
];
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--wpb-primary-color);
}

h1 {
  margin: 0;
  color: white;
}

.drawer {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;
  height: 100%;
  padding-top: 60px;
}
</style>
