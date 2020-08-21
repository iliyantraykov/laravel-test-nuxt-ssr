<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  import SlideLink from "@/components/Slider/SlideLink.vue";
  import { getIESrc } from '@/utils/ie_src'
  const { State } = namespace('Root');

  @Component({
    components: {
      SlideLink
    },
  })
  export default class Slide extends Vue {
    @Prop() story;

    ie_src: string = "";

    constructor() {
      super();
    }

    beforeMount(){
      this.ie_src = getIESrc(this.story.image.srcset,960);
    }
  }
</script>

<template>
  <div class="el-card el-card--type-1">
    <slide-link :item="story" class="tiny-slider__link">
      <div class="el-card__image">
        <div class="el-card__image__inner">
          <img class="img-fluid tns-lazy-img"
               :alt="story.name"
               :src="story.image.base64"
               :data-src="ie_src"
               :data-srcset="story.image.srcset"
               sizes="(min-width: 1200px) 500px,
                    (min-width: 992px) 480px,
                    (min-width: 768px) 360px,
                     240px">
        </div>
      </div>
      <div class="el-card__description">
        <div class="el-card__category">
          <p class="el-card__category-text">{{ story.text_underline }}</p>
        </div>
        <div class="el-card__title">
          <h3 class="el-card__title-text">
            {{ story.name }}
          </h3>
        </div>
      </div>
    </slide-link>
  </div>
</template>
