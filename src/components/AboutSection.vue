<template>
  <div class="pic" />
  <div class="static-container">
    <h1 class="title">about(<span class="func">sokolovskyi</span>)</h1>

    <TextBlock>
      <div class="first-fold">
        <ul class="about-contact">
          <li v-for="link in links" :key="link.url">
            <a :href="link.url" :title="link.title" target="_blank">
              <component :is="link.icon" />
            </a>
          </li>
          <li>
            Download my
            <a
              href="./anton.sokolovskyi.cv.pdf"
              title="Download CV"
              target="_blank"
              class="bt"
            >
              CV
              <CVIcon />
            </a>
          </li>
        </ul>
        <p class="-purple">
          Frontend engineer from Ukraine loving to build interfaces, writing
          good code and learning new technologies.
        </p>
        <p class="-gray">// Frontend developer @ Ficus technologies</p>
      </div>
      <div class="about-grid">
        <h2>Main skills</h2>
        <div class="columns">
          <ul class="about-list">
            <li class="about-list__item" v-for="(skill, i) in skills" :key="i">
              {{ skill.join(", ") }}<br />
            </li>
          </ul>
        </div>

        <h2>Experience</h2>
        <div class="columns">
          <ul class="about-list">
            <li
              class="about-list__item"
              v-for="(experience, i) in experiences"
              :key="i"
            >
              <strong class="-purple">{{ experience.position }}</strong>
              <br />
              @ {{ experience.company }}<br />
              {{ experience.time || null }}
            </li>
          </ul>
        </div>

        <h2>Languages</h2>
        <div class="columns">
          <ul class="about-list">
            <li
              class="about-list__item"
              v-for="(lang, level) in languages"
              :key="level"
            >
              <span class="-comment">// {{ level }}</span
              ><br />
              <span v-for="[locale, label] in lang" :key="locale">
                <em class="-purple">
                  {{ locale }}
                </em>
                {{ label }}<br
              /></span>
            </li>
          </ul>
        </div>

        <h2>Hobbies</h2>
        <div class="columns">
          <ul class="about-list">
            <li class="about-list__item" v-for="(hobby, i) in hobbies" :key="i">
              {{ hobby }}<br />
            </li>
          </ul>
        </div>
      </div>
    </TextBlock>
  </div>
</template>

<script lang="ts" setup>
import TextBlock from "@/components/TextBlock";
import CVIcon from "@/components/Icons/CVIcon.vue";
import { useLinks } from "@/hooks/useLinks";

const links = useLinks();
const skills = [
  ["Responsibility", "Strategic thinking", "Mentoring"],
  ["Frontend", "Basic backend"],
  [
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Canvas",
    "Vue",
    "React",
    "Angular",
    "Nuxt",
    "MongoDB",
    "Nest",
    "Git",
    "Docker",
  ],
  ["Figma", "Basic photoshop"],
];
const experiences = [
  {
    position: "Frontend Engineer",
    company: "Ficus technologies",
    time: "2021 - * current",
  },
  {
    position: "Freelancer",
    company: "Upwork",
    time: "2018 - 2021",
  },
];
const languages = {
  fluent: [
    ["ru-RU", "Russian"],
    ["uk-UA", "Ukrainian"],
  ],
  intermediate: [
    ["en-GB", "English"],
    ["pl-PL", "Polish"],
  ],
};
const hobbies = ["Chess", "Football", "Guitar", "History"];
</script>

<style lang="stylus" scoped>
.pic
  pointer-events none
  display block
  position fixed
  z-index 9999
  top 50%
  left -12vw
  transform translate3d(0, -50%, 0)
  width 43vw
  aspect-ratio 1/1
  border-radius 100%
  //background-image url(../assets/me.jpg)
  background-color wheat
  background-repeat no-repeat
  background-position center
  background-size contain
  filter grayscale(1) brightness(1)
  mix-blend-mode difference

  @media screen and (max-width 1024px)
    top: -12vh
    left: 50%
    transform: translate3d(-50%, 0, 0) rotate(90deg)
    width: 70vw
.about-contact
  display flex
  align-items center
  list-style none
  margin 2rem 0
  li
    display flex
    align-items center
    flex 0 0 auto
    list-style none
    margin 0 1rem 0 0
    color var(--text-color-gray)
    a
      flex 0 0 auto
      display flex
      align-items center
      text-decoration none
      &.bt
        background var(--text-color-purple)
        color var(--bg)
        padding 0 1rem
        height 2rem
        border-radius 3rem
        margin-left 1rem
        line-height 2rem

        .ico
          margin-left 0.5rem
          height 14px
          width 14px

        &:hover
          background var(--text-color-light)
      .ico
        flex 0 0 auto
        overflow visible
        width 1.5rem
        height 1.5rem
        stroke var(--bg)
        fill var(--text-color-purple)
        stroke-width 2px
        transition all 400ms ease-out
      &:hover
        .ico
          fill var(--text-color-light)
.about-grid
  padding 3rem 2rem 0 0
  margin-right -25vw
  width 75vw

  h2
    font-size 1.2rem
    margin-bottom 1rem

  .columns
    margin-bottom 2rem

  .about-list
    display grid
    grid-template 1fr \/  repeat(4, 1fr)
    grid-column-gap 2rem
    grid-row-gap 1rem

  .about-list__item
    list-style none
    margin 0
    font-size 1rem
    line-height 1.5em
    color var(--text-color-gray)

  .tools
    display grid
    grid-template 1fr \/ repeat(4, 1fr)
    grid-column-gap 2rem
    grid-row-gap 1rem

    ul
      display block

  @media screen and (max-width 1024px)
    padding 3rem 1rem 0 0
    margin 0
    width calc(100vw - 4rem)

  @media screen and (max-width 768px)
    .about-list
      grid-template 1fr \/ repeat(3, 1fr)

    .tools
      grid-template 1fr \/ repeat(3, 1fr)

      ul
        display block

  @media screen and (max-width 568px)
    .about-list
      grid-template 1fr \/ 1fr
      grid-gap 1rem

    .tools
      grid-template 1fr \/ 1fr
      grid-gap 1rem

      ul
        display block
</style>
