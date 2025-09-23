<template>
  <div>
    <pre v-if="user">
      {{ user }}
    </pre>
    <pre v-else>No user data</pre>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';

const user = useUserStore();
</script>
