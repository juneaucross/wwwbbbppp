<template>
  <div>
    <van-empty
      v-if="!bookings || !bookings.length"
      :description="emptyDescription"
    />
    <div v-else>
      <BookingCard
        v-for="booking in bookings"
        :key="booking.id"
        :booking="booking"
        @remove="$emit('remove', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import BookingCard from './BookingCard.vue';

defineProps({
  bookings: { type: Array, default: () => [] },
  emptyDescription: { type: String, default: 'No bookings yet' },
});

defineEmits(['remove']);
</script>
