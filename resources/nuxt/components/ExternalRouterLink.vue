<script lang="ts">
  import { namespace } from 'vuex-class';
  import {Component, Prop, Vue} from 'nuxt-property-decorator';

  @Component
  export default class ExternalRouterLink extends Vue {
    @Prop() external;
    @Prop() to;

    constructor() {
      super();
    }
  }
</script>

<template>
  <a v-if="external" :href="to" target="_blank" role="link">
    <slot></slot>
  </a>
  <router-link v-else :to="to" role="link">
    <slot></slot>
  </router-link>
</template>
