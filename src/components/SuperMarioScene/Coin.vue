<template>
  <div class="mario-coin" />
</template>

<script lang="ts" setup></script>

<style lang="stylus">
.mario-coin
  width: 128px
  height: 128px
  background: url('@/assets/bg-mario.png') no-repeat 0 -256px
  animation: marioCoin 0.6s steps(4) infinite
  pointer-events: none


  @keyframes marioCoin
    to
      background-position: -512px -256px
</style>
