<script lang="ts">
  import { Component, Emit, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  const { State } = namespace('Root');
  import PlaceholderGrid from './PlaceholderGrid.vue';

  @Component({
    components: {
      PlaceholderGrid
    },
  })
  export default class RegionsOfTheMonthPlaceholder extends Vue {

    constructor() {
      super();
    }
  }
</script>

<template>
    <div>
        <section class="overview placeholder">
            <div class="container">
                <div class="overviewhead">
                    <h2>Event Regionen des Monats</h2>
                    Diese sechs Event Regionen solltest du für deinen nächsten Anlass unbedingt auf deinem Radar haben:
                </div>
                <placeholder-grid></placeholder-grid>
                <div class="overviewhead">
                    <span class="more"></span>
                </div>
                <div class="clearer">
                </div>
            </div>
        </section>
    </div>
</template>

