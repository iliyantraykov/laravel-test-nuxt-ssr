<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');
    import Content from './Content.vue';

    @Component({
      components: {
        Content
      },
    })
    export default class MightBeInterested extends Vue {
        @Prop() loaded;

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="landing-page__link-bar">
    <content></content>
  </div>
</template>
