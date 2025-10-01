<template>
  <div>
    <h1>Hello then</h1>
    <p>Login please</p>

    <button @click="loginPopup">via popup</button>
    <button @click="loginRedirect">via redirect</button>
  </div>
</template>

// TODO: refactor login screen
<script setup>
import { useMsal } from 'vue3-msal-plugin';

const { instance, loginRequest } = useMsal();

const loginPopup = () => {
  instance.loginPopup(loginRequest);
};

const loginRedirect = () => {
  instance.loginRedirect(loginRequest);
};
</script>
