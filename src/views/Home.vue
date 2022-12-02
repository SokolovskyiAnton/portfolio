<template>
  <div class="wrapper" id="home">
    <Intro />
    <SuperMarioScene />
  </div>
</template>

<script setup lang="ts">
// TODO create error view, try to implement scroll opacity
import Intro from "@/components/IntroScene.vue";
import SuperMarioScene from "@/components/SuperMarioScene.vue";
</script>
