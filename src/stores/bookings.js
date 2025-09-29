import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = ref([]);

  const addBooking = (booking) => {
    bookings.value.push(booking);
  };

  const removeBooking = (bookingId) => {
    bookings.value = bookings.value.filter((booking) => booking.id !== bookingId);
  };

  const events = ref(
    localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [],
  );

  const setEvents = (events) => {
    events.value = events;
    localStorage.setItem('events', JSON.stringify(value));
  };

  return { bookings, removeBooking, addBooking, events, setEvents };
});
