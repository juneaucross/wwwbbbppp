<template>
  <ActionBar>
    <!-- <ActionBarIcon icon="chat-o" text="Icon1" />
    <ActionBarIcon icon="cart-o" text="Icon2" />
    <ActionBarIcon icon="shop-o" text="Icon3" /> -->
    <ActionBarButton color="#be99ff" type="warning" text="Себе" />
    <ActionBarButton color="#7232dd" type="danger" text="Другому" />
  </ActionBar>
</template>

<script setup>
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
</script>

<style scoped>
.van-action-bar {
  bottom: unset !important;
}
</style>