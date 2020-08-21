<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  const { State } = namespace('Root');

  @Component({
    components: {
    },
  })
  export default class SliderPlaceholder extends Vue {
    @Prop({ default: 0 }) news;
    @Prop() sliderClass;

    constructor() {
      super();
    }
  }
</script>

<template>
    <div>
      <div :class="sliderClass + ' slider'">
        <div class="sliderbox partnersliderbox">

          <div class="hooper hooper-placeholder placeholder" style="height: auto">
            <div class="hooper-list">
              <ul class="hooper-track">

                <li class="hooper-slide" v-for="i in 4">
                  <div class="location">
                    <span class="image"></span>
                    <span class="text">
                      <span class="title h3-size"></span>
                      <span class="paragraph"></span>
                    </span>
                  </div> <!-- location -->
                </li> <!-- hooper-slide -->

              </ul> <!-- hooper-track -->
            </div> <!-- hooper-list -->
          </div> <!-- hooper -->

        </div> <!-- .sliderbox .partnersliderbox -->
      </div> <!-- .slider -->
    </div>
</template>
