<template>
  <header class="header">
    <van-button
      color="transparent"
      icon="send-gift-o"
      @click="showUserData = true"
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
      <div v-if="isAuthenticated">
        <div
          v-if="user"
          style="padding-right: 16px; padding-left: 16px"
        >
          <p>Authenticated as:</p>
          <div>Name: {{ user.name }}</div>
          <div>Username: {{ user.username }}</div>
        </div>

        <van-button @click="logoutPopup">Logout popup</van-button>
        <van-button @click="logoutRedirect">Logout redirect</van-button>
      </div>
      <div
        v-else
        style="padding-right: 16px; padding-left: 16px"
      >
        <p>Not authenticated</p>
        <van-button @click="loginPopup">Login popup</van-button>
        <van-button @click="loginRedirect">Login redirect</van-button>
      </div>

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
import { useUserStore } from '../stores/user';
import { useIsAuthenticated, useMsal } from 'vue3-msal-plugin';

const { instance, loginRequest } = useMsal();
const isAuthenticated = useIsAuthenticated();

const userStore = useUserStore();
const { user } = userStore;

const showDrawer = ref(false);
const showUserData = ref(false);

const loginPopup = () => {
  instance.loginPopup(loginRequest);
};

const loginRedirect = () => {
  instance.loginRedirect(loginRequest);
};

const logoutPopup = () => {
  instance.logoutPopup({
    mainWindowRedirectUri: '/',
  });
};

const logoutRedirect = () => {
  instance.logoutRedirect();
};

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
