<template>
  <header id="header">
    <div class="header-bg" />
    <div class="header-container">
      <div class="header-breadcrumb">{{ $route.name }}</div>

      <button
        title="Open menu"
        type="button"
        class="header-nav-button"
        @click="openMenu"
      >
        <span class="label">Menu</span>

        <span class="dots"></span>
        <span class="dots"></span>
        <span class="dots"></span>
      </button>

      <nav class="header-nav">
        <button
          title="Close menu"
          type="button"
          class="header-nav-close-button"
          @click="closeMenu"
        >
          <span class="label">✕</span>
        </button>
        <ul>
          <li>
            <router-link :to="{ name: '.is()' }" title="Home">
              .is()
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: '.about()' }" title="About me">
              .about()
            </router-link>
          </li>
          <li v-for="link in links" :key="link.url" class="social-link">
            <a :href="link.url" :title="link.title" target="_blank">
              <component :is="link.icon" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useLinks } from "@/hooks/useLinks";

const links = useLinks();

function openMenu(): void {
  document.body.classList.add("is-nav-open");
}
function closeMenu(): void {
  document.body.classList.remove("is-nav-open");
}
</script>

<style lang="stylus">
#header
  position fixed
  top 0
  left 0
  z-index 10
  width 100%
  height var(--header-height)
  padding 0 1rem 5rem

.header-container
  display flex
  align-items center
  justify-content space-between
  height 3rem
  max-width 80rem
  margin 0 auto

.header-breadcrumb
  font-size 1.2rem
  font-weight 700
  color var(--text-color-purple)

.header-nav-button
  flex 0 0 auto
  width 3rem
  height 3rem
  display none
  flex-flow column nowrap
  align-items center
  justify-content space-between
  padding 0.8rem
  margin-right -1rem // align with viewport
  background none
  border 0

  @media screen and (max-width 768px)
    display flex
    transition all 1s linear


  .label
    display none

  .dots
    flex 0 0 auto
    position relative
    width 0.25rem
    height 0.25rem
    border-radius 0.25rem
    background var(--header-link)
    transition all 400ms cubic-bezier(0.19, 1, 0.22, 1)

.header-nav-close-button
  position absolute
  top 0
  right 0
  width 3rem
  height 3rem
  display none
  align-items center
  justify-content center
  padding 0
  margin 0
  background none
  border 0
  color var(--text-color-purple)
  font-size 2rem

  &:hover
    color var(--header-link)

  @media screen and (max-width 768px)
    display flex

.header-nav
  display flex
  align-items center

  @media screen and (max-width 768px)
    align-items flex-end
    justify-content flex-end
    position absolute
    top 0
    right 0
    z-index 9999
    width 100vw
    height 100vh
    padding 8rem 1rem 4rem
    text-align right
    transform translate3d(110%, 0, 0)

  ul
    display flex
    align-items center
    list-style none

    @media screen and (max-width: 768px)
      display block
  li
    margin-left 1rem
    list-style none

    @media screen and (max-width: 768px)
      margin 0 0 2rem

      &.social-link
        display inline-block
        margin 0 0 0 2rem
  a
    height 2rem
    display flex
    align-items center
    color var(--header-link)
    transition color 400ms ease-out
    line-height 1

    &:hover
      color var(--header-link-hover)

      svg
        fill var(--header-link-hover-icon)

    &.router-link-exact-active
      opacity 0.5
      cursor default

    @media screen and (max-width: 768px)
      height auto
      justify-content flex-end
      font-size 3rem
      font-weight 700

      &:hover
        color var(--header-link-hover)

        svg
          fill var(--header-link-hover-icon)

      &.router-link-exact-active
        opacity 0.5
        cursor default

//icons
svg
  display block
  width 1.2rem
  height 1.2rem
  fill var(--text-color-purple)
  position relative
  top 2px
  transition fill 400ms ease-out

  @media screen and (max-width: 768px)
    width 3rem
    height 3rem
    top 0


  @media screen and (max-width: 568px)
    width 2rem
    height 2rem
    top 0

// background
.header-bg
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  z-index -1
  background: linear-gradient(
    to bottom,
    var(--bg) 3rem,
    rgba(14, 18, 18, 0) 100%
  )


@media screen and (max-width: 768px)
  body.is-nav-open
    .wrapper
      opacity 0.1 !important

    .header-nav-button
      opacity 0

    .header-nav
      transition transform 1s cubic-bezier(0.86, 0, 0.07, 1)
      transform translate3d(0, 0, 0)
</style>
