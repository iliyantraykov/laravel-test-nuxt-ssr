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
  export default class NewsOfTheMonthPlaceholder extends Vue {

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
                    <h2>Eventmagazin: News, Trends & Stories aus der Eventwelt</h2>
                </div>
                <placeholder-grid :news="1"></placeholder-grid>
                <div class="overviewhead">
                    <span class="more"></span>
                </div>
                <div class="clearer">
                </div>
            </div>
        </section>
    </div>
</template>
