<!--<script lang="ts">-->
<!--  import { Component, Prop, Vue } from 'nuxt-property-decorator';-->
<!--  import { namespace } from 'vuex-class';-->
<!--  import LazyLoadDirective from "@/utils/LazyLoadDirective";-->

<!--  const { State } = namespace('Root');-->

<!--  @Component({-->
<!--    components: {-->
<!--    },-->
<!--    directives: {-->
<!--      lazyload: LazyLoadDirective-->
<!--    }-->
<!--  })-->
<!--  export default class ImageItem extends Vue {-->
<!--    @Prop() source;-->
<!--    @Prop() alt;-->

<!--    constructor() {-->
<!--      super();-->
<!--    }-->

<!--    async mounted() {-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<template>-->
<!--  <figure v-lazyload class="image__wrapper">-->
<!--    <div style="background: #0d95e8"></div>-->
<!--    <img-->
<!--      class="image__item"-->
<!--      :data-url="source"-->
<!--      :alt="alt"-->
<!--      style="display: inline;"-->
<!--    >-->
<!--  </figure>-->
<!--</template>-->
