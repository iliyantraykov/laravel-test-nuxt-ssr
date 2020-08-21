<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import Slide from "./_components/Slide.vue";
    import Slider from "@/components/Slider/Slider.vue";
    import Placeholder from './Placeholder.vue';
    const { State } = namespace('Root');

    @Component({
        components: {
            Slider,
            Slide,
            Placeholder,
        },
    })
    export default class Content extends Vue {
        @Prop() regions;
        @Prop({type:Boolean,default:false}) loaded;
        constructor() {
            super();
        }
    }
</script>

<template>

  <div v-if="loaded" class="container">
    <div class="row">
      <div class="col-12">
        <slider :items="1"
                more_link_text="Eventregionen finden"
                more_link="/site/_redaktionell/85/Die_schoensten_Eventlocations_der_Schweiz.html"
                mode="gallery"
                :autoplay="true"
                :autoplay-timeout="10000"
                :gutter="0">
          <template  v-slot:slider-header>
            <h3 class="tiny-slider__title">Eventregionen die begeistern</h3>
          </template>
          <template  v-slot:slide>
            <slide v-for="region in regions" :key="region.id" :region="region"></slide>
          </template>
        </slider>
      </div>
    </div>
  </div>

  <placeholder v-else></placeholder>

</template>
