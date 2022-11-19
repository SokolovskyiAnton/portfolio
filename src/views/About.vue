<template>
  <div class="wrapper" id="about">
    <Line />
    <AboutSection />
  </div>
</template>

<script setup lang="ts">
import Line from "@/components/Line";
import AboutSection from "@/components/AboutSection.vue";
</script>

<style lang="stylus" scoped>
#about
  .static-container
    padding-top 30vh

    @media screen and (max-width 1024px)
      padding-top 50vw
</style>
