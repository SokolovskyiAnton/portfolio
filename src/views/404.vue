<template>
  <div id="err404" class="wrapper">
    <div class="static-container">
      <h1 class="title">
        <span class="func">new</span> Error(<span class="func">404</span>)
      </h1>

      <TextBlock>
        <p>The page you requested could not be found.</p>
        <router-link to="/" title="Back home" class="back">
          Back to home
        </router-link>
      </TextBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextBlock from "@/components/Common/TextBlock.vue";
</script>

<style lang="stylus" scoped>
.back
  text-decoration: none
  background: var(--text-color-purple)
  color: var(--bg)
  padding: 0.5rem
  height: 2rem
  width 200px
  border-radius: 3rem
  line-height: 2rem

  .ico
    margin-left: 0.5rem
    height: 14px
    width: 14px

  &:hover
    background: var(--text-color-light)
</style>
