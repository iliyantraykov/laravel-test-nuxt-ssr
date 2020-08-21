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
    export default class LatestEventJobs extends Vue {
        @Prop() loaded;
        @Prop() jobs;

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="landing-page__latest-jobs">
    <content :loaded="loaded" :jobs="jobs"></content>
  </div>
</template>
