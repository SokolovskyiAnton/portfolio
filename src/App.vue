<template>
  <div id="app" :class="$route.meta.bodyClass">
    <Header />
    <router-view />
    <Line />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Line from "./components/Common/Line.vue";
import Header from "./components/Common/Header.vue";
import Footer from "./components/Common/Footer.vue";
</script>
