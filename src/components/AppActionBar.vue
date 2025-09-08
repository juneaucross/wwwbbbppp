<template>
  <ActionBar>
    <ActionBarButton color="#be99ff" type="warning" text="Себе" />
    <ActionBarButton color="#7232dd" type="danger" text="Другому" />
  </ActionBar>
</template>

<script setup>
import { ActionBar, ActionBarButton } from 'vant';
</script>

<style scoped>
.van-action-bar {
  bottom: unset !important;
}
</style>