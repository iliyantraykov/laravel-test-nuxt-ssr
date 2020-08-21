import { Vue, Component } from "nuxt-property-decorator";

@Component
export class Box6Mixin extends Vue {

  getBox6TypeLabelStyle(location: Box6SearchItem) {
    let style = "background-color: ";
    style += (location.storer_color) ? location.storer_color : "#00a0ff";
    style += "; color:";
    style += (location.storer_color_2) ? location.storer_color_2 : "#ffffff";
    return style;
  }

  getBox6TypeLabelText(location: Box6SearchItem) {
    if (location.storer_text_2) {
      return location.storer_text_2;
    }
    return location.type;
  }

  getBox6Link(item: Box6SearchItem, backurl, href){
    if(item.box6_providers_rel && item.box6_providers_rel.length > 0){
      let props = {
                    name: 'single.provider.display',
                    params: {
                      categoryId: item.box6_providers_rel[0].category_id as any,
                      categorySlug: item.box6_providers_rel[0].category ? item.box6_providers_rel[0].category.slug : '',
                      providerId: item.box6_providers_rel[0].id as any,
                      providerSlug: (item.box6_providers_rel[0].general_data.slug ? (item.box6_providers_rel[0].general_data.slug+'.html') : item.box6_providers_rel[0].general_data.legacy_slug) as string,
                      backurl: backurl
                    }
                  };
      if(href)
        this.$router.resolve(props).href;
      return props;
    }else if(item.box6_location_rel && item.box6_location_rel.length > 0){
      let props = {
                    name: 'single.location.display',
                    params: {
                      categoryId: item.box6_location_rel[0].category_id as any,
                      categorySlug: item.box6_location_rel[0].category ? item.box6_location_rel[0].category?.slug : '',
                      locationId: item.box6_location_rel[0].id as any,
                      locationSlug: (item.box6_location_rel[0].general_data.slug ? (item.box6_location_rel[0].general_data.slug+'.html') : item.box6_location_rel[0].general_data.legacy_slug) as string,
                      backurl: backurl
                    }
                  };
      if(href)
        this.$router.resolve(props).href;
      return props;
    }else if(item.external_link){
      if(item.external_link.indexOf('http') > -1){
        return item.external_link;
      }else{
        return 'https://'+item.external_link;
      }
    }else if(item.box6_magazines_rel && item.box6_magazines_rel.length > 0){
      let props = {
                    name: 'magazin.detail',
                    params: {
                      magazinId: item.box6_magazines_rel[0].id as any,
                      magazinSlug: (item.box6_magazines_rel[0].slug ? (item.box6_magazines_rel[0].slug + '.html') : item.box6_magazines_rel[0].legacy_slug) as string
                    }
                  };
      if(href)
        this.$router.resolve(props).href;
      return props;
    }
    else{
      return '';
    }
  }

}
