import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Locale } from 'vant';
import ruRU from 'vant/es/locale/lang/ru-RU';

import { msalPlugin, msalInstance } from 'vue3-msal-plugin';
import { EventType } from '@azure/msal-browser';

import App from './App.vue';
import router from './router';

import { useUserStore } from './stores/user';

import 'vant/lib/index.css';
import './assets/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

Locale.use('ru-RU', ruRU);

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: import.meta.env.VITE_AZURE_INSTANCE + import.meta.env.VITE_AZURE_TENANT_ID,
    redirectUri: 'https://wwwbbbppp.vercel.app/logon',
    postLogoutRedirectUri: 'https://wwwbbbppp.vercel.app/logon',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

const newMsalInstance = msalInstance(msalConfig);

const accounts = newMsalInstance.getAllAccounts();
if (accounts.length > 0) {
  newMsalInstance.setActiveAccount(accounts[0]);
}

const { updateUser } = useUserStore();

newMsalInstance.addEventCallback(async (event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload;
    const account = await payload.account;
    newMsalInstance.setActiveAccount(account);
    updateUser(account);
  }
});

app.use(msalPlugin, newMsalInstance);

const activeAccount = newMsalInstance.getActiveAccount();
if (activeAccount) {
  updateUser(activeAccount);
}

app.mount('#app');
