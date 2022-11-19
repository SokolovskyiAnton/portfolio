<template>
  <div class="static-container">
    <h1 class="title">about(<span class="func">sokolovskyi</span>)</h1>

    <TextBlock>
      <div class="first-fold">
        <ul class="about-contact">
          <li v-for="link in links" :key="link.url">
            <a :href="link.url" :title="link.title" target="_blank">
              <component :is="link.icon" />
            </a>
          </li>
          <li>
            Download my
            <a
              href="./anton.sokolovskyi.cv.pdf"
              title="Download CV"
              target="_blank"
              class="bt"
            >
              CV
              <CVIcon />
            </a>
          </li>
        </ul>
      </div>
    </TextBlock>
  </div>
</template>

<script lang="ts" setup>
import TextBlock from "@/components/TextBlock";
import CVIcon from "@/components/Icons/CVIcon.vue";
import { useLinks } from "@/hooks/useLinks";

const links = useLinks();
</script>

<style lang="stylus" scoped>
.about-contact
  display flex
  align-items center
  list-style none
  margin 2rem 0
  li
    display flex
    align-items center
    flex 0 0 auto
    list-style none
    margin 0 1rem 0 0
    color var(--text-color-gray)
    a
      flex 0 0 auto
      display flex
      align-items center
      text-decoration none
      &.bt
        background var(--text-color-purple)
        color var(--bg)
        padding 0 1rem
        height 2rem
        border-radius 3rem
        margin-left 1rem
        line-height 2rem

        .ico
          margin-left 0.5rem
          height 14px
          width 14px

        &:hover
          background var(--text-color-light)
      .ico
        flex 0 0 auto
        overflow visible
        width 1.5rem
        height 1.5rem
        stroke var(--bg)
        fill var(--text-color-purple)
        stroke-width 2px
        transition all 400ms ease-out
      &:hover
        .ico
          fill var(--text-color-light)
</style>
