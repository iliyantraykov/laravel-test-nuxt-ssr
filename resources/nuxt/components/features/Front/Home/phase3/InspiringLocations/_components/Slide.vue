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
        @Prop() location;

        ie_src: string = "";

        constructor() {
            super();
        }

        beforeMount(){
            this.ie_src = getIESrc(this.location.image.srcset,1920);
        }
    }
</script>

<template>
    <div class="tiny-slider__slide">
      <slide-link :item="location" class="tiny-slider__link">
        <div class="tiny-slider__slide__inner">
          <div class="tiny-slider__slide__background">
            <div class="tiny-slider__slide__background-inner">
              <img class="img-fluid tns-lazy-img"
                   :alt="location.name"
                   :src="location.image.base64"
                   :data-src="ie_src"
                   :data-srcset="location.image.srcset"
                   sizes="(min-width: 1200px) 1200px,
                      (min-width: 992px) 992px,
                       768px">
            </div>
          </div>
          <div class="tiny-slider__slide__content">
            <h2 class="tiny-slider__slide__title">{{ location.name }}</h2>
            <p class="tiny-slider__slide__description">{{ location.short }}</p>
            <slide-link :item="location" class="tiny-slider__link">
              <span class="btn btn--primary btn--sm" aria-label="Mehr erfahren">Mehr erfahren</span>
            </slide-link>
          </div>
        </div>
      </slide-link>
    </div>
</template>
