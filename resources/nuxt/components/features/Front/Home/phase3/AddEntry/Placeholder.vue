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

      <div class="col-sm-6 offset-sm-1">
        <sk-placeholder type="headers" variation="h4"></sk-placeholder>
        <sk-placeholder type="headers" variation="h3"></sk-placeholder>
      </div>

      <div class="col-sm-4">
        <sk-placeholder type="headers" variation="h6"></sk-placeholder>
        <sk-placeholder type="paragraph" :count="1"></sk-placeholder>
      </div>

    </div>
  </div>
</template>
