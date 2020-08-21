<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import { StayTuned } from './_components';
    const { State } = namespace('Root');

    @Component({
        components: {
            StayTuned
        },
    })
    export default class Content extends Vue {
        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="container">
    <div class="row">

      <div class="col-xl-4 order-xl-2 offset-xl-0 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <stay-tuned></stay-tuned>
      </div>

      <div class="col-xl-6 order-xl-1 offset-xl-1 col-lg-8 offset-lg-2 col-md-10 offset-md-1">
        <h3 class="landing-page__about__title">Über Eventlokale</h3>
        <p class="landing-page__about__subtitle">Über uns gibt es einiges zu erzählen, doch noch lieber reden wir mit dir und darüber, was wir gemeinsam erreichen können.</p>
        <div class="landing-page__about__columns">
          <div class="landing-page__about__columns__single">
            <p>Bei Fragen sind wir gerne für dich da</p>
            <router-link class="btn btn--link btn--link--pink-bg" :to="{path: '/site/extern/about_us.html#kontakt'}">Zum Kontakt</router-link>
          </div>
          <div class="landing-page__about__columns__single">
            <p>Als Team bringen wir dein Angebot gross heraus.</p>
            <router-link class="btn btn--link btn--link--pink-bg" :to="{path: '/site/extern/about_us.html#team'}">Zum Team</router-link>
          </div>
          <div class="landing-page__about__columns__single">
            <p>Was bringt mir ein Eintrag auf eventlokale?</p>
            <router-link class="btn btn--link btn--link--pink-bg" :to="{path: '/site/extern/werbemoeglichkeiten_werbeformate.html'}">Vorteile kennenlernen</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
