<template>
  <div>
    <van-field
      :model-value="modelValueText"
      is-link
      readonly
      :label="label"
      :placeholder="placeholder"
      @click="show = true"
    />
    <van-popup
      v-model:show="show"
      destroy-on-close
      round
      position="bottom"
    >
      <van-picker
        :model-value="innerSelectedValues"
        :title="label"
        :columns="columns"
        @cancel="show = false"
        @confirm="handleConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  columns: { type: Array, required: true },
  modelValue: { type: Array, default: () => [] },
  textValue: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'update:text', 'confirm']);

const show = ref(false);
const innerSelectedValues = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    innerSelectedValues.value = val;
  },
);

const modelValueText = computed(() => {
  if (props.textValue) {
    return props.textValue;
  }
  const match = props.columns.find((c) => c.value === innerSelectedValues.value?.[0]);
  return match ? match.text : '';
});

const handleConfirm = ({ selectedValues, selectedOptions }) => {
  show.value = false;
  innerSelectedValues.value = selectedValues;
  emit('update:modelValue', selectedValues);
  emit('update:text', selectedOptions?.[0]?.text || '');
  emit('confirm', { selectedValues, selectedOptions });
};
</script>
