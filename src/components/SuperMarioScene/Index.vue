<template>
  <SceneSection id="Mario" aria-labelledby="marioDesc">
    <div v-if="!isMarioPlay" class="play-mario-block">
      <button @click="onMarioPlay" class="play-mario-button">Play Game</button>
    </div>
    <template v-if="isMarioPlay" #container>
      <div class="blocks">
        <Block v-for="(block, i) in 3" :key="i" @jumped="onJumped" />
      </div>
      <SuperMario :state="''" />
    </template>
  </SceneSection>
</template>

<script lang="ts" setup>
import SuperMario from "@/components/SuperMarioScene/SuperMario.vue";
import SceneSection from "@/components/SceneSection.vue";
import Block from "@/components/SuperMarioScene/Block.vue";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useGsap } from "@/hooks/useGsap";

defineEmits(["jumped", "foundCoin", "foundAllCoins"]);

const { observeElement } = useIntersectionObserver;
const gsap = useGsap();
const isMarioPlay = ref(false);
const isWindowBlock = ref(false);
const audioMarioStart = new Audio("/smw_princess_help.ogg");
const observer = ref<IntersectionObserver>();
const optionsOfObserver = ref({
  threshold: 1,
  rootMargin: "10px",
});

function onMarioPlay() {
  audioMarioStart.play();
  isMarioPlay.value = !isMarioPlay.value;
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

  marioAnimation.clear(true).fromTo(
    mario,
    0.3,
    { left: marioRect.x, top: marioFloor },
    {
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
    }
  );
}

function intersectCallback(entry: IntersectionObserverEntry) {
  if (entry.isIntersecting) {
    // when mario scene is in viewport
    // block scrolling
    !isMarioPlay.value && document.body.classList.add("is-mario-viewport");
  }

  if (!entry.isIntersecting) {
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
  position: relative;
  z-index: 999;

  .blocks
    display: flex
    align-items: center
    justify-content: center
    gap: max(2rem, 6vw)
    margin-top: 35vh

  .mario-box
    left: calc(50% - 64px)

  .mario
    position: fixed !important
    top: calc(100% - 248px)
    left: calc(50% - 64px)

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
</style>
