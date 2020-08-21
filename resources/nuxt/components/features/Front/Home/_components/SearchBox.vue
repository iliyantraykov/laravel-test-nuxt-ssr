<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  const { State } = namespace('Root');
  import EventBus from '@/utils/event-bus';
  import CustomDropdown from "@/features/Front/Home/_components/partials/CustomDropdown.vue";
  import EventArtMenu from "@/features/Front/Home/_components/partials/EventArtMenu.vue";
  import MultipleChoiceDropdown from "@/features/Front/Home/_components/partials/MultipleChoiceDropdown.vue";

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
    }
  })
  export default class SearchBox extends Vue {
    @Prop() hasFilters;
    @Prop() total;
    @Prop() search!: Search;
    @Prop() taxonomies!: TaxonomyMap;
    @Prop() event_taxonomies!: Taxonomy[];
    @Prop() toggleActiveMenuInit;
    @State('activeCategory') activeCategory;
    @Prop() searchTitle;

    activeMenu: string;
    selectedMenu: string;
    activeRegion: string;
    active_region_array: Array<any>;
    subDropdown: number;
    selectedSubDropdown: number;
    eventDropdownOpen: boolean;
    buildingDropdownOpen: boolean;
    locationDropdownOpen: boolean;
    offerDropdownOpen: boolean;
    room_heights: Array<any>;
    room_areas: Array<any>;
    room_numbers: Array<any>;
    reachabilities: any;
    filters: Array<Filter>;
    types: Array<any>;
    regions: Array<any>;
    services: Array<any>;
    weitere_services: Array<any>;
    buildings: Array<any>;
    taxonomy_locations: Array<Taxonomy>;
    infrastructures: Array<any>;
    technologies: Array<any>;
    furniture: Array<any>;
    surroundings: Array<any>;
    offers: Array<any>;
    unfiltered_offers: Array<any>;
    prices: Array<any>;
    styles: Array<any>;
    operations: Array<any>;
    isSending = false;
    openedFilters = false;
    showMainOptions = true;
    selectedEvent: string;
    isEventSelected: object;
    isPersonsFilledIn: object;

    constructor() {
      super();

      this.eventDropdownOpen = false;
      this.buildingDropdownOpen = false;
      this.locationDropdownOpen = false;
      this.offerDropdownOpen = false;
      this.subDropdown = 0;
      this.selectedSubDropdown = 0;
      this.activeMenu = 'location';
      this.selectedMenu = 'location';
      this.activeRegion = 'Region';
      this.active_region_array = [{'id':0,'name':this.activeRegion}];
      this.filters = [];
      this.room_heights = [];
      this.room_areas = [];
      this.room_numbers = [];
      this.reachabilities = [];
      this.types = [];
      this.regions = [];
      this.services = [];
      this.weitere_services = [];
      this.buildings = [];
      this.taxonomy_locations = [];
      this.infrastructures = [];
      this.technologies = [];
      this.furniture = [];
      this.surroundings = [];
      this.prices = [];
      this.styles = [];
      this.operations = [];
      this.offers = [];
      this.unfiltered_offers = [];
      this.selectedEvent = 'Event-Art';
      this.isEventSelected = {'background-color': 'rgb(255, 255, 255)'};
      this.isPersonsFilledIn = {'background-color': 'rgb(255, 255, 255)'};
    }

    async mounted() {
      EventBus.$on('activeCategoryChanged', this.renderFilters);
      EventBus.$on('populateFilters', this.toggleActiveMenu);
      EventBus.$on('populateFilters', this.repopulateFilters);
      this.setActiveRegion();
      this.toggleSearchOptions();
      this.formatTaxonomies();
      this.repopulateFilters();
      if (this.toggleActiveMenuInit) {
          this.toggleActiveMenu();
      }
      this.filterOffers();
    }

    destroyed() {
      EventBus.$off('activeCategoryChanged', this.renderFilters);
      EventBus.$off('populateFilters', this.toggleActiveMenu);
      EventBus.$off('populateFilters', this.repopulateFilters);
    }

    toggleActiveMenu() {
      this.activeMenu = this.search.active;
      this.selectedMenu = this.search.active;
      this.toggleSearchOptions();
    }

    defaultSearchParams() {
      // if (this.$route.params.search) {
      //   this.search = this.$route.params['search'];
      // }
    }

    handleSearchParams() {
      if (this.$route.name === 'location.search' && this.selectedMenu !== 'location') {
        this.search.persons = '';
        this.search.name = '';
        this.search.place = '';
        this.search.room_number = 0;
        this.search.distance = '';
        this.search.reachability = '';
        this.search.room_area = '';
        this.search.room_height = '';
        this.search.buildings = [];
        this.search.locations = [];
        this.search.infrastructures = [];
        this.search.furniture = [];
        this.search.technologies = [];
        this.search.surroundings = [];
      }
      if ((this.$route.name === 'provider.search' && this.selectedMenu === 'location')
      || (this.$route.name === 'provider.search' && this.search.active !== this.selectedMenu)) {
        this.search.service = '';
        this.search.term = '';
        this.search.prices = [];
        this.search.styles = [];
        this.search.operations = [];
        this.search.offers = [];
      }
    }

    renderFilters() {
      this.setActiveRegion();
      this.formatTaxonomies();
      // this.fetchEventTaxonomies();
      // this.types = this.event_taxonomies.events;
      this.search.region = '';
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
      this.handleSearchParams();
      this.search.active = this.selectedMenu;
      this.populateProviderTypeFilter();
      this.openedFilters = false;
      this.triggerSearch(this.search);
      this.repopulateFilters();
      this.toggleSearchOptions();
      this.filterOffers();
    }

    @Emit('search')
    triggerSearch(search) {
    }

    onServiceChange() {
      switch (this.search.service) {
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
      this.selectedMenu = this.search.active;
      this.filterOffers();
    }

    filterOffers() {
      this.offers = this.unfiltered_offers;
      if (this.search.service) {
        this.offers = [];
        this.unfiltered_offers.forEach((item) => {
          if (this.search.service === item.subtype) {
            this.offers.push(item);
          }
        });
      }
    }

    filterServices() {
      this.weitere_services = [];
      this.services.forEach((item) => {
        if (item.id !== 450 && item.id !== 451 && item.id !== 452) {
          this.weitere_services.push(item);
        }
      });
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
        default:
          break;
      }
    }

    setActiveMenu(menu) {

      if (this.activeMenu !== menu) {
        this.activeMenu = menu;
        this.selectedMenu = menu;
        this.eventDropdownOpen = false;
        this.subDropdown = 0;
        this.selectedSubDropdown = 0;
        this.search.events = [];
      }
      if (menu === "weitere") {
        this.search.service = '';
      }
      this.toggleSearchOptions();
    }


    eventArtChanged(){}

    getNavClass() {
      let css_class = '';
      if (this.hasFilters && this.openedFilters) {
         css_class = 'menu notstart results expanded';
      } else if(this.hasFilters && !this.openedFilters) {
        css_class = 'menu notstart results';
      } else {
        css_class = 'menu';
      }
      if(typeof this.searchTitle != 'undefined' && this.searchTitle != null){
        css_class += ' search_title'
      }
      return css_class;
    }

    toggleSearchOptions() {
      if (this.hasFilters) {
        this.showMainOptions = !(this.activeMenu === this.search.active);
      } else {
        this.showMainOptions = true;
      }
    }

    repopulateFilters() {
      this.filters.length = 0;
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
        this.regions.forEach((entry, index) => {
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
              value: "Min Fläche: " + entry.name 
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
          this.buildings.forEach((sub_entry, sub_index) => {
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
          this.taxonomy_locations.forEach((sub_entry, sub_index) => {
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
          this.offers.forEach((sub_entry, sub_index) => {
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
          this.infrastructures.forEach((sub_entry, sub_index) => {
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
          this.prices.forEach((sub_entry, sub_index) => {
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
          this.styles.forEach((sub_entry, sub_index) => {
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
          this.operations.forEach((sub_entry, sub_index) => {
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
          this.furniture.forEach((sub_entry, sub_index) => {
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
          this.technologies.forEach((sub_entry, sub_index) => {
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
          this.surroundings.forEach((sub_entry, sub_index) => {
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
        if (filter.key == 'service') {
          this.activeMenu = 'weitere';
        }
      } else {
        this.defaultTaxonomyFilter(filter.key, filter.index)
      }
      this.onSubmit();
    }

    defaultTaxonomyFilter(key, index) {
      this.search[key].splice(index, 1);
    }

    removeAllFilters() {
      this.search.active = '';
      this.search.service = '';
      this.search.events = [];
      this.search.region = '';
      this.search.term = '';
      this.search.persons = '';
      this.search.name = '';
      this.search.place = '';
      this.search.distance = '';
      this.search.reachability = '';
      this.search.room_number = 0;
      this.search.room_area = '';
      this.search.room_height = '';
      this.search.buildings = [];
      this.search.locations = [];
      this.search.infrastructures = [];
      this.search.technologies = [];
      this.search.furniture = [];
      this.search.surroundings = [];
      this.search.prices = [];
      this.search.styles = [];
      this.search.operations = [];
      this.search.offers = [];

      if (this.activeMenu !== 'location') {
        this.activeMenu = 'weitere';
      }
      this.onSubmit();
    }

    formatTaxonomies(){
          this.buildings = this.taxonomies.buildings;
          this.taxonomy_locations = this.taxonomies.locations;
          this.infrastructures = this.taxonomies.infrastructures;
          this.technologies = this.taxonomies.technologies;
          this.furniture = this.taxonomies.furniture;
          this.surroundings = this.taxonomies.surroundings;
          switch (this.activeCategory) {
            case 1:
              this.regions = this.taxonomies.region_swiss;
              break;
            case 2:
              this.regions = this.taxonomies.region_german;
              break;
            case 3:
              this.regions = this.taxonomies.region_austrian;
              break;
            default:
              this.regions = this.taxonomies.regions;
              break;
          }
          this.services = this.taxonomies.services;
          this.filterServices();
          this.operations = this.taxonomies.operations;
          this.prices = this.taxonomies.prices;
          this.styles = this.taxonomies.styles;
          this.offers = this.taxonomies.offers;
          this.unfiltered_offers = this.taxonomies.offers;
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
            name: '50 m²',
            id: 50
          });
          this.room_areas.push({
            name: '100 m²',
            id: 100
          });
          this.room_areas.push({
            name: '150 m²',
            id: 150
          });
          this.room_areas.push({
            name: '200 m²',
            id: 200
          });
          this.room_areas.push({
            name: '250 m²',
            id: 250
          });
          this.room_areas.push({
            name: '≥ 300 m²',
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

        // });

    }

    applyInputStyle(input) {
        return [input && input.length > 0 ? 'active' : '']
    }

    inputInPersons(){
        if(this.search.persons !== "")
            this.isPersonsFilledIn = {'background-color': '#eaeaea'};
        else
            this.isPersonsFilledIn = {'background-color': 'rgb(255, 255, 255)'};
    }

  }
</script>

<template>
    <div>
      <div>
        
        <nav :class="getNavClass()">
          <div v-if="typeof searchTitle != 'undefined' && searchTitle != null" class="search_header container">
            <h1 v-if="searchTitle">{{searchTitle}}</h1>
            <h1 v-else>&nbsp;</h1>
          </div>
          <ul class="categories" style="">
            <li :class="activeMenu === 'location' ? 'selected' : ''">
              <a @click="setActiveMenu('location')" title="Location">Location</a>
            </li>
            <li :class="activeMenu === 'catering' ? 'selected' : ''">
              <a @click="setActiveMenu('catering')"  title="Catering">Catering</a>
            </li>
            <li :class="activeMenu === 'technik' ? 'selected' : ''">
              <a @click="setActiveMenu('technik')" title="Technik">Technik</a>
            </li>
            <li :class="activeMenu === 'agentur' ? 'selected' : ''">
              <a @click="setActiveMenu('agentur')" title="Agentur">Agentur</a>
            </li>
            <li :class="activeMenu === 'weitere' ? 'selected' : ''">
              <a @click="setActiveMenu('weitere')" title="Weitere">Weitere</a>
            </li>
          </ul>
          <div style="clear:both;"></div>
          <div v-if="showMainOptions"
               class="eventsearch" id="tab_content_Locations">
            <div class="container">
              <form name="eventsearch"
                    @submit.prevent="onSubmit">
                <div  v-if="activeMenu === 'weitere'"
                      class="showoptions">
                  <custom-dropdown v-model="search.service" :options="services" :placeholder="'Dienstleistertyp'"></custom-dropdown>
                </div>
                <event-art-menu v-model="search.events" :types="event_taxonomies" @input="eventArtChanged()"></event-art-menu>
                <div>
                  <custom-dropdown v-model="search.region" :options="regions" :placeholder="'Region'" :custom_options="active_region_array" class="regions_dropdown"></custom-dropdown>
                </div>
                <input v-if="activeMenu === 'location'"
                       type="text"
                       v-model="search.persons"
                       name="persons"
                       placeholder="Personen"
                       :class="applyInputStyle(search.persons)">
                <input v-else-if="activeMenu === 'catering' || activeMenu === 'technik' || activeMenu === 'agentur'"
                       type="text"
                       v-model="search.term"
                       name="term"
                       placeholder="Stichwort"
                       :class="applyInputStyle(search.term)"
                      >
                <input type="submit"
                       :class="{ disabled: isSending }"
                       value="Suchen"
                       style="background-color: rgb(255, 82, 110);">
              </form>
              <div class="clearer"></div>
            </div>
          </div>

          <!-- Visible only on search results page -->
          <div v-else
               class="tab_content"
               id="tab_content_Locations">
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
                            <propertyhtml v-html="filter.value"></propertyhtml>
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
                             @click="openedFilters = !openedFilters">
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
                          <custom-dropdown v-model="search.region" :options="regions" :custom_options="active_region_array" class="regions_dropdown"></custom-dropdown>
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
                                                    :options="buildings"
                                                    :dropdownId="'gebaeudeart_Locations_'"
                                                    :placeholder="'Gebäudeart'">
                          </multiple-choice-dropdown>
                        </td>
                        <td>
                          <multiple-choice-dropdown v-model="search.locations"
                                                    :options="taxonomy_locations"
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
                            <div v-for="item in infrastructures">
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
                            <div v-for="item in furniture">
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
                            <div v-for="item in technologies">
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
                            <div v-for="item in surroundings">
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
                          <custom-dropdown v-if="activeMenu !== 'weitere'" v-model="search.service" :options="services" :placeholder="'Dienstleistertyp'" @input="onServiceChange()"></custom-dropdown>
                          <custom-dropdown v-else v-model="search.service" :options="weitere_services" :placeholder="'Dienstleistertyp'" @input="onServiceChange()"></custom-dropdown>
                        </td>
                        <td>
                          <multiple-choice-dropdown v-model="search.offers"
                                                    :options="offers"
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
                            <div v-for="item in prices">
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
                            <div v-for="item in styles">
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
                            <div v-for="item in operations">
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
          </div>


        </nav>
      </div>
    </div>
</template>
