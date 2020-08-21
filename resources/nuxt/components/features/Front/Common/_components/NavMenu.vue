<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace} from 'vuex-class';
    import PackageDeals from "@/components/features/Front/Home/phase3/PackageDeals/Content.vue";
    import PackageDealsPlaceholder from "@/components/features/Front/Home/phase3/PackageDeals/Placeholder.vue";
    import LookingForSomething from "./LookingForSomething.vue";
    const { State } = namespace('Root');
    const { Action } = namespace('Root');

    import { Fetch } from '@/services';
    import container from "@/config/ioc_config";
    import SERVICE_IDENTIFIER from "@/config/constants/Identifiers";

    @Component({
        components: {
            LookingForSomething,
            PackageDeals,
            PackageDealsPlaceholder
        },
    })
    export default class NavMenu extends Vue {
        @Action('setPackageDeals') setPackageDeals;
        @State('packageDeals') packageDeals;

        fetch: Fetch = container.get<Fetch>(SERVICE_IDENTIFIER.FETCH);
        package_deals: Array<any> = [];
        loaded: boolean = false;

        constructor() {
            super();
        }

        async mounted() {
            if (this.isObjectEmpty(this.$store.state.packageDeals)) {
                //TODO we should be able to remove await from here
                await this.fetch.packageDeals(1).then((response) => {
                    this.package_deals = response.data.PACKAGE_DEALS;
                    //this.setPackageDeals(this.package_deals);
                    this.$store.commit('setPackageDeals', this.package_deals)
                }).catch((error) => {
                    console.log(error)
                });
            }
            this.loaded = true;
        }

        isObjectEmpty(obj) {
            for(var key in obj) {
                if(obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }
    }
</script>

<template>
  <div class="main-nav">
    <div class="main-nav__content">
      <package-deals :loaded="loaded" :package_deals="packageDeals" slider-bg="white-bg"></package-deals>
      <looking-for-something></looking-for-something>
    </div>
    <div class="main-nav__footer">
      <span class="main-nav__footer__text">Auf eventlokale.ch werden jährlich über 30’000 Events erfolgreich geplant.</span>
      <router-link :to="{path: '/site/extern/about_us.html'}" class="main-nav__link text-link-reverse">Erfahre mehr über uns.</router-link>
    </div>
  </div>
</template>
