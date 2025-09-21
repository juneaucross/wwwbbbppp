<template>
  <van-tabbar-item
    :replace="true"
    :to="to"
    :icon="icon"
    >{{ label }}</van-tabbar-item
  >
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  to: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>
