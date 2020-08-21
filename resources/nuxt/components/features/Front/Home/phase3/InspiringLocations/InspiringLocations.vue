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
    export default class InspiringLocations extends Vue {
        @Prop() locations;
        @Prop() loaded;

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="landing-page__inspiring-locations landing-page__section--gallery-slider">
    <content :loaded="loaded" :locations="locations"></content>
  </div>
</template>
