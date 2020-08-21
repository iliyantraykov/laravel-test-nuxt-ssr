<script lang="ts">
  import { Component, Emit, Vue } from 'nuxt-property-decorator';
  import GridDisplay from './partials/GridDisplay.vue';
  import { namespace } from 'vuex-class';
  import LazyImage from "@/features/Front/Home/_components/partials/LazyImage.vue";
  const { State } = namespace('Root');
  import { formatDateSimple } from '@/utils/date';

  @Component({
    components: {
      GridDisplay,
      LazyImage
    },
    filters: {
      formatDate: formatDateSimple
    }
  })
  export default class NewsOfTheMonth extends Vue {
    @State('activeCategory') activeCategory;

    jobsLoaded: boolean;
    hoveredBox: boolean;
    fetchUri: string;
    magazines: any;
    jobs: any;
    tableData: any;

    constructor() {
      super();
      this.fetchUri = '/guest/homepage/box/fetch';
      this.magazines = [0,0,0,0,0];
      this.jobs = [];
      this.tableData = {
        category: this.activeCategory,
        type: 3,
      };
      this.jobsLoaded = false;
      this.hoveredBox = true;
    }

    async mounted() {
      this.fetchData();
      this.fetchJobs();
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

      const { status, data } = response;
      switch (status) {
        case 200: {
          if (data.errors) {
            return;
          }
          this.magazines = response.data;
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

    async fetchJobs(): Promise<void> {
      this.fetchUri = 'guest/homepage/box/jobs';
      let response;
      try {
        this.tableData.category = this.activeCategory;
        response = await this.$axios.$get(this.fetchUri);
      } catch (e) {
      }

      const { status, data } = response;
      switch (status) {
        case 200: {
          if (data.errors) {
            return;
          }
          this.jobs = response.data;
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
      this.jobsLoaded = true;
    }

  }
</script>

<template>
    <div>
        <section class="overview" style="background-color: #e6e6e6;">
            <div class="container">
                <div class="overviewhead">
                    <h3>Eventmagazin: News, Trends &amp; Stories aus der Eventwelt</h3>
                </div>

                <template>
                    <grid-display :items="magazines"
                                  :type="'magazine'">
                    </grid-display>
                </template>
                <div :class="hoveredBox ? 'entry wide eventjobs' : 'entry wide eventjobs hover-image'"
                     @mouseleave="hoveredBox = true"
                     @mouseover="hoveredBox = false">
                    <router-link  :to="{
                                       name: 'event.jobs'
                                     }"
                                  class="image"
                                  title="Eventjobs">
                        <u>
                            <i>
                                <lazy-image
                                  :src="'images/home/eventjobs.jpg'"
                                  :alt="'Eventjobs'"
                                  :data_original="'images/layout/eventjobs.jpg'"
                                  :image_style="'display: inline;'">
                                </lazy-image>
                            </i>
                        </u>
                        <b :class="hoveredBox ? '' : 'hover-button'">mehr Eventjobs</b>
                    </router-link>
                    <div class="text">
                        <b>Eventjobs</b>
                        <template v-if="jobsLoaded">
                            <div v-for="job in jobs">
                                <router-link :key="job.id"
                                             :to="{
                                           name: 'event.jobs.detail',
                                           params: { jobId: job.id, jobSlug : (job.slug ? job.slug : job.legacy_slug) }
                                         }"
                                             :title="job.short">
                                    {{ job.publish_date | formatDate('dd.MM.yy') }} {{ job.short }}
                                </router-link><br>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="overviewhead">
                    <router-link class="more" to="/site/_redaktionell/52/eventmagazin.html" title="Alle Themen im Überblick">Alle Themen im Überblick</router-link>
                </div>

                <div class="clearer"></div>
            </div>
        </section>
    </div>
</template>
