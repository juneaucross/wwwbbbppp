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

  return { bookings, removeBooking, addBooking };
});
