<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');

    @Component({
        components: {
        },
    })
    export default class Placeholder extends Vue {

        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="landing-page__jumbotron__placeholder">
    <div></div>
  </div>
</template>
