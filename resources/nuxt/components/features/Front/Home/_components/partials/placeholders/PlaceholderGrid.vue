<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  const { State } = namespace('Root');

  @Component({
    components: {
    },
  })
  export default class PlaceholderGrid extends Vue {
    @Prop({ default: 0 }) news;

    constructor() {
      super();
    }
  }
</script>

<template>
    <div>
        <div class="entry wide">
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
        <div class="entry slim">
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
        <div class="entry">
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
        <div class="entry">
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
        <div class="entry slim">
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
        <div v-if="!news" class="entry wide">
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
        <div v-else
             class="entry wide eventjobs">
          <span class="image"></span>
          <div class="text">
            <span class="title h2-size dark-bg"></span>
            <span class="paragraph dark-bg"></span>
            <span class="paragraph dark-bg"></span>
            <span class="paragraph dark-bg"></span>
            <span class="paragraph dark-bg"></span>
            <span class="paragraph dark-bg"></span>
          </div>
        </div>
    </div>
</template>
