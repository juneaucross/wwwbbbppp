import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Locale } from 'vant';
import ruRU from 'vant/es/locale/lang/ru-RU';

import { msalPlugin, msalInstance } from 'vue3-msal-plugin';
// import type { Configuration, AuthenticationResult } from '@azure/msal-browser'
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
    redirectUri: 'https://wwwbbbppp.vercel.app', // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: 'https://wwwbbbppp.vercel.app', // Must be registered as a SPA redirectURI on your app registration
  },
  cache: {
    cacheLocation: 'localStorage',
  },
};

const newMsalInstance = msalInstance(msalConfig);

// Get all accounts from the MSAL instance
const accounts = newMsalInstance.getAllAccounts();
if (accounts.length > 0) {
  // If there are any accounts, set the first one as the active account
  newMsalInstance.setActiveAccount(accounts[0]);
}

const { updateUser } = useUserStore();

// Add an event callback to the MSAL instance
newMsalInstance.addEventCallback((event) => {
  // If the event is a successful login and the event has a payload
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    // Cast the payload to an AuthenticationResult
    const payload = event.payload;
    // Get the account from the payload
    const account = payload.account;
    // Set the account as the active account in the MSAL instance
    newMsalInstance.setActiveAccount(account);

    /* Optioanlly, You can update the user store with the account data here.
    'account' refers to the account data obtained from the MSAL instance.
    */
    updateUser(account);
  }
});

// Use the vue3-msal plugin with the MSAL instance
app.use(msalPlugin, newMsalInstance);

const activeAccount = newMsalInstance.getActiveAccount();
if (activeAccount) {
  /* Optioanlly, you can update the user store with the account data here.
    'account' refers to the account data obtained from the MSAL instance.
    */
  updateUser(activeAccount);
}

app.mount('#app');
