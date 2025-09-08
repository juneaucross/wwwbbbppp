<template>
  <header class="header">
    <Button type="primary" icon="info-o" />
    <h1>WPB</h1>
    <Button type="primary" icon="info-o" />
  </header>
</template>

<script setup>
import { Button } from 'vant';
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: blue;
}

h1 {
  margin: 0;
  color: white;
}
</style>