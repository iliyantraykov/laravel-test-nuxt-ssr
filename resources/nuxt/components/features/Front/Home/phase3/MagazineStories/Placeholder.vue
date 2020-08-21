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
      <div class="col-12">
        <div class="tiny-slider tiny-slider--light-bg tiny-slider__placeholder">

          <div class="tiny-slider__header">

            <div class="tiny-slider__header__left">
              <div class="tiny-slider__header__left__inner">
                <sk-placeholder type="header" variation="h1"></sk-placeholder>
              </div>
              <sk-placeholder type="button" variation="small"></sk-placeholder>
            </div>

            <div class="tiny-slider__navigation">
              <sk-placeholder type="tiny-slider" variation="carousel-navigation"></sk-placeholder>
            </div>

          </div>

          <sk-placeholder type="cards" variation="type-1" :count="2"></sk-placeholder>

        </div>
      </div>
    </div>
  </div>
</template>
