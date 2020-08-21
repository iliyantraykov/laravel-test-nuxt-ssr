<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import SkPlaceholder from '@/components/Placeholder/Placeholder.vue';
    const { State } = namespace('Root');

    @Component({
        components: {
          SkPlaceholder
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

      <div class="col-sm-6 offset-sm-1">
        <sk-placeholder type="header" variation="h3"></sk-placeholder>
        <sk-placeholder type="paragraph" :count="2"></sk-placeholder>
        <div class="landing-page__about__columns">
          <div class="landing-page__about__columns__single">
            <sk-placeholder type="paragraph" :count="2"></sk-placeholder>
            <sk-placeholder type="button" variation="small"></sk-placeholder>
          </div>
          <div class="landing-page__about__columns__single">
            <sk-placeholder type="paragraph" :count="2"></sk-placeholder>
            <sk-placeholder type="button" variation="small"></sk-placeholder>
          </div>
          <div class="landing-page__about__columns__single">
            <sk-placeholder type="paragraph" :count="2"></sk-placeholder>
            <sk-placeholder type="button" variation="small"></sk-placeholder>
          </div>
        </div>
      </div>
      <div class="col-sm-4">

      </div>

    </div>
  </div>
</template>
