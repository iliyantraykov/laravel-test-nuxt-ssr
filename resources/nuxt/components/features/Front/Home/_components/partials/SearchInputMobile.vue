<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import EventBus from '@/utils/event-bus';

  @Component
  export default class SearchInputMobile extends Vue {

    search: string;

    constructor() {
      super();

      this.search = '';
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

  }
</script>

<template>
    <form @submit.prevent="onSubmit">
        <input type="text"
               v-model="search"
               placeholder="Suchbegriff eingeben..."
               aria-label="Suchbegriff eingeben...">
        <input type="submit"
               value="Suchen"
               aria-label="Suchen"
               style="font-weight: bolder">
    </form>
</template>
