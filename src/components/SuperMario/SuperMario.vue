<template>
  <div :class="['mario', state]" />
</template>

<script lang="ts" setup>
defineProps<{
  state: string | null;
}>();
</script>

<style lang="stylus" scoped>
.mario
  position fixed !important
  top calc(100% - 248px)
  left calc(50% - 64px)
  width 128px
  height 248px
  background url('@/assets/bg-mario.png') no-repeat -256px -384px

  &.up
    background-position 0 -384px

  &.celebrate
    background-position -384px -384px
</style>
