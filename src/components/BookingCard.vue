<template>
  <van-card
    :title="booking.date"
    :desc="description"
    thumb="https://imageproxy.ru/img/resize/-x220/https/co-atmosphere.ru/storage/app/uploads/public/5da/5db/8d3/5da5db8d3ca4e186463768.jpg"
  >
    <template #tags>
      <van-tag
        mark
        color="var(--wpb-secondary-color)"
        >{{ booking.room }}</van-tag
      >
    </template>
    <template #footer>
      <van-button
        size="small"
        icon="delete-o"
        color="var(--wpb-accent-color)"
        @click="$emit('remove', booking.id)"
      />
    </template>
  </van-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  booking: {
    type: Object,
    required: true,
  },
});

defineEmits(['remove']);

const description = computed(() => {
  const base = props.booking.slot ? props.booking.slot.toLowerCase() : '';
  const who = props.booking.toWhomFieldListValue
    ? ` для ${props.booking.toWhomFieldListValue}`
    : '';
  return `На ${base}${who}`;
});
</script>
