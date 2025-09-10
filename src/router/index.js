import { createRouter, createWebHistory } from 'vue-router';
import BookingView from '@/views/BookingView.vue';
import JournalView from '@/views/JournalView.vue';
import FloorView from '@/views/FloorView.vue';
import RoomView from '@/views/RoomView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BookingView, meta: { title: 'Бронь' } },
    { path: '/journal', component: JournalView, meta: { title: 'Журнал' } },
    { path: '/floor', component: FloorView, meta: { title: 'Этаж' } },
    { path: '/room', component: RoomView, meta: { title: 'КИР' } },
  ],
});

export default router;
