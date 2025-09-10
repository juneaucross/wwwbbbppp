import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { Locale } from 'vant';
import ruRU from 'vant/es/locale/lang/ru-RU';

import App from './App.vue';
import router from './router';

import 'vant/lib/index.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

Locale.use('ru-RU', ruRU);

app.mount('#app');
