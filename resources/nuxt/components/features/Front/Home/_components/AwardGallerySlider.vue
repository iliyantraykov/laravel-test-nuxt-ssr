<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import getPhotoPath from '@/utils/imageProcessing';
  import LazyImage from "@/features/Front/Home/_components/partials/LazyImage.vue";
  import SliderPlaceholder from '../../../../features/Front/Home/_components/partials/placeholders/SliderPlaceholder.vue';
  import EventBus from '@/utils/event-bus';

  @Component({
    components: {
      LazyImage,
      SliderPlaceholder
    },
  })
  export default class AwardGallerySlider extends Vue {

    loaded: boolean;
    items: any;
    fetchUri: string;


    constructor() {
      super();
      this.items = [];
      this.fetchUri = '/guest/homepage/slider/fetch';
      this.loaded = false;
    }

    async mounted() {
      await this.fetchData();
    }

    async fetchData(): Promise<void> {
      try {
        this.$axios.$get(this.fetchUri)
          .then((response) => {
            this.items = response.data;
            this.loaded = true;
          });
      } catch (e) {
      }
    }

    getFirstPhoto(item) {
      if ((item.image && item.image.length) || (item.photos && item.photos.length)) {
        let image = (item.image && item.image.length) ? item.image[0] : item.photos[0];
        return getPhotoPath(image.id + ',' + image.name + ',' + image.mime_type);
      } else {
        return "images/pre.png";
      }
    }

    getLink(item){
      if(item.providers && item.providers.length > 0){
        let props = this.$router.resolve({
                      name: 'single.provider.display',
                      params: { categoryId: item.link.category_id, categorySlug: item.link.category_slug, providerId: item.link.provider_id, providerSlug: (item.link.slug ? (item.link.slug+'.html') : item.link.legacy_slug)}
                    });
        return props.href;
      }else if(item.locations && item.locations.length > 0){
        let props = this.$router.resolve({
                      name: 'single.location.display',
                      params: { categoryId: item.link.category_id, categorySlug: item.link.category_slug, locationId: item.link.location_id, locationSlug: (item.link.slug ? (item.link.slug+'.html') : item.link.legacy_slug) }
                    });
        return props.href;
      }else if(item.external_link){
        if(item.external_link.indexOf('http') > 0){
          return item.external_link;
        }else{
          return 'https://'+item.external_link;
        }

      }else if(item.magazines && item.magazines.length > 0){
        let props = this.$router.resolve({
                      name: 'magazin.detail',
                      params: { magazinId: item.link.id, magazinSlug: (item.link.slug ? (item.link.slug+'.html') : item.link.legacy_slug) }
                    });
        return props.href;
      }
    }

    toExternalLink(link) {
      window.location.href = link;
    }
  }
</script>

<template>
  <div>

    <div class="slider award-gallery-slider" v-if="loaded">
      <div class="sliderbox">
        <div ref="carousel">
          <div v-for="(item, index) in items" :key="index" :index="index">
          <div v-for="(item, index) in items" :key="index" :index="index">
            <div class="location">
              <a class="image"
                 :href="getLink(item)"
                 target="_blank"
                 :title="item.name">
                <u>
                  <i><div>
                    <lazy-image
                      :src="getFirstPhoto(item)"
                      :alt="item.name">
                    </lazy-image>
                  </div></i>
                </u>
              </a>
              <a class="text"
                 :href="getLink(item)"
                 target="_blank"
                 :title="item.name">
                <b>{{ item.name }}</b>
                {{ item.text_underline }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div> <!-- .slider -->

    <slider-placeholder :sliderClass="'award-gallery-slider'" v-else></slider-placeholder>

  </div>


</template>
