<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import SkPlaceholder from '@/components/Placeholder/Placeholder.vue';
    const { State } = namespace('Root');

    @Component({
        components: {
          SkPlaceholder,
        },
    })
    export default class Placeholder extends Vue {

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-3">
        <sk-placeholder type="header" variation="h4"></sk-placeholder>
      </div>
      <div class="col-sm-9">
        <div class="landing-page__link-bar__buttons">
          <sk-placeholder type="button" variation="small"></sk-placeholder>
          <sk-placeholder type="button" variation="small"></sk-placeholder>
          <sk-placeholder type="button" variation="small"></sk-placeholder>
          <sk-placeholder type="button" variation="small"></sk-placeholder>
        </div>
      </div>
    </div>
  </div>
</template>
