<template>
  <div>
    <div
      :class="['mario-box', { '-jumped': hasTouched }]"
      @click="onTouchBlock"
      ref="block"
    >
      <div class="in"></div>
      <Coin id="coin" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Coin from "@/components/SuperMarioScene/Coin.vue";
import { ref } from "vue";
import { useGsap } from "@/hooks/useGsap";
import { random } from "@/helpers/random";

const emits = defineEmits(["jumped", "foundCoin", "foundAllCoins"]);
const props = defineProps<{
  hasCoin: boolean;
  hasFindAllCoins: boolean;
}>();

const gsap = useGsap();
const hasTouched = ref(false);
const block = ref<HTMLElement | null>(null);
const audioStomp = new Audio("/smw_stomp.ogg");
const audioNoDamage = new Audio("/smw_stomp_no_damage.ogg");
const audioAppears = new Audio("/smw_power-up_appears.ogg");

function animateCoin() {
  if (!block.value) {
    return;
  }

  const xCoords = random(-150, 150);
  const coin = block.value.children[1];
  const coinAnimation = gsap.timeline();

  coinAnimation
    .set(coin, {
      autoAlpha: 1,
      xPercent: 0,
      yPercent: 0,
    })
    .to(coin, 0.1, { yPercent: -100 })
    .to(coin, 1, {
      motionPath: [
        { xPercent: xCoords, yPercent: random(-150, -100) },
        { xPercent: xCoords * 2, yPercent: 800 },
      ],
      ease: "steps(24)",
    });

  audioAppears.play();
  emits("foundCoin");
}

function onTouchBlock() {
  hasTouched.value = true;
  animateBlock();

  if (props.hasFindAllCoins) {
    audioNoDamage.play();
    return;
  }

  if (props.hasCoin) {
    audioStomp.play();
    animateCoin();
  } else {
    audioNoDamage.play();
  }
}

function animateBlock() {
  hasTouched.value = true;

  emits("jumped", block.value);

  const blockAnimation = gsap.timeline();

  blockAnimation
    .clear(true)
    .set(block.value, { yPercent: 0 })
    .to(block.value, 0.07, { yPercent: -40, ease: "steps(2)" })
    .to(block.value, 0.07, { yPercent: 0, ease: "steps(2)" });
}
</script>

<style lang="stylus" scoped>
.mario-box
  position: relative
  cursor: pointer
  width: 128px
  height: 128px

  &:hover
    filter: brightness(1.2)

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
</style>
