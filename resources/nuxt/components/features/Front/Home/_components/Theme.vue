<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  import EventBus from '@/utils/event-bus';
  import {viewportCheck} from '@/utils/viewportData';
  import getPhotoPath from '@/utils/imageProcessing';

  const { State } = namespace('Root');

  @Component
  export default class Theme extends Vue {
    @State('activeCategory') activeCategory;

    themetext_style: string;
    themebox_style: string;
    image_style: string;
    video: string;
    image: string;
    loaded: boolean;
    initialTop: number;
    h1: string;
    text: string;
    display_video: boolean = true;
    videoSrc: string;
    imageSrc: string;

    constructor() {
      super();
      this.themetext_style = 'filter: opacity(100%);';
      this.themebox_style = 'filter: opacity(100%);';
      this.image_style = 'top: -10%;';
      this.loaded = false;
      this.video = '';
      this.image = '';
      this.videoSrc ='';
      this.imageSrc ='';
      this.initialTop = 230;
      this.h1 = 'Das grösste Eventportal der Schweiz.';
      this.text = 'Mehr als 4\'200 Locations und Dienstleister für deinen Event.';
      // Check if video is visible
      this.handleResize();
    }

    async mounted() {
      let el  = document.getElementsByClassName('themetext')[0] as HTMLElement;
      let style = getComputedStyle(el);
      let top =  style.top ? parseInt(style.top) : 0;
      this.initialTop =  top ? top : this.initialTop;
      window.addEventListener('resize', this.handleResize);
        // EventBus.$on('activeCategoryChanged', this.setActiveCategory);
      this.setActiveCategory();
        Vue.nextTick(() => {
            this.fetchData();
        })
    }

    async fetchData(): Promise<void> {
      try {
        this.$axios.$get('/guest/homepage/header/get')
          .then((response) => {
            this.getHeaderImage(response.data.image);
            this.getHeaderVideo(response.data.video);
            this.loaded = true;
          });
      } catch (e) {
      }
    }

    getHeaderVideo(video) {
      if (video && video.length) {
        this.videoSrc = "storage/"+video[0].id+"/"+video[0].file_name;
      }
      this.showHeaderVideo();
    }

    getHeaderImage(image) {
      if (image && image.length) {
        let img = image[0];
        let size = 1920;
        if (screen.width < 640) {
          size = 640;
        }else if (screen.width < 1280) {
          size = 1280;
        }
        this.imageSrc =  getPhotoPath(img.id + ',' + img.name + ',' + img.mime_type, size);
      }
    }

    manipulateStyles() {
      let opacity = 100;
      let top = this.initialTop;
      let image_top = -10;
      opacity = opacity - window.scrollY/5.5;
      top = top + (window.scrollY/7)*3.8;
      image_top = image_top + window.scrollY/12.5;
      this.themetext_style = 'top: '+top+'px; filter: opacity('+opacity+'%);';
      this.themebox_style = 'filter: opacity('+opacity+'%);';
      this.image_style = 'top: '+image_top+'%;';
    }

    handleScroll (event) {
      try{
        this.manipulateStyles();
      } catch(e) {}
    }

    fixTopThemeText (event) {
      let el = document.getElementsByClassName('themetext')[0] as HTMLElement;
      el.style.top = '';
      let style = getComputedStyle(el);
      let top =  style.top ? parseInt(style.top) : 0;
       //$('.themetext').css('top', '');
      //let top =  parseInt($('.themetext').css('top'));
      this.initialTop =  top ? top : 230;
      if (window.scrollY > 0) {
        this.handleScroll(event);
      }
      this.showHeaderVideo();
    }

    showHeaderVideo(){
      if(viewportCheck() > 320 && this.video == ''){
        this.video = this.videoSrc;
        this.image = this.imageSrc;
      }
    }

    handleResize(){
      this.display_video = screen.width > 600;
    };

    created () {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.fixTopThemeText);
    }

    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.fixTopThemeText);
    }

    setActiveCategory() {
      switch (this.activeCategory) {
        case 1: {
          this.h1 = 'Das grösste Eventportal der Schweiz.';
          this.text = 'Mehr als 4\'200 Locations und Dienstleister für deinen Event.';
          break;
        }
        case 2: {
          this.h1 = 'Dein Moment. Dein Event.';
          this.text = 'Organisiere einzigartige Anlässe in wenigen Klicks.';
          break;
        }
        case 3: {
          this.h1 = 'Dein Moment. Dein Event.';
          this.text = 'Organisiere einzigartige Anlässe in wenigen Klicks.';
          break;
        }
        default: {
          this.h1 = 'Das grösste Eventportal der Schweiz.';
          this.text = 'Mehr als 4\'200 Locations und Dienstleister für deinen Event.';
          break;
        }
      }
    }
  }
</script>

<template>
    <div>
        <section class="theme">
            <div class="themetext" :style='themetext_style'>
                <h1>{{h1}}</h1>
                {{text}}
            </div>
            <div class="bx-wrapper" style="max-width: 100%; margin: 0px auto;">
                <div class="bx-viewport" aria-live="polite" style="width: 100%; overflow: hidden; position: relative; height: 630px; max-height: 100%;">
                    <div class="themeslider" style="width: auto; position: relative;">
                        <div class="themebox themebox-custom" :style='themebox_style' aria-hidden="false">
                            <div v-if="display_video" class="image" :style='image_style'>
                                <video v-if="video || image" autoplay="" muted="" loop="" playsinline="" :poster="image">
                                  <source v-if="video" :src="video" type="video/mp4">
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
