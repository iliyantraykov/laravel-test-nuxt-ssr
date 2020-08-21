<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import { getIESrc } from '@/utils/ie_src'
    const { State } = namespace('Root');

    @Component({
        components: {
        },
    })
    export default class Slide extends Vue {
        @Prop() job;

        ie_src: string = "";

        constructor() {
            super();
        }

        beforeMount(){
            this.ie_src = getIESrc(this.job.image.srcset,960);
        }
    }
</script>

<template>
  <div class="el-card el-card--type-1">
    <router-link :key="job.id" :title="job.short" class="el-card__link"
                 :to="{ name: 'event.jobs.detail', params: { jobId: job.id, jobSlug : (job.slug ? job.slug + '.html' : job.legacy_slug) } }">
      <div class="el-card__image">
        <div class="el-card__image__inner">
          <img class="img-fluid tns-lazy-img"
               :alt="job.name"
               :src="job.image.base64"
               :data-src="ie_src"
               :data-srcset="job.image.srcset"
               sizes="(min-width: 1200px) 500px,
                          (min-width: 992px) 480px,
                          (min-width: 768px) 360px,
                            240px">
        </div>
      </div>
      <div class="el-card__description">
        <div class="el-card__category">
          <p class="el-card__category-text">{{ job.additional_data.employer }}</p>
        </div>
        <div class="el-card__title">
          <h3 class="el-card__title-text">
            {{ job.basic_data.short }}
            <span class="el-card__title-text__subtitle">
              {{ job.additional_data.employment_level !== undefined && job.additional_data.employment_level !== null ? job.additional_data.employment_level:''}}
              {{ job.additional_data.employment_level !== undefined && job.additional_data.employment_level !== null && job.additional_data.workplace !== undefined && job.additional_data.workplace !== null? " | " :'' }}
              {{ job.additional_data.workplace !== undefined && job.additional_data.workplace !== null ? job.additional_data.workplace:''}}
            </span>
          </h3>
        </div>
      </div>
    </router-link>
  </div>
</template>
