<script lang="ts">
    import {Component, Prop, Vue} from 'nuxt-property-decorator';
    import {namespace} from 'vuex-class';
    import SkIcon from "@/components/Icons/Icon.vue";
    import SlideLink from "@/components/Slider/SlideLink.vue";
    import {getIESrc} from "@/utils/ie_src";

    const { State } = namespace('Root');

    @Component({
        components: {
          SkIcon,
          SlideLink
        },
    })
    export default class Slide extends Vue {
        @Prop() deal;
        @Prop({type:Number,default:3}) slPerRow;

        ie_src: string = "";

        constructor() {
            super();
        }

        beforeMount(){
            this.ie_src = getIESrc(this.deal.image.srcset,960);
        }
    }
</script>

<template>
  <div class="el-card el-card--type-2">
    <slide-link :item="deal" class="tiny-slider__link">
      <div :class="['el-card__image','el-card__image--'+slPerRow+'-items']">
        <div class="el-card__image__inner">
          <img class="img-fluid tns-lazy-img"
               :alt="deal.name"
               :src="deal.image.base64"
               :data-src="ie_src"
               :data-srcset="deal.image.srcset"
               sizes="(min-width: 1200px) 500px,
                          (min-width: 992px) 480px,
                          (min-width: 768px) 360px,
                           240px">
        </div>
      </div>
      <div class="el-card__description">
        <div class="el-card__category">
          <p class="el-card__category-text">Eventide</p>
        </div>
        <div class="el-card__title">
          <h3 class="el-card__title-text">
            {{deal.name}}
          </h3>
          <button class="btn btn--icon btn--xsm el-card__next-btn" role="button">
            <sk-icon :type="'arrow_right'"></sk-icon>
          </button>
        </div>
        <div class="el-card__subtitle">
          <p class="el-card__subtitle-text">
            {{deal.text_underline}}
          </p>
        </div>
      </div>
    </slide-link>
  </div>
</template>
