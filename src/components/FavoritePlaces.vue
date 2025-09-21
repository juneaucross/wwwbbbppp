<template>
  <section class="favorite-places">
    <h4>{{ title }}</h4>
    <div class="favorite-places__buttons">
      <van-button
        v-for="place in places"
        :key="place"
        plain
        color="var(--wpb-primary-color)"
        @click="$emit('select', place)"
        >{{ place }}</van-button
      >
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Ваши избранные места' },
  places: { type: Array, default: () => [] },
});

defineEmits(['select']);
</script>

<style scoped>
.favorite-places {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.favorite-places h4 {
  margin-bottom: 0;
}

.favorite-places__buttons {
  display: flex;
  gap: 10px;
}

.favorite-places__buttons :deep(button) {
  flex: 1;
}
</style>
