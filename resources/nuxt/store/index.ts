export const state = () => ({
    appName: '',
    backUrl: '',
    csrfToken: '',
    homeItems: [],
    menu: [],
    settings: {},
    activeClasses: {},
    bodyClasses: {
      modalOpen : false,
      navMenuOpen : false,
      navSearchActive : false,
    },
    activeCategory: 1,
    isTransparent: 0,
    frontActiveClasses: {},
    project: {},
    entry: {
      type: '',
      type_id: 2,
      release_active: false,
      category_id: 1,
      full_name: '',
      description: '',
      street: '',
      street_number: '',
      zip: '',
      place: '',
      region: ''
    },
    allTaxonomies: {},
    packageDeals: {}
});


export const mutations = {
    setBackUrl(state, obj){
        state.backUrl = obj;
    },
      
    setData(state, obj) {
        const token = document.head.querySelector('meta[name="csrf-token"]');
      
        if (token) {
          obj.csrfToken = (<HTMLMetaElement>token).content;
        }
      
        Object.assign(state, { ...obj });
     },
      
    setMenu(state, obj){
        state.menu = obj;
    },
      
    setActiveCategory(state, obj){
        state.activeCategory = obj;
    },
      
    setActiveClasses(state, obj){
        state.activeClasses = obj;
    },
      
    setBodyClasses(state, obj){
        state.bodyClasses = obj;
    },
      
    setFrontActiveClasses(state, obj){
        state.frontActiveClasses = obj;
    },
      
    setProject(state, obj){
        state.project = obj;
    },
      
    setEntry(state, obj){
        state.entry = obj;
    },
      
    setTransparent(state, obj){
        state.isTransparent = obj;
    },
      
    setAllTaxonomies(state, obj){
        state.allTaxonomies = obj;
    },
      
    setPackageDeals(state, obj){
        state.packageDeals = obj;
    }
  }