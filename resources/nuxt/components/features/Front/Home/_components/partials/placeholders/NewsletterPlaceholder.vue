<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';

  @Component({
    components: {
    },
  })
  export default class NewsletterPlaceholder extends Vue {
    constructor() {
      super();
    }
  }
</script>

<template>
  <section id="newsletterform" class="newsletter">
    <div class="container">&nbsp;</div>
  </section>
</template>

<style scoped>
  section.newsletter {
    height: 200px;
  }
</style>
