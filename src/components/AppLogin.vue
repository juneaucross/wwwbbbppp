<template>
  <div>
    <h1>Hello then</h1>
    <p>Login please</p>
    <pre v-if="userStore.user">{{ userStore.user }}</pre>
    <button
      @click="handleLogin"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Logging in...' : 'Login' }}
    </button>
  </div>
</template>

<script setup>
import { useMsal } from 'vue3-msal-plugin';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const { msalInstance } = useMsal();
const { updateUser } = useUserStore();
const userStore = useUserStore();
const isLoading = ref(false);

const handleLogin = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  try {
    // Check if there's already an interaction in progress
    const redirectResponse = await msalInstance.handleRedirectPromise();

    if (redirectResponse !== null) {
      // We're already processing a redirect, don't start a new one
      msalInstance.setActiveAccount(redirectResponse.account);
      updateUser(redirectResponse.account);
      return;
    }

    // If no interaction in progress, start login
    const loginRequest = {
      scopes: ['User.Read'], // Adjust scopes as needed
    };

    await msalInstance.loginRedirect(loginRequest);
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // Handle any pending redirects when component mounts
  try {
    const redirectResponse = await msalInstance.handleRedirectPromise();
    if (redirectResponse !== null) {
      msalInstance.setActiveAccount(redirectResponse.account);
      updateUser(redirectResponse.account);
    }
  } catch (error) {
    console.error('Redirect handling error:', error);
  }
});

// Expose what you need to template (not needed in Vue 3.3+ with defineModel)
defineExpose({
  handleLogin,
  isLoading,
});
</script>

<!-- <template>
  <div>
    <h1>Hello then</h1>
    <p>Login please</p>

    <button @click="loginPopup">via popup</button>
    <button @click="loginRedirect">via redirect</button>
  </div>
</template>

<script setup>
import { useMsal } from 'vue3-msal-plugin';

const { instance, loginRequest } = useMsal();

const loginPopup = () => {
  instance.loginPopup(loginRequest);
};

const loginRedirect = () => {
  instance.loginRedirect(loginRequest);
};
</script> -->
