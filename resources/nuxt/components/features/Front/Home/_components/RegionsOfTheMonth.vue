<script lang="ts">
  import { Component, Emit, Vue } from 'nuxt-property-decorator';
  import GridDisplay from './partials/GridDisplay.vue';
  import { namespace } from 'vuex-class';
  const { State } = namespace('Root');

  @Component({
    components: {
      GridDisplay
    },
  })
  export default class RegionsOfTheMonth extends Vue {
    @State('activeCategory') activeCategory;

    loaded: boolean;
    fetchUri: string;
    regions: any;
    tableData: any;

    constructor() {
      super();
      this.fetchUri = '/guest/homepage/box/fetch';
      this.regions =  [0,0,0,0,0,0];
      this.tableData = {
        category: this.activeCategory,
        type: 4,
      };
      this.loaded = false;
    }

    async mounted() {
      await this.fetchData();
      this.$nextTick(() => {
        // Code that will run only after the
        // entire view has been rendered
        this.fully_loaded();
      })
    }

    @Emit('loaded')
    fully_loaded(): void {
    }

    async fetchData(): Promise<void> {
      this.fetchUri = 'guest/homepage/box/fetch';
      let response;
      try {
        this.tableData.category = this.activeCategory;
        response = await this.$axios.$post(this.fetchUri, this.tableData);
      } catch (e) {
      }

      this.loaded = true;
      const { status, data } = response;
      switch (status) {
        case 200: {
          if (data.errors) {
            return;
          }
          this.regions = response.data;
          break;
        }
        case 401: {
          this.$router.push('/');
          return;
        }
        default: {
          return;
        }
      }
    }

  }
</script>

<template>
    <div>
        <section class="overview">
            <div class="container">
                <div class="overviewhead">
                    <h2>Event Regionen des Monats</h2>
                    Diese sechs Event Regionen solltest du für deinen nächsten Anlass unbedingt auf deinem Radar haben:                </div>

                <grid-display :items="regions"
                              :type="'region'">
                </grid-display>

                <div class="overviewhead">
                    <router-link class="more" to="/site/_redaktionell/85/Die_schoensten_Eventlocations_der_Schweiz.html" title="Alle Event Regionen ansehen">Alle Event Regionen ansehen</router-link>
                </div>

                <div class="clearer"></div>
            </div>
        </section>
    </div>
</template>