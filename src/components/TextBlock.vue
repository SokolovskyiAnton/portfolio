<template>
  <div class="text-block">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.text-block
  max-width 42rem
  line-height 1.5
  color var(--text-color-light)
  word-break break-word
  hyphens none
  font-size 1.2rem
  @media screen and (max-width: 568px)
    font-size 1rem

  h3
    margin-bottom 1rem

  p
    margin-bottom 1rem
    &:last-child
      margin-bottom 0
  .-big
    display block
    font-size 4rem
    font-weight 700
    word-spacing -0.1em
    letter-spacing -0.05em
    width 70vw
    line-height 1.2

  .-purple
    color var(--text-color-purple)

  .-gray
    color var(--text-color-gray)

  .-comment
    color var(--text-color-comment)

  .-red
    color var(--text-color-red)

  .-green
    color var(--text-color-green)

  .-full
    display block
    margin-right -25vw
    padding-right 1rem

  i
    font-style italic

  b,
  strong
    font-weight 700

  a
    color var(--text-color-light)
    text-decoration:underline
    transition all 400ms ease-out
    &:hover
      color var(--text-color-purple)

  .subtitle
    color var(--text-color-purple)
    font-size 4rem
    line-height 1
    margin 4rem -25vw 2rem 0
    padding-right 1rem
    word-spacing -1rem
    word-break break-word
    hyphens auto

  ul
    margin-bottom 1rem
    &:last-child
      margin-bottom 0

  li
    list-style-position outside
    margin 0 0 0.5rem 1rem
    &:last-child
      margin-bottom 0
</style>
