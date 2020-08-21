<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  const { State } = namespace('Root');
  import EventBus from '@/utils/event-bus';
  import CustomDropdown from "@/features/Front/Home/_components/partials/CustomDropdown.vue";
  import EventArtMenu from "@/features/Front/Home/_components/partials/EventArtMenu.vue";
  import MultipleChoiceDropdown from "@/features/Front/Home/_components/partials/MultipleChoiceDropdown.vue";
  import getPhotoPath from '@/utils/imageProcessing';
  import { striphtml } from '@/utils/content';
  import VueScrollTo from 'vue-scrollto';

  @Component({
    components: {
        MultipleChoiceDropdown,
        CustomDropdown,
        EventArtMenu
    },
    watch: {
      '$route' (to, from) {
        EventBus.$emit('routeChanged');
      }
    },
    filters: {
        striphtml: striphtml
    },
  })
  export default class SeoSearchBox extends Vue {
    @Prop() hasFilters;
    @Prop() total;
    @Prop() search!: Search;
    @Prop() taxonomies!: TaxonomyMap;
    @Prop() event_taxonomies!: Taxonomy[];
    @Prop() seoPage!: SeoPageFormItem;
    @Prop() loaded!: boolean;
    @State('activeCategory') activeCategory;

    activeMenu: string;
    activeRegion: string;
    active_region_array: Array<any>;
    room_heights: Array<any>;
    room_areas: Array<any>;
    room_numbers: Array<any>;
    reachabilities: any;
    filters: Array<Filter>;
    active_regions: Array<Taxonomy>;
    services: Array<Taxonomy>;
    filtered_offers: Array<Taxonomy>;
    filtered_services: Array<Taxonomy>;

    isSending = false;
    openedFilters = false;

    constructor() {
      super();
      this.activeMenu = 'location';
      this.activeRegion = 'ganze Schweiz';
      this.active_region_array = [{'id':0,'name':this.activeRegion}];
      this.filters = [];
      this.room_heights = [];
      this.room_areas = [];
      this.room_numbers = [];
      this.reachabilities = [];
      this.services = [];
      this.active_regions = [];
      this.filtered_offers = [];
      this.filtered_services = [];
    }

    async created() {
      EventBus.$on('populateSeoFilters', this.onPopulateSeoFilters);
      EventBus.$on('routeChanged', this.toggleActiveMenu);

      this.setActiveRegion();
      if (this.search.active === 'provider') {
        this.getActiveMenuString(this.search.service);
      }
      this.toggleActiveMenu();
      this.filterOffers();
    }

    async mounted() {
      this.formatTaxonomies();
    }

    destroyed() {
      EventBus.$off('routeChanged', this.toggleActiveMenu);
      EventBus.$off('populateSeoFilters', this.onPopulateSeoFilters);
    }

    onPopulateSeoFilters() {
      this.repopulateFilters();
      this.toggleActiveMenu();
      this.filterOffers();
    }

    toggleActiveMenu() {
      this.activeMenu = this.search.active;
    }

    setActiveRegion() {
      switch (this.activeCategory) {
        case 1:
          this.activeRegion = 'ganze Schweiz';
          break;
        case 2:
          this.activeRegion = 'ganz Deutschland';
          break;
        case 3:
          this.activeRegion = 'ganz Österreich';
          break;
        default:
          this.activeRegion = 'ganze Schweiz';
          break;
      }
      this.active_region_array = [{'id':0,'name':this.activeRegion}];
    }

    onSubmit() {
      this.isSending = true;
      this.search.active = this.activeMenu;
      this.populateProviderTypeFilter();
      this.openedFilters = false;
      this.triggerSearch(this.search);
      //this.repopulateFilters();
    }

    @Emit('search')
    triggerSearch(search: Search) {
    }

    populateProviderTypeFilter() {
      switch (this.search.active) {
        case 'location':
          this.search.service = '';
          break;
        case 'catering':
          this.search.service = 451;
          break;
        case 'technik':
          this.search.service = 452;
          break;
        case 'agentur':
          this.search.service = 450;
          break;
        case 'weitere':
          this.search.service = 1;
          break;
        default:
          // Keep the selected service
          //this.search.service = '';
          break;
      }
    }

    getActiveMenuString(type) {
      switch (type) {
        case 451:
          this.search.active = 'catering';
          break;
        case 452:
          this.search.active = 'technik';
          break;
        case 450:
          this.search.active = 'agentur';
          break;
        default:
          this.search.active = 'weitere';
          break;
      }
    }

    onServiceChange() {
      this.getActiveMenuString(this.search.service);
      this.activeMenu = this.search.active;
      this.filterOffers();
    }

    // filterServices() {
    //   this.filtered_services = [];
    //   this.services.forEach((item) => {
    //     if (item.id !== 450 && item.id !== 451 && item.id !== 452) {
    //       this.filtered_services.push(item);
    //     }
    //   });
    // }

    filterOffers() {
      if (this.search.service) {
        this.filtered_offers = [];
        this.taxonomies.offers.forEach((item) => {
          if (this.search.service === item.subtype) {
            this.filtered_offers.push(item);
          }
        });
      } else {
        this.filtered_offers = this.taxonomies.offers;
      }
    }

    eventArtChanged() {
    }

    getNavClass() {
      if (this.hasFilters && this.openedFilters) {
        return 'menu notstart menu_seo expanded';
      } else if(this.hasFilters && !this.openedFilters) {
        return 'menu notstart menu_seo';
      } else {
        return 'menu';
      }
    }

    repopulateFilters() {
      this.filters = [];
      if (this.search.name) {
        this.filters.push({
          key: 'name',
          index: 'no',
          value: this.search.name
        });
      }
      if (this.search.term) {
        this.filters.push({
          key: 'term',
          index: 'no',
          value: this.search.term
        });
      }
      if (this.search.region) {
        this.taxonomies.regions.forEach((entry, index) => {
          if (entry.id == this.search.region) {
            this.filters.push({
              key: 'region',
              index: 'no',
              value: entry.name
            });
          }
        });
      }
      if (this.search.distance) {
        this.filters.push({
          key: 'distance',
          index: 'no',
          value: 'Umkreis: ' + this.search.distance + 'km'
        });
      }
      if (this.search.persons) {
        this.filters.push({
          key: 'persons',
          index: 'no',
          value: this.search.persons + ' Gäste'
        });
      }
      if (this.search.place) {
        this.filters.push({
          key: 'place',
          index: 'no',
          value: this.search.place
        });
      }
      if (this.search.room_number) {
        this.filters.push({
          key: 'room_number',
          index: 'no',
          value: "Anzahl Räume: " + this.search.room_number
        });
      }
      if (this.search.events) {
        this.search.events.forEach((entry, index) => {
          this.event_taxonomies.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'events',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.reachability) {
        this.reachabilities.forEach((entry, index) => {
          if (entry.id == this.search.reachability) {
            this.filters.push({
              key: 'reachability',
              index: 'no',
              value: entry.name
            });
          }
        });
      }
      if (this.search.room_area) {
        this.room_areas.forEach((entry, index) => {
          if (entry.id == this.search.room_area) {
            this.filters.push({
              key: 'room_area',
              index: 'no',
              value: "Min Fläche: " + entry.name + "m²"
            });
          }
        });
      }
      if (this.search.room_height) {
        this.room_heights.forEach((entry, index) => {
          if (entry.id == this.search.room_height) {
            this.filters.push({
              key: 'room_height',
              index: 'no',
              value: "Min Raumhöhe: " + entry.name + "m"
            });
          }
        });
      }
      if (this.search.buildings.length) {
        this.search.buildings.forEach((entry, index) => {
          this.taxonomies.buildings.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'buildings',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.locations.length) {
        this.search.locations.forEach((entry, index) => {
          this.taxonomies.locations.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'locations',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.offers.length) {
        this.search.offers.forEach((entry, index) => {
          this.taxonomies.offers.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'offers',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.infrastructures.length) {
        this.search.infrastructures.forEach((entry, index) => {
          this.taxonomies.infrastructures.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'infrastructures',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.prices.length) {
        this.search.prices.forEach((entry, index) => {
          this.taxonomies.prices.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'prices',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.styles.length) {
        this.search.styles.forEach((entry, index) => {
          this.taxonomies.styles.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'styles',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.operations.length) {
        this.search.operations.forEach((entry, index) => {
          this.taxonomies.operations.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'operations',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.furniture.length) {
        this.search.furniture.forEach((entry, index) => {
          this.taxonomies.furniture.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'furniture',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.technologies.length) {
        this.search.technologies.forEach((entry, index) => {
          this.taxonomies.technologies.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'technologies',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.surroundings.length) {
        this.search.surroundings.forEach((entry, index) => {
          this.taxonomies.surroundings.forEach((sub_entry, sub_index) => {
            if (entry == sub_entry.id) {
              this.filters.push({
                key: 'surroundings',
                index: index,
                value: sub_entry.name
              });
            }
          });
        });
      }
      if (this.search.service) {
        this.services.forEach((entry, index) => {
          if (entry.id == this.search.service) {
            this.filters.push({
              key: 'service',
              index: 'no',
              value: entry.name
            });
          }
        });
      }
    }

    defaultFilter(filter: Filter) {
      if (filter.index == 'no') {
        this.search[filter.key] = '';
      } else {
        this.defaultTaxonomyFilter(filter.key, filter.index)
      }
      this.onSubmit();
    }

    defaultTaxonomyFilter(key, index) {
      this.search[key].splice(index, 1);
    }

    removeAllFilters() {
      this.search = {
        active: '',
        service: '',
        events: [],
        region: '',
        term: '',
        persons: '',
        name: '',
        place: '',
        distance: '',
        reachability: '',
        room_number: 0,
        room_area: '',
        room_height: '',
        buildings: [],
        locations: [],
        infrastructures: [],
        technologies: [],
        furniture: [],
        surroundings: [],
        prices: [],
        styles: [],
        operations: [],
        offers: []
      };
      this.onSubmit();
    }

    async formatTaxonomies(){
      switch (this.activeCategory) {
        case 1:
          this.active_regions = this.taxonomies.region_swiss;
          break;
        case 2:
          this.active_regions = this.taxonomies.region_german;
          break;
        case 3:
          this.active_regions = this.taxonomies.region_austrian;
          break;
        default:
          this.active_regions = this.taxonomies.regions;
          break;
      }
      this.services = this.taxonomies.services;
      //this.filterServices();
      this.reachabilities = [
          // {'id': '','name': 'Erreichbarkeit'},
          {'id': 'airport','name': 'Nähe Flughafen'},
          {'id': 'train_station','name': 'Nähe ÖV'},
          {'id': 'highway','name': 'Nähe Autobahn'}
      ];
      this.room_numbers = [];
      this.room_numbers.push({name: '1 Raum', id: 1});
      this.room_numbers.push({name: '2 Räume', id: 2});
      this.room_numbers.push({name: '3 Räume', id: 3});
      this.room_numbers.push({name: '4 Räume', id: 4});
      this.room_numbers.push({name: '5 Räume', id: 5});
      this.room_numbers.push({name: '≥ 6 Räume', id: 6});

      this.room_areas = [];
      this.room_areas.push({
        name: '50 m2',
        id: 50
      });
      this.room_areas.push({
        name: '100 m2',
        id: 100
      });
      this.room_areas.push({
        name: '150 m2',
        id: 150
      });
      this.room_areas.push({
        name: '200 m2',
        id: 200
      });
      this.room_areas.push({
        name: '250 m2',
        id: 250
      });
      this.room_areas.push({
        name: '≥ 300 m2',
        id: 300
      });
      this.room_heights = [];
      this.room_heights.push({
        name: '2,5 m',
        id: 2.5
      });
      this.room_heights.push({
        name: '3,0 m',
        id: 3.0
      });
      this.room_heights.push({
        name: '3,5 m',
        id: 3.5
      });
      this.room_heights.push({
        name: '4,0 m',
        id: 4.0
      });
      this.room_heights.push({
        name: '4,5 m',
        id: 4.5
      });
      this.room_heights.push({
        name: '≥ 5,0 m',
        id: 5.0
      });
    }

    getHeaderImageSource() {
      let photos = this.seoPage.media?.photos;
      if (photos && photos.length>0) {
        let image = photos[0];
        return getPhotoPath(image.id + ',' + image.name + ',' + image.mime_type);
      } else {
        return 'images/pre.png';
      }
    }

    applyInputStyle(input) {
      return [input && input.length > 0 ? 'active' : '']
    }
    openFiler(event){
      VueScrollTo.scrollTo(event.target, 200, { easing: 'ease', offset: -80 });
      return this.openedFilters = !this.openedFilters;
    }
  }
</script>

<template>
  <nav :class="getNavClass()">

    <div class="seo_header">
      <div class="image">
        <u><i><img v-if="seoPage.media" :src="getHeaderImageSource()" :alt="seoPage.name"></i></u>
      </div>
      <div class="text">
        <div class="inner-content">
          <h1>{{seoPage.name}}</h1>
          {{seoPage.undertitle | striphtml}}
        </div>
      </div>
      <div class="clearer"></div>
    </div> <!-- .seo_header -->

    <div class="tab_content">
      <form name="filter"
            @submit.prevent="onSubmit">
        <div class="fullsearch">
          <div class="container">
            <table>
              <tbody><tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <h4>{{ total }} Resultate</h4>
                </td>
                <td colspan="3">
                  <div class="filter">
                    <a v-for="filter in filters"
                       @click="defaultFilter(filter)">
                      <span></span>
                      {{ filter.value }}
                    </a>
                    <a v-if="filters.length"
                       class="delete"
                       @click="removeAllFilters()">
                      <span></span>
                      Filter löschen
                    </a>
                  </div>
                  <div v-if="openedFilters"
                       class="showfilter"
                       @click="openedFilters = !openedFilters">
                      Filter ausblenden
                  </div>
                  <div v-else
                       class="showfilter"
                       @click="openFiler($event)">
                      Mehr Filter
                  </div>
                </td>
              </tr>
              </tbody></table>
            <div class="clearer"></div>
          </div>
        </div>
        <div v-if="openedFilters"
             class="fullsearch"
             style="display: block;">
          <div class="container">
            <table>
              <tbody>
                <tr>
                  <td>Dein Event</td>
                  <td>
                    <event-art-menu v-model="search.events" :types="event_taxonomies" @input="eventArtChanged()"></event-art-menu>
                  </td>
                  <td class="showoptions">
                    <custom-dropdown v-model="search.region" :options="active_regions" :custom_options="active_region_array" class="regions_dropdown"></custom-dropdown>
                  </td>
                  <td>
                    <input type="text"
                           v-model="search.persons"
                           name="persons"
                           placeholder="Anzahl Personen"
                           :class="applyInputStyle(search.persons)">
                  </td>
                </tr>

                <tr v-if="activeMenu === 'location'">
                  <td>Location</td>
                  <td>
                    <input type="text"
                           name="name"
                           v-model="search.name"
                           placeholder="Name der Location"
                           value=""
                           :class="applyInputStyle(search.name)">
                  </td>
                  <td>
                    <multiple-choice-dropdown v-model="search.buildings"
                                              :options="taxonomies.buildings"
                                              :dropdownId="'gebaeudeart_Locations_'"
                                              :placeholder="'Gebäudeart'">
                    </multiple-choice-dropdown>
                  </td>
                  <td>
                    <multiple-choice-dropdown v-model="search.locations"
                                              :options="taxonomies.locations"
                                              :dropdownId="'lage_Locations_'"
                                              :placeholder="'Lage'">
                    </multiple-choice-dropdown>
                  </td>
                </tr>
                <tr v-if="activeMenu === 'location'">
                  <td>Standort</td>
                  <td>
                    <input type="text"
                           name="place"
                           v-model="search.place"
                           placeholder="PLZ / Ort"
                           :class="applyInputStyle(search.place)">
                  </td>
                  <td class="showoptions">
                    <custom-dropdown v-model="search.distance"
                                     :options="[
                                              // {'id':'','name': 'Umkreis'},
                                              {'id':10,'name': '10 Kilometer'},
                                              {'id':20,'name': '20 Kilometer'},
                                              {'id':50,'name': '50 Kilometer'},
                                              {'id':100,'name': '100 Kilometer'}]"
                                     :placeholder="'Umkreis'">
                    </custom-dropdown>
                  </td>
                  <td class="showoptions">
                    <custom-dropdown v-model="search.reachability" :options="reachabilities" :placeholder="'Erreichbarkeit'"></custom-dropdown>
                  </td>
                </tr>
                <tr v-if="activeMenu === 'location'">
                  <td>Räumlichkeiten</td>
                  <td class="showoptions">
                    <custom-dropdown v-model="search.room_number" :options="room_numbers" :placeholder="'Anzahl Räume'"></custom-dropdown>
                  </td>
                  <td class="showoptions">
                    <custom-dropdown v-model="search.room_area" :options="room_areas" :placeholder="'Größter Raum (m2)'"></custom-dropdown>
                  </td>
                  <td class="showoptions">
                    <custom-dropdown v-model="search.room_height" :options="room_heights" :placeholder="'Min. Raumhöhe (m)'"></custom-dropdown>
                  </td>
                </tr>
                <tr v-if="activeMenu === 'location'">
                  <td style="padding-top: 40px">Infrastruktur</td>
                  <td style="padding-top: 40px" colspan="3">
                    <div class="checker">
                      <div v-for="item in taxonomies.infrastructures">
                        <input type="checkbox"
                               :id="'infrastruktur'+item.id"
                               v-model="search.infrastructures"
                               :value="item.id">
                        <label :for="'infrastruktur'+item.id">
                          <b></b> {{ item.name }}
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="activeMenu === 'location'">
                  <td>Mobiliar</td>
                  <td colspan="3">
                    <div class="checker">
                      <div v-for="item in taxonomies.furniture">
                        <input type="checkbox"
                               :id="'mobiliar'+item.id"
                               v-model="search.furniture"
                               :value="item.id">
                        <label :for="'mobiliar'+item.id">
                          <b></b> {{ item.name }}
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="activeMenu === 'location'">
                  <td>Technik</td>
                  <td colspan="3">
                    <div class="checker">
                      <div v-for="item in taxonomies.technologies">
                        <input type="checkbox"
                               :id="'technik'+item.id"
                               v-model="search.technologies"
                               :value="item.id">
                        <label :for="'technik'+item.id">
                          <b></b> {{ item.name }}
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="activeMenu === 'location'">
                <td>Umgebung</td>
                <td colspan="3">
                  <div class="checker">
                    <div v-for="item in taxonomies.surroundings">
                      <input type="checkbox"
                             :id="'umgebung'+item.id"
                             v-model="search.surroundings"
                             :value="item.id">
                      <label :for="'umgebung'+item.id">
                        <b></b> {{ item.name }}
                      </label>
                    </div>
                  </div>
                </td>
              </tr>

                <tr v-if="activeMenu !== 'location'">
                  <td>Dienstleistungen</td>
                  <td class="showoptions">
                    <custom-dropdown v-model="search.service" :options="services" :placeholder="'Dienstleistertyp'" @input="onServiceChange()"></custom-dropdown>
                  </td>
                  <td>
                    <multiple-choice-dropdown v-model="search.offers"
                                              :options="filtered_offers"
                                              :dropdownId="'angebot_Weitere_'"
                                              :placeholder="'Angebot'">
                    </multiple-choice-dropdown>
                  </td>
                  <td>
                    <input type="text"
                           v-model="search.term"
                           name="term"
                           placeholder="Stichwort"
                           :class="applyInputStyle(search.term)">
                  </td>
                </tr>
                <tr v-if="activeMenu !== 'location'">
                  <td style="padding-top: 40px">Preis/Wertigkeit</td>
                  <td style="padding-top: 40px" colspan="3">
                    <div class="checker">
                      <div v-for="item in taxonomies.prices">
                        <input type="checkbox"
                               :id="'preis'+item.id"
                               v-model="search.prices"
                               :value="item.id">
                        <label :for="'preis'+item.id">
                          <b></b> {{ item.name }}
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="activeMenu !== 'location'">
                  <td>Stil</td>
                  <td colspan="3">
                    <div class="checker">
                      <div v-for="item in taxonomies.styles">
                        <input type="checkbox"
                               :id="'stil'+item.id"
                               v-model="search.styles"
                               :value="item.id">
                        <label :for="'stil'+item.id">
                          <b></b> {{ item.name }}
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-if="activeMenu !== 'location'">
                  <td>Arbeitsweise</td>
                  <td colspan="3">
                    <div class="checker">
                      <div v-for="item in taxonomies.operations">
                        <input type="checkbox"
                               :id="'arbeitsweise'+item.id"
                               v-model="search.operations"
                               :value="item.id">
                        <label :for="'arbeitsweise'+item.id">
                          <b></b> {{ item.name }}
                        </label>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
            <div class="clearer"></div>
          </div>
        </div>
        <div v-if="openedFilters"
             class="fullsearch"
             style="display: block;">
          <div class="container">
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <div class="cancel"
                         @click="openedFilters = !openedFilters">
                      Abbrechen
                    </div>
                  </td>
                  <td>
                    <input type="submit"
                           value="Filter anwenden"
                           :class="{ disabled: isSending }">
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="clearer"></div>
          </div>
        </div>
      </form>
    </div> <!-- .tab_content -->

  </nav>
</template>
