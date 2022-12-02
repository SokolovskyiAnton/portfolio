<template>
  <SceneSection id="Mario" aria-labelledby="marioDesc">
    <div v-if="!isMarioPlay" class="play-mario-block">
      <button @click="onMarioPlay" class="play-mario-button">Play Game</button>
    </div>
    <template v-if="isMarioPlay" #container>
      <div class="mario-coin-counter" v-show="foundCoins">
        {{ foundCoins }}
      </div>
      <div class="blocks">
        <Block
          v-for="(block, i) in 3"
          :key="i"
          :has-coin="randomNumber === i + 1"
          :has-find-all-coins="hasFoundAllCoins"
          @jumped="onJumped"
          @foundCoin="onFoundCoin"
        />
      </div>
      <SuperMario :state="marioState" />
    </template>
  </SceneSection>
</template>

<script lang="ts" setup>
import SuperMario from "@/components/SuperMarioScene/SuperMario.vue";
import SceneSection from "@/components/SceneSection.vue";
import Block from "@/components/SuperMarioScene/Block.vue";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useGsap } from "@/hooks/useGsap";
import { random } from "@/helpers/random";

defineEmits(["jumped", "foundCoin", "foundCoin"]);

const { observeElement } = useIntersectionObserver;
const gsap = useGsap();
const marioState = ref<string | null>(null);
const isMarioPlay = ref(false);
const randomNumber = ref(1);
const foundCoins = ref(0);
const coinsToBeFound = ref(6);
const observer = ref<IntersectionObserver>();
const optionsOfObserver = ref({
  threshold: 0.8,
  rootMargin: "10px",
});
const audioMarioStart = new Audio("/smw_princess_help.ogg");
const audioPowerUp = new Audio("/smw_power-up.ogg");

// checks if coins reach the limit
const hasFoundAllCoins = computed(() => {
  return foundCoins.value === coinsToBeFound.value;
});

function createRandomNumber() {
  randomNumber.value = random(1, 3);
}

function onFoundCoin() {
  createRandomNumber();
  !hasFoundAllCoins.value && foundCoins.value++;

  if (hasFoundAllCoins.value) {
    audioPowerUp.play();
  }

  if (foundCoins.value === 1) {
    document.body.classList.remove("is-playing-mario");
    document.body.classList.add("has-played-mario");
  }
}

function onMarioPlay() {
  audioMarioStart.play();
  isMarioPlay.value = true;
  document.body.classList.remove("is-mario-viewport");
  document.body.classList.add("is-playing-mario");
}

function onJumped(block: HTMLElement) {
  const rect = block.getBoundingClientRect();
  const blockCenter = Math.floor(rect.x + rect.width / 2);
  const blockBottom = rect.bottom;

  jumpMario(blockCenter, blockBottom);
}

function jumpMario(blockCenter: number, blockBottom: number) {
  const mario = document.querySelector(".mario");

  if (!mario) {
    return;
  }

  const marioRect = mario.getBoundingClientRect();
  const isJumpingLeft = marioRect.x > blockCenter;
  const marioFloor = window.innerHeight - marioRect.height;
  const marioAnimation = gsap.timeline();

  marioAnimation
    .clear(true)
    .set(mario, {
      rotationY: isJumpingLeft ? 180 : 0,
    })
    .fromTo(
      mario,
      0.3,
      {
        left: marioRect.x,
        top: marioFloor,
      },
      {
        onStart: () => {
          marioState.value = "up";
        },
        motionPath: [
          {
            left: blockCenter - marioRect.width / 2,
            top: blockBottom,
          },
          {
            left: isJumpingLeft ? blockCenter - 128 : blockCenter + 128,
            top: marioFloor,
          },
        ],
        ease: "steps(5)",
        onComplete: () => {
          marioState.value = hasFoundAllCoins.value ? "celebrate" : null;
        },
      }
    );
}

function intersectCallback(entry: IntersectionObserverEntry) {
  if (entry.isIntersecting) {
    // when mario scene is in viewport
    // block scrolling
    !isMarioPlay.value && document.body.classList.add("is-mario-viewport");

    // if mario has played
    // show game
    isMarioPlay.value && document.body.classList.add("has-played-mario");
  }

  if (!entry.isIntersecting) {
    // if leave from mario game
    document.body.classList.remove("has-played-mario");
  }
}

onMounted(() => {
  // create observer for mario scene
  const marioScene = document.getElementById("Mario");
  if (marioScene) {
    observer.value = observeElement(
      marioScene,
      intersectCallback,
      optionsOfObserver.value
    );
  }
  createRandomNumber();
});
onBeforeUnmount(() => {
  // disconnect from observer after changing route
  observer.value?.disconnect();
  document.body.classList.remove(
    "has-played-mario",
    "is-mario-viewport",
    "is-playing-mario"
  );
});
</script>

<style lang="stylus" scoped>
#Mario
  position relative
  z-index 999

  .blocks
    display flex
    align-items center
    justify-content center
    gap max(2rem, 6vw)
    margin-top 35vh

  .mario-box
    left calc(50% - 64px)

  .mario
    position fixed !important
    top calc(100% - 248px)
    left calc(50% - 64px)

  .play-mario-block
    display flex
    opacity 0
    justify-content center
    .play-mario-button
      font-family "SMW"
      font-size 23px
      font-weight bold
      padding 20px
      cursor pointer
      border-radius 5px
  .mario-coin-counter
    position fixed
    top 7rem
    left calc(50% - 3rem)
    width 7rem
    text-align center
    line-height 3rem
    font-family 'SMW', monospace
    font-size 2rem
    color #fff
    display flex
    align-items center

    &:before
      flex 0 0 auto
      content ''
      margin-right 0.5rem
      width 2rem
      height 2rem
      background url('@/assets/bg-mario.png') no-repeat 0 -64px
      background-size 160px 158px
</style>
