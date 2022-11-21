<template>
  <div class="wrapper" id="about">
    <AboutSection />
  </div>
</template>

<script setup lang="ts">
import AboutSection from "@/components/AboutSection.vue";
</script>

<style lang="stylus">
#about
  .static-container
    padding-top 30vh

    @media screen and (max-width 1024px)
      padding-top 50vw
</style>
