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
  export default class LocationsOfTheMonthPlaceholder extends Vue {

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
                    <h2>Locations des Monats</h2>
        Diese sechs Hotels, Restaurants und Locations bieten den perfekten Rahmen für deinen nächsten Event:
                </div>
                <placeholder-grid></placeholder-grid>
                <div class="overviewhead bottom">
                    <span class="more"></span>
                </div>
                <div class="clearer">
                </div>
            </div>
        </section>
    </div>
</template>
