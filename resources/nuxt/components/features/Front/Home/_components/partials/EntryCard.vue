<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
  import { Facebook, Twitter, Google,Email } from "vue-socialmedia-share";
  import LazyImage from "@/features/Front/Home/_components/partials/LazyImage.vue";
  import getPhotoPath from '@/utils/imageProcessing';
  declare const baseMetaUrl;
  declare const baseDomains;

  @Component({
    components: {
      Facebook,
      Twitter,
      Google,
      LazyImage,
      Email
    }
  })
  export default class EntryCard extends Vue {
    @Prop() item;
    @Prop() type;
    @Prop() class_name;

    location: any;
    provider: any;
    magazine: any;
    external: any;
    link: any;
    loaded: boolean;
    share_open: boolean;

    constructor() {
      super();
      this.location = false;
      this.provider = false;
      this.magazine = false;
      this.external = false;
      this.link = 'https://www.eventlokale.ch/';
      this.loaded = false;
      this.share_open = false;
    }

    async mounted() {
      if(this.item){
        this.fetchData();
      }
      
      document.addEventListener('click', this.documentClick);
    }

    destroyed () {
      document.removeEventListener('click', this.documentClick);
    }

    @Watch('item')
    onPropertyChanged(value, oldValue) {
      if(value){
        this.fetchData();
      }
    }

    async fetchData(): Promise<void> {
      try {
        if (this.item.locations && this.item.locations.length) {
          this.location = this.item.locations[0];
          this.loaded = true;
        } else if (this.item.providers && this.item.providers.length) {
          this.provider = this.item.providers[0];
          this.loaded = true;
        }else if(this.item.external_link){
          this.external = true;
          this.loaded = true;
        } else if (this.item.magazines && this.item.magazines.length) {
          this.magazine = this.item.magazines[0];
          this.loaded = true;
        } else {
          this.external = true;
          this.loaded = true;
        }
      } catch (e) {
      }
    }

    getFirstPhoto(item) {
      if ((item.image && item.image.length) || (item.photos && item.photos.length)) {
        let image = (item.image && item.image.length) ? item.image[0] : item.photos[0];
        return getPhotoPath(image.id + ',' + image.name + ',' + image.mime_type);
      } else {
        return "images/pre.png";
      }
    }

    getLink(item, share = 0){
      if(item.link){
        if(item.providers && item.providers.length > 0){
          let props = this.$router.resolve({
                        name: 'single.provider.display',
                        params: { categoryId: item.link.category_id, categorySlug: item.link.category_slug, providerId: item.link.provider_id, providerSlug: (item.link.slug ? (item.link.slug+'.html') : item.link.legacy_slug) }
                      });
          if(share){
            let domain = baseDomains['ch'];

            if(item.link.category_id == 2){
              domain = baseDomains['de'];
            }else if(item.link.category_id == 3){
              domain = baseDomains['at'];
            }

            let lastChar = domain.slice(-1);
            if (lastChar == '/') {
                domain = domain.slice(0, -1);
            }
            return domain+props.href;
          }else{
            return props.href;
          }
        }else if(item.locations && item.locations.length > 0){
          let props = this.$router.resolve({
                        name: 'single.location.display',
                        params: { categoryId: item.link.category_id, categorySlug: item.link.category_slug, locationId: item.link.location_id, locationSlug: (item.link.slug ? (item.link.slug+'.html') : item.link.legacy_slug) }
                      });
          if(share){
            let domain = baseDomains['ch'];

            if(item.link.category_id == 2){
              domain = baseDomains['de'];
            }else if(item.link.category_id == 3){
              domain = baseDomains['at'];
            }

            let lastChar = domain.slice(-1);
            if (lastChar == '/') {
                domain = domain.slice(0, -1);
            }
            return domain+props.href;
          }else{
            return props.href;
          }
        }else if(item.external_link){
          if(item.external_link.indexOf('http') > 0){
            return item.external_link;
          }else{
            return 'https://'+item.external_link;
          }

        }else if(item.magazines && item.magazines.length > 0){
          let props = this.$router.resolve({
                        name: 'magazin.detail',
                        params: { magazinId: item.link.id, magazinSlug: (item.link.slug ? (item.link.slug+'.html') : item.link.legacy_slug) }
                      });
          if(share){
            return baseMetaUrl+props.href;
          }else{
            return props.href;
          }
        }
      }else{
        return "";
      }
    }

    getMailSubject(item){
        return 'Gefunden auf eventlokale.ch: '+this.item.name;
    }

    getMailBody(item){
        return 'Gefunden auf eventlokale.ch: '+this.item.name + '(' +  this.getLink(item,1) + ')';
    }

    toExternalLink(link) {
      window.open(link,'_blank');
    }

    openShare(){
      this.share_open = !this.share_open;
    }

    async likeComponent(id: number): Promise<void> {

      //send request for web route
      // api routes don't support session
      let webUrl = (this.$axios.defaults.baseURL ? this.$axios.defaults.baseURL.replace('api', '') : '/');

      let likeUrl = 'homepage/'+id+'/like';
      if(this.magazine){
        likeUrl = 'magazine/'+this.magazine.relation_id+'/like';
      }

      this.$axios({method: 'post', url: likeUrl, baseURL: webUrl })
        .then(response => {
          const { status, data } = response;
          switch (status) {
            case 200: {
              if (data.errors) {
                // TODO: handle error message
                console.log('error like this post');
                return;
              }
              if(this.magazine){
                this.item.link.likes = data.likes;
              }else{
                this.item.likes = data.likes;
              }
              break;
            }
            default: {
              // TODO: handle error message
              console.log('error like this post');
              return;
            }
          }
        })
        .catch(error => {});
    }

    documentClick(e){
        let el = this.$refs.dropdown as Element;
        let target = e.target;
        if (el && target && ( el !== target) && !el.contains(target)) {
          this.share_open = false;
        }
    }

  }
</script>

<template>
  <div v-if="loaded && item"
       :class="class_name">
    <router-link v-if="location"
                 class="image"
                 :to="getLink(item)"
                 :title="item.name"
                 target="_self">
      <u>
        <i>
          <lazy-image
            :src="getFirstPhoto(item)"
            :alt="item.name"
            :image_style="'display: inline;'">
          </lazy-image>
        </i>
      </u>
    </router-link>
    <router-link v-else-if="provider"
                 class="image"
                 :to="getLink(item)"
                 :title="item.name"
                 target="_self">
      <u>
        <i>
          <lazy-image
            :src="getFirstPhoto(item)"
            :alt="item.name"
            :image_style="'display: inline;'">
          </lazy-image>
        </i>
      </u>
    </router-link>
    <a v-else-if="external"
       class="image"
       :href="getLink(item)"
       :title="item.name"
       target="_blank">
      <u>
        <i>
          <lazy-image
            :src="getFirstPhoto(item)"
            :alt="item.name"
            :image_style="'display: inline;'">
          </lazy-image>
        </i>
      </u>
    </a>
    <router-link v-else-if="magazine"
                 class="image"
                 :to="getLink(item)"
                 :title="item.name"
                 target="_self">
      <u>
        <i>
          <lazy-image
            :src="getFirstPhoto(item)"
            :alt="item.name"
            :image_style="'display: inline;'">
          </lazy-image>
        </i>
      </u>
    </router-link>


    <router-link v-if="location"
                 class="text"
                 :to="getLink(item)"
                 :title="item.name"
                 target="_self">
      <span></span>
      <b>{{ item.name }}</b>
      {{ item.short }} ...
    </router-link>
    <router-link v-else-if="provider"
                 class="text"
                 :to="getLink(item)"
                 :title="item.name"
                 target="_self">
      <span></span>
      <b>{{ item.name }}</b>
      {{ item.short }} ...
    </router-link>
    <a v-else-if="external"
       class="text"
       :href="getLink(item)"
       :title="item.name"
       target="_blank">
      <span></span>
      <b>{{ item.name }}</b>
      {{ item.short }} ...
    </a>
    <router-link v-else-if="magazine"
                 class="text"
                 :to="getLink(item)"
                 :title="item.name"
                 target="_self">
      <span></span>
      <b>{{ item.name }}</b>
      {{ item.short }} ...
    </router-link>
    <div v-else
         class="text"
         style="cursor: pointer;"
         @click="toExternalLink(item.external_link)">
      <span></span>
      <b>{{ item.name }}</b>
      {{ item.short }} ...
    </div>
    <a class="like ajaxlink" rel="nofollow" title="Like" @click="likeComponent(item.id)">
      <span v-if="magazine">{{item.link.likes}}</span>
      <span v-else>{{item.likes}}</span>
    </a>
    <div class="share_container" ref="dropdown">
      <span class="share" @click="openShare()"></span>
      <ul v-bind:style="[share_open ? {display:'block'} : {display:'none'}]">
        <li>
          <h4>Eintrag teilen</h4>
        </li>
        <li class="shariff">
          <ul class="theme-color orientation-horizontal">
            <li class="shariff-button mail">
              <email :url="getLink(item)" scale="3" :subject="getMailSubject(item)" :body="getMailBody(item)"></email>
              <!--<google :url="getLink(item,1)" scale="3"></google>-->
            </li>
            <li class="shariff-button facebook">
              <facebook :url="getLink(item,1)" scale="3"></facebook>
            </li>
            <li class="shariff-button twitter">
              <twitter :url="getLink(item,1)" scale="3" :title="item.name"></twitter>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div v-else
       :class="class_name + ' placeholder'">
    <span class="image"></span>
    <div class="text">
      <span class="title h2-size"></span>
      <span class="paragraph"></span>
      <span class="paragraph"></span>
      <span class="paragraph"></span>
    </div>
    <span class="like ajaxlink">
        <span></span>
    </span>
    <div class="share_container">
      <span class="share"></span>
    </div>
  </div>
</template>
