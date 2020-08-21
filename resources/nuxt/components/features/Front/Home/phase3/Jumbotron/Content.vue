<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import Slider from "@/components/Slider/Slider.vue";
    import VueScrollTo from 'vue-scrollto';
    import { Search, Slide } from './_components';
    import Placeholder from './Placeholder.vue';
    import SkIcon from "@/components/Icons/Icon.vue";
    const { State } = namespace('Root');

    @Component({
        components: {
            Search,
            Slider,
            Slide,
            Placeholder,
            SkIcon
        },
    })
    export default class Content extends Vue {
        @State('activeCategory') activeCategory;

        @Prop() header_items;
        @Prop() result_counts;
        @Prop({type:Boolean,default:false}) loaded;

        // picked_category : string = '';

        constructor() {
            super();
        }

        mounted() {
          // this.$refs.slider.$refs.tinySlider.slider.events.on('transitionStart',() => {
          //   //console.log(this.$refs.slider.$refs.tinySlider.slider.getInfo());
          // })
        }

        get title(){
            switch (this.activeCategory) {
                case 1: {
                    return 'Unvergessliche Events ganz einfach planen, auf dem grössten Eventportal der Schweiz';
                }
                default: {
                    return 'Unvergessliche Events ganz einfach planen';
                }
            }
        }

        scrollDown(){
            // console.log('Trying to scroll down.');
            VueScrollTo.scrollTo('.landing-page__magazine-stories', 1200, { easing: 'ease', offset: -70 } );
        }

    }
</script>

<template>
  <div v-if="loaded" class="container">

    <slider :items="1"
            :nav="false"
            :loop="true"
            :autoplay="true"
            :mouse-drag="false"
            :touch="false"
            :gutter="0"
            :speed="600"
            :autoplay-timeout="10000"
            :hover-bg-animation="false"
            :hide-header="true"
            ref="slider">
      <template  v-slot:slide>
        <slide v-for="item in header_items" :key="item.id" :item="item"></slide>
      </template>
    </slider>

    <div class="row landing-page__jumbotron__content">

      <div class="col-12">
        <h2 class="landing-page__jumbotron__title" v-html="title"></h2>
      </div>

      <div class="col-lg-4 col-md-6 col-sm-7 col-12">
        <search :result_counts="result_counts"></search>
      </div>

    </div>

    <button class="landing-page__jumbotron__scroll landing-page__jumbotron__scroll--large-screens" @click="scrollDown">
      <sk-icon type="mouse_scroll"></sk-icon>
      Mehr entdecken
    </button>

    <button class="landing-page__jumbotron__scroll landing-page__jumbotron__scroll--small-screens" @click="scrollDown">
      <sk-icon type="arrow_right"></sk-icon>
    </button>
  </div>

  <placeholder v-else></placeholder>
</template>
