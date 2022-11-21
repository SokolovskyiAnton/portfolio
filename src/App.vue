<template>
  <div id="app" :class="$route.meta.bodyClass">
    <Header />
    <router-view />
    <Line />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Line from "./components/Line.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>
