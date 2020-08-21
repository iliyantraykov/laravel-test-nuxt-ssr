<template>
  <div>
  <jumbotron :header_items="header_items" :result_counts="result_counts" :loaded="loaded"></jumbotron>
    <magazine-stories :magazines="magazines" :loaded="loaded"></magazine-stories>
    <might-be-interested :loaded="loaded"></might-be-interested>
    <inspiring-locations :locations="locations" :loaded="loaded"></inspiring-locations>
    <package-deals :package_deals="package_deals" :loaded="loaded"></package-deals>
    <event-partners :providers="providers" :loaded="loaded"></event-partners>
    <inspiring-regions :regions="regions" :loaded="loaded"></inspiring-regions>
    <latest-event-jobs :jobs="jobs" :loaded="loaded"></latest-event-jobs>
    <about-event-lokale :loaded="loaded" ></about-event-lokale>
    <add-entry :loaded="loaded"></add-entry>
  </div>  
</template>

<script lang="ts">
import {Component, mixins, Vue} from 'nuxt-property-decorator';
import BasePage from '@/components/BasePage.vue';
import { TaxonomiesMixin } from "@/mixins";
import { Jumbotron, MagazineStories, MightBeInterested, InspiringLocations, PackageDeals, EventPartners, InspiringRegions, LatestEventJobs, AboutEventLokale, AddEntry } from "@/components/features/Front/Home/phase3/";
import { Fetch } from '@/services';
import container from "@/config/ioc_config";
import SERVICE_IDENTIFIER from "@/config/constants/Identifiers";

declare const baseMetaUrl;
  declare const baseDomains;

@Component({
  components: {
    AddEntry,
      AboutEventLokale,
      Jumbotron,
      MagazineStories,
      MightBeInterested,
      InspiringLocations,
      PackageDeals,
      EventPartners,
      InspiringRegions,
      LatestEventJobs
  }
})

export default class IndexPage extends BasePage {

    token: any = '';
    headful: any;
    // TODO These and the taxonomy mixin should probably be moved to the service and populated on load if needed
    // TODO or this could be done only in a search component if they are not needed on the homepage anymore for the filters
    // regions: Array<Taxonomy>;
    // events: Array<Taxonomy>;
    // services: Array<Taxonomy>;
    loaded: boolean = false;

    fetch: Fetch = container.get<Fetch>(SERVICE_IDENTIFIER.FETCH);
    providers: Array<any> = [];// TODO create typings
    locations: Array<any> = [];
    regions: Array<any> = [];
    magazines: Array<any> = [];
    jobs: Array<any> = [];
    package_deals: Array<any> = [];
    header_items: Array<any> = [];
    result_counts: Array<any> = [];

    constructor() {
      super();
      this.headful = {
        url : '',
        title : '',
        description : '',
        keywords : '',
        image : '',
        alternateCH : '',
        alternateDE: '',
        alternateAT: ''
      };
      // this.regions = [];
      // this.events = [];
      // this.services = [];
    }

    async mounted() {
      // await this.fetchTaxonomies();

      // TODO send actual active category to this function for some reason its undefined
      await this.fetch.homepageItems(this.$store.state.activeCategory).then((response) => {
        this.providers = response.data.BOX_PROVIDER;
        this.locations = response.data.BOX_LOCATION;
        this.regions = response.data.BOX_REGION;
        this.magazines = response.data.BOX_MAGAZINE;
        this.jobs = response.data.JOBS;
        this.package_deals = response.data.PACKAGE_DEALS;
        this.header_items = response.data.HEADER;
        this.result_counts = response.data.RESULT_COUNTS;
      }).catch((error) => {
        console.log(error)
      });


      // this.fetch.fetchTaxonomies();

      this.loaded = true;

      // What does this do?
      if(this.$route.query.token) {
        this.token = this.$route.query.token;
      }
    }
}
</script>
