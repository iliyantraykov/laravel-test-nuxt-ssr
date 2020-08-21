<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';

  @Component({
    components: {
    },
  })
  export default class FooterPlaceholder extends Vue {
    constructor() {
      super();
    }
  }
</script>

<template>
  <div>
    <footer class="sitefoot">
      <div class="container">&nbsp;</div>
    </footer>
  </div>
</template>

<style scoped>
  footer.sitefoot {
    height: 375px;
  }
</style>
