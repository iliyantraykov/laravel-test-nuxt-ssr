<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  const { State , Action } = namespace('Root');
  import SkModal from '@/components/Modal/Modal.vue';
  import ClickOutside from 'v-click-outside';
  import EventBus from '@/utils/event-bus';
  import _ from 'lodash';
  import SkIcon from '@/components/Icons/Icon.vue';
  import vSelect from 'vue-select'

  @Component({
      components: {
        SkModal,
        SkIcon,
        vSelect
      },
      directives: {
        ClickOutside: ClickOutside.directive,
      }
  })

  export default class SiteSearch extends Vue {

      @Prop({type:String,default:'main-header'}) position;
      @Prop({type:String,default:'dark-bg'}) bgType;

      endpoint: string = 'guest/location/simplesearch/suggestions';
      suggestions: Array<any> = [];
      selected: string = '';
      search: string = '';
      noMatchingOptions: boolean = true;
      siteSearchOpen: boolean = false;
      focused: boolean = false;
      showClearBtn: boolean = false;
      // searchTerm: string = '';
      tableData: any = {
        draw: 1,
        length: 10,
        category: this.$store.state.activeCategory,
        search: ''
      };

      constructor() {
        super();
      }

      mounted(){
        this.customEvents();
      }

      customEvents() {
        const siteSearchRef = this.$refs.siteSearch as any;
        const clearBtn = siteSearchRef.$refs.clearButton as HTMLElement;
        clearBtn.addEventListener('click',()=>{
          siteSearchRef.$refs.search.value = '';
          siteSearchRef.search = '';
          siteSearchRef.open = false;
          this.toggleClearBtn();
        });
      }

      inputChange(search, loading) {
        this.search = search;

        //Get suggestions
        this.noMatchingOptions = true;
        if (search.length > 3) {
          this.noMatchingOptions = false;
          loading(true);
          this.suggestionsDebounced(search, loading, this);
        }
        this.toggleClearBtn();
      }

      closeSiteSearch(){
        console.log('Closing site search.');
        if (this.siteSearchOpen) {
          this.toggleSiteSearch(false)
        }
      }

      toggleClearBtn() {
        const siteSearchRef = this.$refs.siteSearch as any;
        this.showClearBtn = (siteSearchRef.search != '' && !siteSearchRef.mutableLoading) ? true : false;
      }

      openSiteSearch(){
        const siteSearchRef = this.$refs.siteSearch as any;
        if(this.siteSearchOpen){
          this.goToSearchResults(this.search);
        }
        else {
          this.toggleSiteSearch(true);
          setTimeout(() => {
            siteSearchRef.$refs.search.focus();
          }, 100);
        }
      }

      toggleSiteSearch(toggle: boolean = true){
        this.siteSearchOpen = toggle;
        let bodyClass = {
          'navMenuOpen' : false,
          'modalOpen' : false,
          'navSearchActive' : this.siteSearchOpen,
        };
        this.$store.commit('setBodyClasses', bodyClass)
      }

      get suggestionsDebounced() {
      return _.debounce((search, loading, vm) => {
          this.tableData.search = search;
          this.$axios.$post(this.endpoint, this.tableData).then(response => {
            this.suggestions = response.data;
            loading(false);
            this.toggleClearBtn();
          }).catch(error => {
            loading(false);
            console.log(error);
            this.toggleClearBtn();
          });
        }, 200)
      }

      goToSearchResults(searchTerm){
        if(searchTerm != null){
          this.$router.push({
            name: 'simplesearch',
            query: { searchitem: searchTerm }
          });
          setTimeout(() => {
            EventBus.$emit('simpleSearch');
          }, 3000);
        }
      }

      handlers(map, vm){
        const enter = e => {
          vm.typeAheadSelect();
          this.goToSearchResults(this.selected);
        };

        const right = e => {
          // console.log("Clicked right arrow");
          // vm.typeAheadSelect();
        };

        return {
          ...map, //  defaults
          13: enter,  //  enter
          39: right,  //  right arrow
        };
      }

      clearSearchOnBlur(){
        return false;
      }

      generateElClass(string) {
        let elClass = this.position + '__' + string + ' vs__' + string;

        if (string==='search-input' && this.siteSearchOpen){
          elClass += ' ' + this.position + '__' + string + '--expanded';
        }

        if (string==='right__button' && this.position==='main-header') {
          elClass += ' ' + this.position + '__' + string + '--search';
        }

        return elClass;
      }

    //TODO: Create VUE formulate component with v-select if needed in future
      vSelectClass() {
        let vsClass = 'v-select--'+this.bgType;

        if (this.focused) {
          vsClass += ' v-select--focused';
        }

        //Check visibility for header element
        let visibility = false;
        if (this.position ==='main-header' && this.siteSearchOpen) {
          vsClass += ' v-select--visible';
        } else {
          vsClass += ' v-select--hidden';
        }

        //Show clear button
        if (this.showClearBtn) {
          vsClass += ' v-select--clear-button-visible';
        }

        return vsClass;
      }

      clickedOutside(){
          // console.log('Clicked Outside.');
      }

      setFocus(focus=true) {
        this.focused = focus;
      }

      get suggestion(){
          if(this.suggestions.length > 0)
              return this.search + this.suggestions[0].slice(this.search.length);
          else
              return '';
      }
  }
</script>

<template>
  <div v-click-outside="closeSiteSearch" :class="generateElClass('search-input')">

    <v-select
      id="sitesearch"
      ref="siteSearch"
      :class="vSelectClass()"
      placeholder="Suchbegriff eingeben"
      :filterable="false"
      v-model="selected"
      autofill="on"
      @search="inputChange"
      @search:focus="setFocus(true)"
      @search:blur="setFocus(false)"
      @input="goToSearchResults(selected)"
      :options="suggestions"
      :map-keydown="handlers"
      :clearSearchOnBlur="clearSearchOnBlur"
      :noDrop="noMatchingOptions">
      <span slot="no-options">{{noMatchingOptions?'':'keine Ergebnisse'}}</span>
      <span :class="generateElClass('search-input__first-suggestion')"  slot="header">{{suggestion}}</span>
    </v-select>
<!--    @input="goToSearchResults"-->
<!--    @search:blur="clickedOutside"-->

    <button v-if="position==='main-header'"
            :class="generateElClass('right__button')"
            @click="openSiteSearch"
            >
      <sk-icon :type="'search'"></sk-icon>
    </button>

  </div>
</template>
