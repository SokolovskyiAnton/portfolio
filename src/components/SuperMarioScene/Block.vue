<template>
  <div>
    <div
      :class="['mario-box', { '-jumped': hasTouched }]"
      @click="onTouchBlock"
      ref="block"
    >
      <div class="in"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emits = defineEmits(["jumped"]);

const hasTouched = ref(false);
const block = ref(null);

function onTouchBlock() {
  hasTouched.value = true;
  animateBlock();
  setTimeout(() => {
    hasTouched.value = false;
  }, 700);
}

function animateBlock() {
  emits("jumped", block.value);
}
</script>

<style lang="stylus" scoped>
.mario-box
  position: relative
  cursor: pointer
  width: 128px
  height: 128px

  .preview>&
    margin: 30rem auto 10rem

  &:hover
    filter: brightness(1.2)

  &.-jumped
    .in
      animation: jumped 0.5s
      animation-delay .2s

  &.-full.-jumped .in
    animation: none
    background-position: -512px 0

  &.-off
    cursor: default

    &:hover
      filter: none

  .in
    position: relative
    z-index: 2
    top: 0
    left: 0
    width: 128px
    height: 128px
    background: url('@/assets/bg-mario.png') no-repeat 0 0
    animation: marioBox 0.6s steps(4) infinite

  .mario-coin
    left: 0
    bottom: 0
    z-index: 1
    position: absolute
    visibility: hidden

@keyframes marioBox
  from
    background-position: 0 0;

  to
    background-position: -512px 0

@keyframes jumped
  from
    transform: translateY(-20px);

  to
    transform: translateY(0px);
</style>
