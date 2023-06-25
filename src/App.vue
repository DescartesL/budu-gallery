<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<style>

.main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
