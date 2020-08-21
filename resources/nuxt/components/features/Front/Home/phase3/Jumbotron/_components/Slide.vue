<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import SlideLink from "@/components/Slider/SlideLink.vue";
    import SkIcon from "@/components/Icons/Icon.vue";
    import { getIESrc } from '@/utils/ie_src'
    const { State } = namespace('Root');

    @Component({
        components: {
            SlideLink,
            SkIcon
        },
    })
    export default class Slide extends Vue {
        @Prop() item;

        ie_src: string = "";

        constructor() {
            super();
        }

        beforeMount(){
            this.ie_src = getIESrc(this.item.image.srcset,1920);
        }
    }
</script>

<template>
  <div class="tiny-slider__slide">
    <div class="tiny-slider__slide__inner">

      <div class="tiny-slider__slide__background">
        <div class="tiny-slider__slide__background-inner">
          <img class="img-fluid tns-lazy-img"
               :src="item.image.base64"
               :data-src="ie_src"
               :data-srcset="item.image.srcset"
               :alt="item.name">
        </div>
      </div>

      <div class="container">
        <div class="col-12 text-right">
          <slide-link :item="item" class="landing-page__jumbotron__link btn btn--link">
            <span class="btn__icon btn__icon--outline">
              <sk-icon :type="'pin'"></sk-icon>
            </span>
            {{item.name}}
          </slide-link>
        </div>
      </div>

    </div>
  </div>
</template>
