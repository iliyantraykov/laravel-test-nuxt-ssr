<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import Slider from "@/components/Slider/Slider.vue";
    import { Slide } from './_components';
    const { State } = namespace('Root');
    import Placeholder from './Placeholder.vue';

    @Component({
        components: {
            Slider,
            Slide,
            Placeholder
        },
    })
    export default class Content extends Vue {
        @Prop() package_deals;
        @Prop({type: String, default: 'dark-bg'}) sliderBg;
        @Prop({type:Boolean,default:false}) loaded;

        offer_type: string = 'private';
        responsive_options: object = {};

        constructor() {
            super();
            this.responsive_options = {
              568: {
                items: 2,
                slideBy: 2,
                fixedWidth: false,
              },
              1440: {
                items: 3,
                slideBy: 3
              }
            }
        }

        mounted() {
          // console.log(this.sliderBg);
        }
    }
</script>

<template>
  <div class="container" v-if="loaded">
    <div class="row">
      <div class="col-12">

        <slider :key="offer_type"
                :items="1"
                :slide-by="1"
                :fixed-width="224"
                :slider-bg="sliderBg"
                :lazyload-offset="1"
                :responsive-options="responsive_options"
                custom-class="tiny-slider--package-deals">
          <template v-slot:slider-header>

            <h3 class="tiny-slider__title">
              Pauschalangebote
              <span class="badge badge-light">Neu</span>
            </h3>

            <p class="tiny-slider__subtitle">Finde  unvergessliche Events zum Fixpreis <br/>und spare bei deiner Planung viel Zeit, Geld und Nerven.</p>

            <div class="tiny-slider__tabs">
              <button @click="offer_type = 'private'"
                      :class="['tiny-slider__tab',{
                        'tiny-slider__tab--active' : offer_type === 'private',
                      }]">
                {{ $t('homepage.slider.private.label') }}
              </button>
              <button @click="offer_type = 'company'"
                      :class="['tiny-slider__tab',{
                        'tiny-slider__tab--active' : offer_type === 'company',
                      }]">
                {{ $t('homepage.slider.company.label') }}
              </button>
              <button @click="offer_type = 'public'"
                      :class="['tiny-slider__tab',{
                        'tiny-slider__tab--active' : offer_type === 'public',
                      }]">
                {{ $t('homepage.slider.public.label') }}
              </button>
            </div>

          </template>

          <template  v-slot:slide>
            <slide v-for="deal in package_deals[offer_type]" :key="deal.id" :deal="deal" :sl-per-row="3"></slide>
          </template>

        </slider>

      </div>
    </div>
  </div>

  <placeholder v-else></placeholder>
</template>
