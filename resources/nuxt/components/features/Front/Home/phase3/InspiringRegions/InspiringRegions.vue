<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');
    import  Content from './Content.vue';
    import Placeholder from './Placeholder.vue';

    @Component({
        components: {
           Content
        },
    })
    export default class InspiringRegions extends Vue {
        @Prop() regions;
        @Prop() loaded;

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="landing-page__inspiring-regions landing-page__section--gallery-slider">
    <content :loaded="loaded" :regions="regions"></content>
  </div>
</template>
