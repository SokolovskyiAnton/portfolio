<template>
  <div class="line" ref="line" />
  <div class="circle" />
  <div class="wave" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const line = ref<HTMLElement | null>(null);
const lineBaseHeight = 50;

function onScroll() {
  // get one percent of window height
  const x = window.innerHeight / 100;

  // find out how much to add to the line height
  // so that the line increases when scrolling
  const y = Math.floor(window.scrollY / x);

  if (line.value) {
    line.value.style.height = lineBaseHeight + y + "vh";
  }
}

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.scrollTo(0, 0);
});
</script>

<style scoped lang="stylus">
.line
  position absolute
  top 50vh
  bottom 50vh
  left calc(25vw - 2rem)
  z-index 99
  width 1px
  height 50vh
  opacity 0.3
  background var(--text-color-purple)
.circle
  position fixed
  top 48.9vh
  left calc(25vw - 2.3rem)
  width 10px
  height 10px
  border-radius 50%
  border 2px solid var(--text-color-purple)
  background-color var(--text-color-purple)
  animation-name circle
  animation-duration 1s
  animation-delay .5s
.wave
  position fixed
  top 48.9vh
  left calc(25vw - 2.3rem)
  width 10px
  height 10px
  border-radius 50%
  opacity 0
  border 2px solid var(--text-color-purple)
  animation-name wave
  animation-duration 2s
  animation-delay 1.5s

@media screen and (max-width: 1024px)
  .circle,
  .wave
    left 0.7rem
  .line
    left 1rem
@keyframes circle
  0%
    opacity 0
    background-color transparent
  50%
    opacity .5
    background-color transparent
    transform scale(1.4)
  100%
    opacity 1
@keyframes wave
  0%
    transform scale(1)
    opacity 1
  100%
    transform scale(4)
    opacity 0
</style>
