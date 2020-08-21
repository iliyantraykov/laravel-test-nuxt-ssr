<script lang="ts">
    import { Component, Emit, Vue, Prop } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');
    import Slide from "./_components/Slide.vue";
    import Slider from "@/components/Slider/Slider.vue";
    import Placeholder from './Placeholder.vue';

    @Component({
        components: {
            Slider,
            Slide,
            Placeholder
        },
    })
    export default class Content extends Vue {
        @Prop() locations;
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
                more_link_text="Location finden"
                more_link="/locations"
                mode="gallery"
                :autoplay="false"
                :autoplay-timeout="10000"
                :gutter="0">
          <template  v-slot:slider-header>
            <h3 class="tiny-slider__title">Inspirierende Locations</h3>
          </template>
          <template  v-slot:slide>
            <slide v-for="location in locations" :key="location.id" :location="location"></slide>
          </template>
        </slider>
      </div>
    </div>
  </div>

  <placeholder v-else></placeholder>

</template>
