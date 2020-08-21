import { Vue, Component } from "nuxt-property-decorator";

@Component
export class TaxonomiesMixin extends Vue {

  taxonomies: TaxonomyMap = {} as any;
  filter_taxonomies: Taxonomy[] = [];
  event_taxonomies: Taxonomy[] = [];
  regions: Taxonomy[] = [];
  events: Taxonomy[] = [];
  services: Taxonomy[] = [];
  buildings: Taxonomy[] = [];
  taxonomy_locations: Taxonomy[] = [];
  infrastructures: Taxonomy[] = [];
  technologies: Taxonomy[] = [];
  furniture: Taxonomy[] = [];
  surroundings: Taxonomy[] = [];
  prices: Taxonomy[] = [];
  styles: Taxonomy[] = [];
  operations: Taxonomy[] = [];
  offers: Taxonomy[] = [];

  constructor() {
    super();
  }

  async fetchTaxonomies() {
    if (this.isObjectEmpty(this.$store.state.allTaxonomies)) {
      await this.$axios.$get('/guest/location/all-taxonomies')
        .then((response) => {
          this.mapTaxonomiesToVariables(response.data);
          this.$store.commit('setAllTaxonomies', response.data)
          //this.setAllTaxonomies(response.data);
          return;
        });
    } else {
      console.log('Full');
      this.mapTaxonomiesToVariables(this.$store.state.allTaxonomies);
      return;
    }
  }

  isObjectEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  mapTaxonomiesToVariables(response){
    switch (this.$store.state.activeCategory) {
      case 1:
        this.regions = response.taxonomies.region_swiss;
        break;
      case 2:
        this.regions = response.taxonomies.region_german;
        break;
      case 3:
        this.regions = response.taxonomies.region_austrian;
        break;
      default:
        this.regions = response.taxonomies.regions;
        break;
    }
    this.filter_taxonomies = response.filter_taxonomies;
    this.event_taxonomies = response.event_taxonomies;
    this.taxonomies = response.taxonomies;
    this.events = response.taxonomies.suitable_for;
    this.services = response.taxonomies.services;
    this.buildings = response.taxonomies.buildings;
    this.taxonomy_locations = response.taxonomies.locations;
    this.infrastructures = response.taxonomies.infrastructures;
    this.technologies = response.taxonomies.technologies;
    this.furniture = response.taxonomies.furniture;
    this.surroundings = response.taxonomies.surroundings;
    this.prices = response.taxonomies.prices;
    this.styles = response.taxonomies.styles;
    this.operations = response.taxonomies.operations;
    this.offers = response.taxonomies.offers;
  }

  mapRegion(id){
    let slug = '';
    this.regions.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapService(id){
    let slug = '';
    this.services.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapEvent(id){
    let slug = '';
    this.events.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapBuilding(id){
    let slug = '';
    this.buildings.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapLocation(id){
    let slug = '';
    this.taxonomy_locations.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapInfrastructure(id){
    let slug = '';
    this.infrastructures.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapTechnology(id){
    let slug = '';
    this.technologies.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapFurniture(id){
    let slug = '';
    this.furniture.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapSurrounding(id){
    let slug = '';
    this.surroundings.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapPrice(id){
    let slug = '';
    this.prices.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapStyle(id){
    let slug = '';
    this.styles.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapOperation(id){
    let slug = '';
    this.operations.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

  mapOffer(id){
    let slug = '';
    this.offers.forEach((taxonomy) => {
      if (taxonomy.id == id) {
        slug = taxonomy.slug || slug;
      }
    });
    return slug;
  }

}
