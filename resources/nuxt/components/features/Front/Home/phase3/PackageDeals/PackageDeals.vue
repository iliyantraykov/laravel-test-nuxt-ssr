<script lang="ts">
    import { Component, Emit, Vue, Prop } from 'nuxt-property-decorator';
    import Content from './Content.vue';

    @Component({
        components: {
         Content,
        },
    })
    export default class PackageDeals extends Vue {
        @Prop() package_deals;
        @Prop() loaded;

        constructor() {
            super();
        }
    }
</script>
<template>
  <div class="landing-page__package-deals">
    <content :loaded="loaded"
                    :package_deals="package_deals"
                    slider-bg="light-bg"></content>
  </div>
</template>

