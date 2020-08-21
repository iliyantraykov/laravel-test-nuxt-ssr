<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import EventBus from '@/utils/event-bus';

  @Component
  export default class WishlistCounter extends Vue {

    favoriteActive: boolean;
    currentFavorite: any;
    favorites: any;
    defaultFavorites: any;

    constructor() {
      super();

      this.favoriteActive = false;
      this.currentFavorite = {
        name: '',
      };
      this.favorites = false;
      this.defaultFavorites = {locations: [], providers: []};
    }

    async mounted(){
      this.handleFavorites();
      EventBus.$on('favoriteAdded', this.favoriteAdded);
      EventBus.$on('favoriteRemoved', this.favoriteRemoved);
    }

    handleFavorites() {
      if (localStorage.getItem('favorites')) {
        try {
          // @ts-ignore
          this.favorites = JSON.parse(localStorage.getItem('favorites'));
        } catch(e) {
          localStorage.removeItem('favorites');
        }
      } else {
        this.saveDefaultFavorites();
      }
    }

    saveDefaultFavorites() {
      const parsed = JSON.stringify(this.defaultFavorites);
      localStorage.setItem('favorites', parsed);
    }

    toggleFavorite() {
      this.favoriteActive = !this.favoriteActive;
    }

    closeFavorite(){
      this.favoriteActive = false;
    }

    favoriteAdded(item){
      this.handleFavorites();
      this.favoriteActive = true;
      this.currentFavorite = item;
    }

    favoriteRemoved(){
      this.handleFavorites();
      this.favoriteActive = false;
      this.currentFavorite = {
        name: '',
      };
    }

    closeMobileMenu(){
      EventBus.$emit('closeMobileMenu');
    }
  }
</script>

<template>
    <li class="wishlist" id="wishlist">
        <router-link v-if="favorites"
                     :class="(favorites.locations.length + favorites.providers.length !== 0) ? 'activated' : ''"
                     :to="{ name: 'favorites' }"
                     title="Favorites"
                     @click.native="closeMobileMenu">
            <i v-if="favorites.locations.length + favorites.providers.length !== 0"
               id="wishlistsum">
                {{ favorites.locations.length + favorites.providers.length }}
            </i>
        </router-link>
        <router-link v-else
                     :to="{ name: 'favorites' }" title="Favorites" @click.native="closeMobileMenu">
        </router-link>
        <div v-if="favoriteActive"
             id="addedFav">
            <rp @click="closeFavorite()">
            </rp>
            <u></u>
            <i>
                <b> {{ currentFavorite }} </b>
                wurde deiner Merkliste hinzugefügt.
            </i>
        </div>
    </li>
</template>
