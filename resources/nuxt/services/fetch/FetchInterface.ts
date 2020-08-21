import { AxiosResponse } from 'axios';

export default interface FetchInterface {
  homepageItems($activeCategory): Promise<AxiosResponse>;
  fetchTaxonomies(): Array<any>;
}
