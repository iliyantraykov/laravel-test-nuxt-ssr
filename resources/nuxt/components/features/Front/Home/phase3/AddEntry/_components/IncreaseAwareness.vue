<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');
    import SkIcon from "@/components/Icons/Icon.vue";

    @Component({
        components: {
          SkIcon,
        },
    })
    export default class IncreaseAwareness extends Vue {
        constructor() {
            super();
        }

        backToTop() {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
    }
</script>

<template>
  <div class="landing-page__add-entry__right">

    <h6 class="h6__grey-header">Bekanntheitsgrad steigern</h6>

    <p class="font-weight-bold">Mach deine Location oder Eventdienstleistung in der Eventwelt bekannt</p>

    <ul class="landing-page__add-entry__right__list">
      <li>
        <router-link :to="{path:'/site/extern/werbemoeglichkeiten_werbeformate.html#anbieter'}">
          <sk-icon :type="'award'"></sk-icon>
          <span class="landing-page__add-entry__right__list__text">
            <span class="landing-page__add-entry__right__list__text__inner">Nummer 1</span>
            <br>
            <span class="landing-page__add-entry__right__list__text__inner">Platzierung</span>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/site/extern/werbemoeglichkeiten_mailing.html'}">
          <sk-icon :type="'paperplane'"></sk-icon>
          <span class="landing-page__add-entry__right__list__text">
            <span class="landing-page__add-entry__right__list__text__inner">Event-</span>
            <br>
            <span class="landing-page__add-entry__right__list__text__inner">magazin</span>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/site/extern/werbemoeglichkeiten_werbeformate.html#interregio'}">
          <sk-icon :type="'stars'"></sk-icon>
          <span class="landing-page__add-entry__right__list__text">
            <span class="landing-page__add-entry__right__list__text__inner">Location</span>
            <br>
            <span class="landing-page__add-entry__right__list__text__inner">Boost</span>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/site/extern/werbemoeglichkeiten_werbeformate.html#priority'}">
          <sk-icon :type="'imac_click'"></sk-icon>
          <span class="landing-page__add-entry__right__list__text">
            <span class="landing-page__add-entry__right__list__text__inner">Location</span>
            <br>
            <span class="landing-page__add-entry__right__list__text__inner">der Woche</span>
          </span>
        </router-link>
      </li>
    </ul>

    <div class="landing-page__add-entry__right__buttons">

      <router-link :to="{path:'/site/extern/werbemoeglichkeiten_werbeformate.html'}" class="btn btn--link">
        <span class="btn__icon btn__icon--solid">
          <sk-icon :type="'arrow_right'"></sk-icon>
        </span>
        <span class="btn--link__text">Alle Werbemöglichkeiten</span>
      </router-link>

      <a href=""
         @click.prevent="backToTop"
         class="landing-page__add-entry__back-to-top">
        <sk-icon type="arrow_right"></sk-icon>
      </a>
    </div>


  </div>
</template>
