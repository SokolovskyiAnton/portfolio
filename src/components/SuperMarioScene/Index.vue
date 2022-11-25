<template>
  <section class="scene-mario" ref="marioScene">
    <div class="container">
      <p>hello</p>
      <SuperMario :state="''" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import SuperMario from "@/components/SuperMarioScene/SuperMario.vue";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { onBeforeUnmount, onMounted, ref } from "vue";

const { observeElement } = useIntersectionObserver;
const marioScene = ref<HTMLElement | null>(null);
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
  }
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
</style>
