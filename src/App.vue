<template>
  <van-config-provider theme="light">
    <div v-if="authChecked">
      <AppHeader />
      <router-view />
      <footer>
        <AppTabBar />
      </footer>
    </div>
    <div v-else>Loading...</div>
  </van-config-provider>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useIsAuthenticated, useMsal } from 'vue3-msal-plugin';

import AppTabBar from '@/components/AppTabBar.vue';
import AppHeader from '@/components/AppHeader.vue';

const router = useRouter();
const isAuthenticated = useIsAuthenticated();
const { instance } = useMsal();
const authChecked = ref(false);

// Watch for authentication changes
watch(isAuthenticated, (newVal) => {
  if (!newVal && router.currentRoute.value.name !== 'Login') {
    router.push('/');
  }
});

onMounted(() => {
  // Initial check
  if (!isAuthenticated.value && router.currentRoute.value.name !== 'Login') {
    router.push('/');
  }

  authChecked.value = true;
});
</script>
