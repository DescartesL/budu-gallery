<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/article">article</RouterLink>
        <RouterLink to="/tiptap">tiptap</RouterLink>
        <RouterLink to="/tiptap2">tiptap2</RouterLink>
        <RouterLink to="/calendar">calendar</RouterLink>
      </nav>
    </div>
  </header> -->
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
