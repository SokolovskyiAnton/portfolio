<template>
  <SceneSection id="Mario" aria-labelledby="marioDesc">
    <div v-if="!isMarioPlay" class="play-mario-block">
      <button @click="onMarioPlay" class="play-mario-button">Play Game</button>
    </div>
    <template v-if="isMarioPlay" #container>
      <div v-show="foundCoins" class="mario-coin-counter">
        {{ foundCoins }}
      </div>
      <div v-show="hasFoundAllCoins">
        <div class="mario-msg-overlay"></div>
        <div class="mario-msg">
          Thanks for jumping so many times. <br />
          <span class="-purple">You found all the coins!</span>

          <div class="later">
            ;)
            <button
              class="mario-msg-close"
              type="button"
              title="Close message"
              @click="onCloseMessage"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
      <div class="blocks">
        <Block
          v-for="(block, i) in 3"
          :key="i"
          :has-coin="randomNumber === i + 1"
          :has-found-all-coins="hasFoundAllCoins"
          @jumped="onJumped"
          @foundCoin="onFoundCoin"
        />
      </div>
      <SuperMario :state="marioState" />
    </template>
  </SceneSection>
</template>

<script lang="ts" setup>
import SuperMario from "@/components/SuperMario/SuperMario.vue";
import SceneSection from "@/components/Common/SceneSection.vue";
import Block from "@/components/SuperMario/Block.vue";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useGsap } from "@/hooks/useGsap";
import { random } from "@/helpers/random";

defineEmits(["jumped", "foundCoin"]);

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
const audioExit = new Audio("/smw_keyhole_exit.ogg");

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
    onOpenMessage();
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
            top: window.innerWidth <= 1024 ? blockBottom * 0.85 : blockBottom,
          },
          {
            left: isJumpingLeft ? blockCenter - 128 : blockCenter + 128,
            top: window.innerWidth <= 1024 ? marioFloor * 0.9 : marioFloor,
          },
        ],
        ease: "steps(5)",
        onComplete: () => {
          marioState.value = hasFoundAllCoins.value ? "celebrate" : null;
        },
      }
    );
}

function onOpenMessage() {
  audioExit.play();
  const timeline = gsap.timeline();
  timeline
    .to("#Mario .mario-msg", 1, {
      scale: 1,
      ease: "steps(12)",
    })
    .to(
      "#Mario .mario-msg .later",
      0.1,
      {
        autoAlpha: 1,
      },
      "+=2"
    );
}
function onCloseMessage() {
  const timeline = gsap.timeline();
  timeline.to("#Mario .mario-msg, #Mario .mario-msg-overlay", 1, {
    scale: 0,
    ease: "steps(12)",
  });
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

<style lang="stylus">
#Mario
  position relative
  z-index 999

  .mario-msg-overlay
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 9999

  .mario-msg
    position fixed
    top 50%
    left 50%
    z-index 9999
    transform translate3d(-50%, -50%, 0) scale(0)
    transform-origin 50% 50%
    width 40rem
    height 30rem
    padding 2rem
    max-width 70v
    max-height 70vh
    background #000
    color #fff
    font-family 'SMW', monospace
    font-size 2rem
    text-align center
    letter-spacing 2px
    display flex
    flex-flow column nowrap
    align-items center
    justify-content center
    user-select none

    .-purple
      color var(--purple)

    .later
      color var(--purple)
      opacity 0
      padding-top 2rem
      position static
      text-align center
      .mario-msg-close
        position absolute
        bottom 100%
        right 0
        z-index 99
        width 3rem
        height 3rem
        color white
        font-size 2rem
        background none
        padding 0
    @media screen and (max-width 568px)
      padding 1rem
      max-width 80vw
      font-size 1.2rem

      .later
        padding-top 1rem

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



  @media screen and (max-width 1024px)
    .mario-box,
    .mario
      transform-origin 50% 100%
      transform scale(0.7)

    .container
      transform scale(1)

    .mario-coin-counter
      top 6rem
      font-size 1.5rem

      &:before
        transform scale(0.8)
</style>
