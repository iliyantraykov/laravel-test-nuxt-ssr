<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import dialog from '@/utils/dialog';
  import LazyImage from "@/features/Front/Home/_components/partials/LazyImage.vue";
  import SubscriptionTypeLabel from '../../Locations/_components/partials/SubscriptionTypeLabel.vue';
  import SliderPlaceholder from '@/features/Front/Home/_components/partials/placeholders/SliderPlaceholder.vue';
  import FavoriteButton from '../../Locations/_components/partials/FavoriteButton.vue';
  import { namespace } from 'vuex-class';
  import { find } from 'lodash';
  const { State } = namespace('Root');
  declare const baseDomains;
  import getPhotoPath from "@/utils/imageProcessing";

  @Component({
    components: {
      LazyImage,
      SubscriptionTypeLabel,
      FavoriteButton,
      SliderPlaceholder
    },
  })
  export default class PremiumGallerySlider extends Vue {
    @Prop() taxonomies!: TaxonomyMap;
    @State('activeCategory') activeCategory;

    loaded: boolean;
    fetchUri: string;
    items: PremiumSummaryData[];
    tableData: any;
    services: Array<Taxonomy>;


    constructor() {
      super();
      this.fetchUri = '/guest/location/premium';
      this.items = [];
      this.services = [];
      this.tableData = {
        category: this.activeCategory,
      };
      this.loaded = false;
    }

    async mounted() {
      this.fetchData();
      this.fetchTaxonomies();
    }

    fetchTaxonomies(){
      this.services = this.taxonomies.services;
    }

    async fetchData(): Promise<void> {
      this.fetchUri = '/guest/location/premium';
      let response;
      try {
        this.tableData.category = this.activeCategory;
        response = await this.$axios.$post(this.fetchUri, this.tableData);
        const { status, data } = response;
        switch (status) {
          case 200: {
            if (data.errors) {
              return;
            }
            this.items = response.data.data;
            // if(this.items.length <= 2)
            break;
          }
          case 401: {
            this.$router.push('/');
            return;
          }
          default: {
            return;
          }
        }
      } catch (e) {

      }
      this.loaded = true;
    }

    getPhotoPath(all_photos: string) {
      if (all_photos) {
        let photos = all_photos.split(";");
        if (photos.length) {
          return getPhotoPath(photos[0], 600, false);
        } else {
          return "images/pre.png";
        }
      } else {
        return "images/pre.png";
      }
    }

    getLabelStyle(item: PremiumSummaryData) {
      let style = '';
      // let style = "background-color: ";
      // style += (item.label_color) ? item.label_color :  "#ffffff";
      // style += "; color:";
      // style += (item.label_text_color) ? item.label_text_color : "#00a0ff";
      return style;
    }

    getLabelText(item: PremiumSummaryData) {
      if (item.label_text_start_page) {
        return item.label_text_start_page;
      }
      return item.type_name;
    }

    getServiceText(service: string) {
      if(service){
        let services = service.split(',');
        services.forEach((item, key) => {
          let serice = find(this.services, function(o) { return o.id == item; });
          services[key] = serice?.name ?? '';
        });
        return services.join(', ');
      }else{
        return '';
      }
    }

    getBoxLink(item: ProviderSummaryData){
      let props = {'href' : ''};
      if(item.type == "PROVIDER"){
        props = this.$router.resolve({ name: 'single.provider.display',
                                                        params: {
                                                          providerId: item.id as any,
                                                          categoryId: item.category_id,
                                                          categorySlug: item.category_slug,
                                                          providerSlug: (item.slug ? (item.slug+'.html') : item.legacy_slug) as any
                                                        }});

      }else if(item.type == "LOCATION"){
        props = this.$router.resolve({ name: 'single.location.display',
                                                    params: {
                                                        locationId: item.id as any,
                                                        categoryId: item.category_id,
                                                        categorySlug: item.category_slug,
                                                        locationSlug: (item.slug ? (item.slug+'.html') : item.legacy_slug) as any
                                                    }});

      }

      if(item.category_id == this.activeCategory){
          return props.href;
      }else{
          let domain = baseDomains['ch'];
          let category_id = Number.parseInt(item.category_id);
          if(category_id == 2){
            domain = baseDomains['de'];
          }else if(category_id == 3){
            domain = baseDomains['at'];
          }

          let lastChar = domain.slice(-1);
          if (lastChar == '/') {
              domain = domain.slice(0, -1);
          }

          return domain+props.href;
      }
    }

  }
</script>

<template>
    <div>
        <div class="overview">
            <div class="container">
                <div class="overviewhead">
                    <h3>Premium Galerie</h3>
                    Unsere Partner
                </div>
                <div class="clearer"></div>

                <div class="slider" v-if="loaded">
                  <div class="sliderbox partnersliderbox">

                    <div v-if="items && items.length" ref="carousel">
                      <div v-for="(item, index) in items" :key="index" :index="index">
                        <div class="location">
                          <router-link v-if="item.category_id == activeCategory"
                                       class="image"
                                       :to="getBoxLink(item)"
                                       :title="(item.short_name ? item.short_name : item.full_name)"
                                       exact="">
                                        <span :style="getLabelStyle(item)"
                                              v-text="getLabelText(item)">
                                        </span>
                            <u>
                              <i>
                                <img
                                  :src="getPhotoPath(item.all_photos)"
                                  :alt="(item.short_name ? item.short_name : item.full_name)">
                              </i>
                            </u>
                          </router-link>
                          <a v-else
                             class="image"
                             :href="getBoxLink(item)"
                             :title="(item.short_name ? item.short_name : item.full_name)"
                             exact="">
                                      <span :style="getLabelStyle(item)"
                                            v-text="getLabelText(item)">
                                      </span>
                            <u>
                              <i>
                                <img
                                  :src="getPhotoPath(item.all_photos)"
                                  :alt="(item.short_name ? item.short_name : item.full_name)">
                              </i>
                            </u>
                          </a>
                          <router-link v-if="item.type === 'LOCATION' && item.category_id == activeCategory"
                                       class="text"
                                       :to="getBoxLink(item)"
                                       :title="(item.short_name ? item.short_name : item.full_name)"
                                       exact="">
                            <b v-html="(item.short_name ? item.short_name : item.full_name)"></b>
                            <span v-if="item.min_capacity > 0 && item.max_capacity > 0">{{ item.min_capacity }} - {{ item.max_capacity }} Personen |</span>
                            <!-- <span v-else>unbekannt |</span> -->
                            {{ item.place }}
                          </router-link>
                          <a v-else-if="item.type === 'LOCATION' && item.category_id != activeCategory"
                             class="text"
                             :href="getBoxLink(item)"
                             :title="(item.short_name ? item.short_name : item.full_name)"
                             exact="">
                            <b v-html="(item.short_name ? item.short_name : item.full_name)"></b>
                            <span v-if="item.min_capacity > 0 && item.max_capacity > 0">{{ item.min_capacity }} - {{ item.max_capacity }} Personen |</span>
                            <!-- <span v-else>unbekannt |</span> -->
                            {{ item.place }}
                          </a>
                          <router-link v-else-if="item.type === 'PROVIDER' && item.category_id == activeCategory"
                                       class="text"
                                       :to="getBoxLink(item)"
                                       :title="(item.short_name ? item.short_name : item.full_name)"
                                       exact="">
                            <b v-html="(item.short_name ? item.short_name : item.full_name)"></b>
                            {{ getServiceText(item.service_ids)}} | {{ item.place }}
                          </router-link>
                          <a v-else
                             class="text"
                             :href="getBoxLink(item)"
                             :title="(item.short_name ? item.short_name : item.full_name)"
                             exact="">
                            <b v-html="(item.short_name ? item.short_name : item.full_name)"></b>
                            {{ getServiceText(item.service_ids)}} | {{ item.place }}
                          </a>
                          <favorite-button v-if="item.type === 'LOCATION'"
                                           :item="item"
                                           :text="false"
                                           :type="'locations'"
                                           class="like ajaxlink">
                          </favorite-button>
                          <favorite-button v-else
                                           :item="item"
                                           :text="false"
                                           :type="'providers'"
                                           class="like ajaxlink">
                          </favorite-button>
                        </div>
                      </div>
                    </div>

                  </div> <!-- .sliderbox .partnersliderbox -->
                </div> <!-- .slider -->

                <slider-placeholder v-else></slider-placeholder>

                <div class="clearer"></div>

            </div>
        </div>
    </div>
</template>
