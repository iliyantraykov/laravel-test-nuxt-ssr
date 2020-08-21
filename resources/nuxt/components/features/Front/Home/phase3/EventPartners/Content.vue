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
        @Prop() providers;
        @Prop({type:Boolean,default:false}) loaded;

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="container" v-if="loaded">
    <div class="row">
      <div class="col-12">

        <slider :items="1"
                more_link_text="Eventpartner finden"
                more_link="/provider"
                mode="gallery"
                :autoplay="true"
                :autoplay-timeout="10000"
                :gutter="0">
          <template  v-slot:slider-header>
            <h3 class="tiny-slider__title">Erfahrene Eventpartner</h3>
          </template>
          <template  v-slot:slide>
            <slide v-for="provider in providers" :key="provider.id" :provider="provider"></slide>
          </template>
        </slider>

      </div>
    </div>
  </div>

  <placeholder v-else></placeholder>
</template>
