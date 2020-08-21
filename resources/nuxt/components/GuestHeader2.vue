<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import VueScrollTo from 'vue-scrollto'
import { throttle} from 'lodash'
import SkDropdown from "@/components/Dropdown/Dropdown.vue";
import SkDropdownItem from "@/components/Dropdown/DropdownItem.vue";
import SkIcon from '@/components/Icons/Icon.vue';
declare const baseDomains;

@Component({
    components: {
            /* TODO webpackPreload and webpackPrefetch could be useful here so that we load the modals and menu
             * just after all the visible content on the page is done loading. (my first try did
             * not work for some reason but we should recheck) */
            NavMenu: () => import(/* webpackChunkName: "navigationMenu" */"@/components/features/Front/Common/_components/NavMenu.vue"),
            LoginModal: () => import(/* webpackChunkName: "loginModal"*/"@/components/features/Front/Common/_components/LoginModal.vue"),
            //AuthenticationModal: () => import(/* webpackChunkName: "authModal"*/"@/components/features/Front/Users/_components/AuthenticationModal.vue"),
            RegisterModal: () => import(/* webpackChunkName: "registerModal" */"@/components/features/Front/Common/_components/RegisterModal.vue"),
            SiteSearch: () => import(/* webpackChunkName: "siteSearch" */"@/components/features/Front/Common/_components/SiteSearch.vue"),
            SkDropdown,
            SkDropdownItem,
            SkIcon
        },
    watch: {
      '$route' : 'closeNavMenu'
    },
    // computed: {
    //   ...mapState('Root', [
    //     'bodyClasses',
    //   ]),
    // }
})
export default class GuestHeader2 extends Vue {
    //@Action('setBodyClasses') setBodyClasses;

    navOpen: boolean;
    authOpen: boolean;
    // registerOpen: boolean;
    isTransparent: boolean = true;
    dropdownOpen: boolean = false;
    token: any = '';
    activeModal: string = 'login';

    constructor() {
        super();
        this.navOpen = false;
        this.authOpen = false;
        // this.registerOpen = false;
    }

    mounted() {
        // Set the initial transparency of the header
        this.headerClass();
        window.addEventListener('scroll',throttle(() => {
           this.headerClass();
        },200));
        console.log(this.$route);
        if(this.$route.name === 'index' && this.$route.query.token) {
            this.authOpen = true;
            this.activeModal = 'reset-form';
            this.token = this.$route.query.token;
        }
    }

    closeNavMenu(){
        if(this.navOpen)
            this.toggleNavMenu();
    }

    toggleNavMenu(){
        this.navOpen = !this.navOpen;
        // TODO: Update only one attribute in the state
        let bodyClass = {
            'navMenuOpen' : this.navOpen,
            'modalOpen' : false,
            'navSearchActive' : false,
        };
        //this.setBodyClasses(bodyClass);
        this.$store.commit('setBodyClasses', bodyClass)
        // console.log('nav open')
    }

    toggleAuthModal(type: 'login'){
        this.authOpen = !this.authOpen;
    }

    closeAuthModal(){
        this.authOpen = false;
    }

    // TODO unused remove
    // toggleRegisterModal(toggle: true){
    //   if (toggle) {
    //     this.registerOpen = !this.registerOpen;
    //   } else {
    //     this.registerOpen = false;
    //   }
    // }

    headerClass(){
        //this.isTransparent = window.pageYOffset < 20;
    }

    dropdownToggled() {
        this.dropdownOpen = !this.dropdownOpen;
    }

}
</script>
<template>
  <div :class="{'main-header--transparent':isTransparent && !dropdownOpen,
                'main-header--nav-open':navOpen,
                'main-header--nav-search-active':$store.state.bodyClasses.navSearchActive}" 
                class="main-header">

    <div :class="{'main-header__wrap--transparent':isTransparent && !dropdownOpen,
                  'main-header__wrap--nav-open':navOpen,
                  'main-header__wrap--nav-search-active':$store.state.bodyClasses.navSearchActive}"
                  class="main-header__wrap">

      <div v-if="navOpen" class="main-header__menu-toggle">
        <button @click="toggleNavMenu">
          <sk-icon :type="'close'"></sk-icon>
        </button>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-12">

            <div class="main-header__inner">

              <div class="main-header__left">

                <div v-if="!navOpen" class="main-header__menu-toggle">
                  <button @click="toggleNavMenu">
                    <sk-icon :type="'menu'"></sk-icon>
                  </button>
                </div>

                <sk-dropdown @dropdown-toggled="dropdownToggled" title="Eventwelt" v-show="!navOpen">
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/site/_redaktionell/52/eventmagazin.html'}" class="sk-dropdown__link">Eventmagazin</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/site/_redaktionell/52/eventmagazin.html?suche_tag1=Swiss%20Location%20Award'}" class="sk-dropdown__link">Swiss Location Award</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/site/_redaktionell/51/Eventjobs.html'}" class="sk-dropdown__link">Eventjobs</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/site/_redaktionell/52/eventmagazin.html?suche_tag1=Eventnews'}" class="sk-dropdown__link">Eventnews</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/'}" class="sk-dropdown__link">Eventkalender</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <a href="https://expo-event.ch/de" target="_blank" class="sk-dropdown__link">ExpoEvent Verband</a>
                  </sk-dropdown-item>
                </sk-dropdown>
                
                <sk-dropdown @dropdown-toggled="dropdownToggled" title="Über uns" v-show="!navOpen">
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/site/extern/about_us.html'}" class="sk-dropdown__link">Geschichte</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/site/extern/about_us.html'}" class="sk-dropdown__link">Team</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/'}" class="sk-dropdown__link">Häufige Fragen</nuxt-link>
                  </sk-dropdown-item>
                  <sk-dropdown-item>
                    <nuxt-link :to="{ path: '/site/extern/werbemoeglichkeiten_werbeformate.html'}" class="sk-dropdown__link">Inserieren</nuxt-link>
                  </sk-dropdown-item>
                </sk-dropdown>

              </div>

              <nuxt-link :to="{ name: 'index' }"
                           title="Home"
                           class="main-header__logo">
              </nuxt-link>

              <div class="main-header__right">

                <site-search v-show="!navOpen"></site-search>

                <button v-show="!navOpen"
                        :class="[
                          'main-header__right__button',
                          'main-header__right__button--user-modal-trigger',
                          'main-header__right__button--active' ]" @click="toggleAuthModal('login')">   
                  <sk-icon :type="'person_outline'" hover-type="fill"></sk-icon>                       
                </button>
                <nuxt-link v-show="!navOpen"
                             class="main-header__right__button main-header__right__button--favourites"
                             :to="{ path: '/site/_eventlokale/favourites.html' }"
                             >
                  <sk-icon :type="'favorite_border'" hover-type="fill"></sk-icon>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide-fade">
      <nav-menu v-if="navOpen"></nav-menu>
    </transition>


  </div>
</template>
