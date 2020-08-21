<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import Slider from "@/components/Slider/Slider.vue";
    import Slide from "./_components/Slide.vue";
    import Placeholder from './Placeholder.vue';
    const { State } = namespace('Root');

    @Component({
        components: {
            Slider,
            Slide,
            Placeholder
        },
    })
    export default class Content extends Vue {
        @Prop() jobs;
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
        <slider more_link_text="Alle Eventjobs ansehen"
                more_link="jobs"
                :items="1"
                :slide-by="1"
                :fixed-width="224"
                :lazyload-offset="1"
                :responsive-options="responsive_options">
          <template v-slot:slider-header>
            <h3 class="tiny-slider__title">Neuste Eventjobs</h3>
            <p class="tiny-slider__subtitle">Auf eventlokale.ch findest du jede Woche neue und attraktive Jobangebote aus der Eventwelt.</p>
          </template>
          <template  v-slot:slide>
            <slide v-for="job in jobs" :key="job.id" :job="job"></slide>
          </template>
        </slider>
      </div>
    </div>
  </div>

  <placeholder v-else></placeholder>
</template>
