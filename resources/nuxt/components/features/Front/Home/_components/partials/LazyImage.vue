<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import VueLazyload from 'vue-lazyload';
  import { isBot } from '@/utils/userAgentCheck';
  declare const baseMetaUrl;

  @Component({
    components: {
    }
  })
  export default class LazyImage extends Vue {
    @Prop() slider;
    @Prop() src;
    @Prop() alt;
    @Prop() image_style;
    @Prop() data_original;

    googlebot: boolean;
    loaded: boolean;

    constructor() {
      super();
        Vue.use(VueLazyload, {
            preLoad: 1.9,
            attempt: 1,
            // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
            listenEvents: [ 'scroll','click' ],
            observer: true,
            observerOptions: {
              rootMargin: '0px',
              threshold: 0
            },
            adapter : {
                loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
                    el.parentNode.classList.remove('lazy-not-loaded');
                },
                loading (listender, Init) {

                },
            }
        });
      this.googlebot = false;
      this.loaded = false;
    }

    mounted() {

    }

    async beforeMount() {
        this.googlebot = isBot();
        this.loaded = true;
    }
  }
</script>

<template >
  <div class="">
    <img v-if="googlebot"
         :src="src"
         :alt="alt"
         :data-original="data_original"
         :style="image_style">
    <img v-else-if="slider"
         :data-lazy-new="src"
         :alt="alt"
         :data-original="data_original"
         :style="image_style">
    <img v-else
         v-lazy="src"
         :alt="alt"
         :data-original="data_original"
         :style="image_style">
  </div>
</template>
