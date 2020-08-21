<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');
    import Content from './Content.vue';
    import Placeholder from './Placeholder.vue';

    @Component({
        components: {
            Content
        },
    })
    export default class Jumbotron extends Vue {
        @Prop() loaded;
        @Prop() header_items;
        @Prop() result_counts;

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="landing-page__jumbotron">
    <content :loaded="loaded"
                    :header_items="header_items"
                    :result_counts="result_counts"></content>
  </div>
</template>
