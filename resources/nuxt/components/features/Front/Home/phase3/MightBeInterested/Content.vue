<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');

    @Component({
        components: {
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
      <div class="col-12 col-xl-3">
        <h4>Das könnte dich ebenfalls interessieren:</h4>
      </div>
      <div class="col-12 col-xl-9">
        <div class="landing-page__link-bar__buttons">
          <router-link :to="{path: '/site/_redaktionell/52/eventmagazin.html?suche_tag1=Swiss%20Location%20Award'}" class="btn btn--white--outline btn--sm">Swiss Location Award</router-link>
          <router-link :to="{path: '/guest/entries/create'}" class="btn btn--white--outline btn--sm">Eventwebsite erstellen</router-link>
          <router-link :to="{path: '/site/_redaktionell/51/Eventjobs.html'}" class="btn btn--white--outline btn--sm">Neuste Eventjobs</router-link>
          <router-link :to="{path: '/site/extern/werbemoeglichkeiten_werbeformate.html'}" class="btn btn--white--outline btn--sm">Werbemöglichkeiten</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
