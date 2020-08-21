<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import Slider from "@/components/Slider/Slider.vue";
    import Slide from "./_components/Slide.vue";
    const { State } = namespace('Root');
    import SkIcon from '@/components/Icons/Icon.vue';
    import Placeholder from './Placeholder.vue';

    @Component({
        components: {
          Placeholder,
          Slider,
          Slide,
          SkIcon
        },
    })
    export default class Content extends Vue {
        @Prop() magazines;
        @Prop({type:Boolean,default:false}) loaded;

        responsive_options: object = {};

        constructor() {
            super();
            this.responsive_options = {
              568: {
                items: 2,
                slideBy: 2,
                fixedWidth: false,
              }
            }
        }
    }
</script>

<template>

  <div v-if="loaded" class="container">
    <div class="row">
      <div class="col-12">

        <slider :items="1"
                :slide-by="1"
                :fixed-width="224"
                :lazyload-offset="1"
                more_link_text="Eventmagazin ansehen"
                more_link="/magazines"
                :responsive-options="responsive_options">
          <template v-slot:slider-header>

            <h3 class="tiny-slider__title">Die neusten Geschichten aus unserem Eventmagazin</h3>

          </template>

          <template  v-slot:slide>
            <slide v-for="story in magazines" :key="story.id" :story="story" :sl-per-row="2"></slide>
          </template>

        </slider>

      </div>
    </div>
  </div>

  <placeholder v-else></placeholder>

</template>
