import { Vue, Component } from "nuxt-property-decorator";

@Component
export class PaginatorMixin extends Vue {
  endpoint: string = '';

  pagination: PaginationObject;
  selectedPage: number;

  constructor() {
    super();
    this.pagination = {
      lastPage: 0,
      currentPage: 0,
      total: '',
      lastPageUrl: '',
      nextPageUrl: '',
      prevPageUrl: '',
      from: 0,
      to: 0,
      searchTerm: ''
    };
    this.selectedPage = 0;
  }

  configPagination(data: PaginationObjectServer): void {
    this.pagination.lastPage = data.last_page;
    this.pagination.currentPage = data.current_page;
    this.pagination.total = data.total;
    this.pagination.lastPageUrl = data.last_page_url;
    this.pagination.nextPageUrl = data.next_page_url;
    this.pagination.prevPageUrl = data.prev_page_url;
    this.pagination.from = data.from;
    this.pagination.to = data.to;
    this.pagination.searchTerm = data.searchTerm;
  }

  async loadListItems(url: string) {
    throw new Error('Not implemented !');
  }

  addToHistory(page: number) {
    let next = "";
    if(this.$route.path.indexOf("page=") !== -1) {
        next = this.$route.path.replace(/page=([0-9])+/gi, "page=" + String(page));
    }
    else {
        next = this.$route.path + "/page=" + String(page);
    }
    if(this.pagination.searchTerm){
      next += "?searchitem="+this.pagination.searchTerm;
    }
    //Avoid rerendering of component caused by <code>this.$router.replace({ path: next });</code> or <code>this.$router.replace({ path: next });</code>
    //this.$router.replace({ path: next });
    history.pushState(
      {},
      '',
      next
    );
  }

  async changePage(page: number) {
    let url = this.endpoint +'/draw' +'?page='+ String(page);
    this.pagination.currentPage = page;
    this.loadListItems(url);
    this.addToHistory(page);
  }

  async nextPage(page: string) {
    await this.changePage(Number(page.split("=")[1]));
  }

  async prevPage(page: string) {
    await this.changePage(Number(page.split("=")[1]));
  }

}