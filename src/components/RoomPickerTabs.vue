<template>
  <van-tabs
    v-model:active="active"
    type="card"
    class="tab"
    @click-tab="onClickTab"
  >
    <van-tab
      v-for="tab in tabs"
      :key="tab.name"
      :title="tab.title"
      :name="tab.name"
      class="tab"
    >
      <PickerField
        v-model="innerModel"
        label="Номер"
        :placeholder="tab.placeholder"
        :columns="tab.columns"
        :text-value="props.modelText"
        @update:text="onTextUpdate"
      />
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref, watch } from 'vue';
import PickerField from './PickerField.vue';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  modelText: { type: String, default: '' },
  fixed: { type: Array, default: () => [] },
  cabinets: { type: Array, default: () => [] },
  openSpace: { type: Array, default: () => [] },
});

const emit = defineEmits(['update:modelValue', 'update:modelText']);

const active = ref(0);
const innerModel = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    innerModel.value = val;
  },
);

const tabs = ref([
  { title: 'Фиксированные', name: 'fixed', placeholder: 'Номер комнаты', columns: props.fixed },
  { title: 'Кабинеты', name: 'cabinets', placeholder: 'Номер кабинета', columns: props.cabinets },
  { title: 'Опен-спейс', name: 'open-space', placeholder: 'Номер места', columns: props.openSpace },
]);

const onClickTab = () => {
  emit('update:modelText', '');
  emit('update:modelValue', []);
};

const onTextUpdate = (text) => {
  emit('update:modelText', text);
};

watch(
  () => innerModel.value,
  (val) => emit('update:modelValue', val),
);
</script>

<style scoped>
.tab {
  margin-top: 10px;
}
</style>
