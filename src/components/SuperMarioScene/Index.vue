<template>
  <section class="scene-mario" ref="marioScene">
    <div class="container">
      <div v-if="isWindowBlock && !isMarioPlay" class="play-mario-block">
        <button @click="onMarioPlay" class="play-mario">Play game</button>
      </div>
      <div v-if="isMarioPlay">
        <div class="blocks">
          <Block
            v-for="(block, i) in 3"
            :key="i"
            @jumped="onJumped"
            @foundCoin="onFoundCoin"
            @foundAllCoins="onFoundAllCoins"
          />
        </div>
        <SuperMario :state="''" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SuperMario from "@/components/SuperMarioScene/SuperMario.vue";
import Block from "@/components/SuperMarioScene/Block.vue";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { onBeforeUnmount, onMounted, ref } from "vue";

defineEmits(["jumped", "foundCoin", "foundAllCoins"]);

const { observeElement } = useIntersectionObserver;
const marioScene = ref<HTMLElement | null>(null);
const isMarioPlay = ref(false);
const isWindowBlock = ref(false);
const audioMarioStart = new Audio("/smw_princess_help.ogg");
const observer = ref<IntersectionObserver>();
const optionsOfObserver = ref({
  threshold: 1,
  rootMargin: "10px",
});

function intersectCallback(entry: IntersectionObserverEntry) {
  if (entry.isIntersecting) {
    // when mario scene is in viewport
    // block scrolling
    document.body.classList.add("is-playing-mario");
    isWindowBlock.value = true;
  }
}

function onMarioPlay() {
  audioMarioStart.play();
  isMarioPlay.value = !isMarioPlay.value;
}

function onJumped(block: HTMLElement) {
  const rect = block.getBoundingClientRect();
  const blockCenter = Math.floor(rect.x + rect.width / 2);
  const blockBottom = rect.bottom;
  console.log(rect, "rext");
  jumpMario(blockCenter, blockBottom);
}

function jumpMario(blockCenter: number, blockBottom: number) {
  const mario = document.querySelector(".mario") as HTMLElement;

  if (!mario) {
    return;
  }

  const marioRect = mario.getBoundingClientRect();
  const isJumpingLeft = marioRect.x > blockCenter;
  const marioFloor = window.innerHeight - marioRect.height;

  mario.style.transform = `translateY(-${380}px)`;
  mario.style.transition = "300ms";
  setTimeout(() => {
    mario.style.transform = `translateY(-${0}px)`;
  }, 300);

  // console.log(blockCenter, "BCENTER");
  // console.log(blockBottom, "BBOTTOM");
  // console.log(marioFloor, "MFLOOR");
  // console.log(isJumpingLeft, "ISLEFT");
  // console.log(marioRect, "MArioRECT");
}

onMounted(() => {
  // create observer for mario scene
  if (marioScene.value) {
    observer.value = observeElement(
      marioScene.value,
      intersectCallback,
      optionsOfObserver.value
    );
  }
});
onBeforeUnmount(() => {
  // disconnect from observer after changing route
  observer.value?.disconnect();
  document.body.classList.remove("is-playing-mario");
});
</script>

<style lang="stylus" scoped>
.scene-mario
  height 100vh
  .container
    padding calc(30vh - 3.5rem) 0 0
    margin 0 25vw
    min-height 100vh
    perspective 900px
    perspective-origin 50% 50vh
    @media screen and (max-width 1024px)
      margin 0 4rem 0 calc(4rem + 1px)
    @media screen and (max-width 568px)
      margin 0 2rem 0 calc(2rem + 1px)

    .play-mario-block
      font-family "SMW"
      text-align center
      padding 20px
      .play-mario
        width 100%
        max-width 200px
        height 40px
        color var(--text-color-purple)
        border-radius 5px
        cursor pointer
    .blocks
      display flex
      align-items center
      justify-content center
      gap max(2rem, 6vw)
</style>
