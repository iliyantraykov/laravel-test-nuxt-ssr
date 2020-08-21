import { injectable } from 'inversify';
import  FetchInterface  from './FetchInterface';
import axios, { AxiosResponse } from 'axios';
// some JS file
//import store from './../../store'; // path to your Vuex store

@injectable()
export default class Fetch implements FetchInterface {
  constructor() {

  }

  async homepageItems($activeCategory): Promise<AxiosResponse> {
    return await axios.post('https://dev.eventlokale.ch/api/guest/homepage/items', { activeCategory: $activeCategory });
  }

  async packageDeals($activeCategory): Promise<AxiosResponse> {
    return await axios.post('/guest/homepage/package-deals', { activeCategory: $activeCategory });
  }

  async partners(): Promise<AxiosResponse> {
    return await axios.get('/guest/location/premium');
  }

  async domains(): Promise<AxiosResponse> {
    return await axios.get('/guest/homepage/domains');
  }

  async authValidationRules(): Promise<AxiosResponse> {
    return await axios.get('/guest/user/auth/validation-rules');
  }

  fetchTaxonomies() {
    //const allTaxonomies = this.$store.state.allTaxonomies;
    //const activeCategory = this.$store.state.activeCategory;
    // do stuff with allTaxonomies
    return [];
  }
}
