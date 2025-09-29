<template>
  <div>
    <van-cell
      :title="label"
      :value="modelValue"
      @click="show = true"
    />
    <van-calendar
      v-model:show="show"
      first-day-of-week="1"
      :min-date
      :max-date
      color="var(--wpb-primary-color)"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: { type: String, default: 'Дата' },
  modelValue: { type: String, default: '' },
  isForKir: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const show = ref(false);

const minDate = new Date();
const maxDate = new Date(minDate.getTime() + 10 * 24 * 60 * 60 * 1000);

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return props.isForKir ? `${year}-${month}-${day}` : `${day}.${month}.${year}`;
};

const onConfirm = (value) => {
  show.value = false;
  const formatted = formatDate(value);
  emit('update:modelValue', formatted);
  emit('confirm', formatted);
};
</script>
