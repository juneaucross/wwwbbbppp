import { createRouter, createWebHistory } from 'vue-router';
import BookingView from '@/views/BookingView.vue';
import JournalView from '@/views/JournalView.vue';
import FloorView from '@/views/FloorView.vue';
import RoomView from '@/views/RoomView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Login', component: LoginView, meta: { title: 'Вход' } },
    { path: '/booking', name: 'Booking', component: BookingView, meta: { title: 'Бронь' } },
    { path: '/journal', name: 'Journal', component: JournalView, meta: { title: 'Журнал' } },
    { path: '/floor', name: 'Floor', component: FloorView, meta: { title: 'Этаж' } },
    { path: '/room', name: 'Room', component: RoomView, meta: { title: 'КИР' } },
    { path: '/logon', name: 'Logon', component: LogonView, meta: { title: 'Logon' } },
    { path: '/:catchAll(.*)', redirect: '/' },
  ],
});

export default router;
