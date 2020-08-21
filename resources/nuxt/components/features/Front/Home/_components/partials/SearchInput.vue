<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  import EventBus from '@/utils/event-bus';

  const { Action } = namespace('Root');

  @Component
  export default class SearchInput extends Vue {
    @Action('setFrontActiveClasses') setFrontActiveClasses;

    searchActive: boolean;
    search: string;

    constructor() {
      super();

      this.searchActive = false;
      this.search = '';
    }

    async mounted(){
      EventBus.$on('simpleSearch', this.closeSearch);
    }

    onSubmit() {
      this.$router.push({
        name: 'simplesearch',
        query: { searchitem: this.search }
      });
      setTimeout(() => {
        EventBus.$emit('simpleSearch');
      }, 500);
    }

    toggleSearch() {
      this.setFrontActiveClasses({});
      this.searchActive = !this.searchActive;
      if(this.searchActive)
          this.$nextTick(() => {(this.$refs.search as HTMLElement).focus()});
    }

    closeSearch(){
      this.searchActive = false;
    }
  }
</script>

<template>
    <li class="search">
        <span :class="searchActive ? 'close' : ''" @click="toggleSearch()"></span>
        <form v-if="searchActive"
              @submit.prevent="onSubmit">
            <input type="text"
                   v-model="search"
                   placeholder="Suchbegriff eingeben..."
                   aria-label="Suchbegriff eingeben..."
                   ref="search">
            <input type="submit"
                   value="Suchen"
                   aria-label="Suchen"
                   style="font-weight: bolder">
        </form>
    </li>
</template>
