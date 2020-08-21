<script lang="ts">
  import {Component, Prop, Vue} from 'nuxt-property-decorator';

  @Component
  export default class SkPlaceholder extends Vue {

    @Prop({type: String, default: 'paragraph'}) type;
    @Prop({type: String, default: ''}) variation;
    @Prop({type: Number, default: 1}) count;

    typeClass : string = '';
    variationClass : string = '';
    placeholderType : number = 1;
    elementsCount : number = 1;

    constructor() {
      super();
      this.elementsCount = this.count;
    }

    mounted() {
      this.setPlaceholderClasses();
    }

    /*
     * Type 1 => Headers
     * Type 2 => Paragraphs, Tiny slider tabs, Tiny slider navigation
     */
    setPlaceholderClasses() {

      if (this.type === 'header') {
        this.variationClass = 'placeholder--'+this.variation;
        this.typeClass = 'placeholder--'+this.type;
        this.placeholderType = 1;
      }

      if (this.type === 'paragraph') {
        // this.variationClass = 'placeholder--paragraph-'+variation;
        this.typeClass = 'placeholder--'+this.type;
        this.placeholderType = 2;
      }

      if (this.type === 'tiny-slider') {

        this.typeClass = 'placeholder--'+this.type;
        this.variationClass = 'placeholder--'+this.type+'-'+this.variation;

        if (this.variation === 'tabs') {
          this.placeholderType = 2;
        }

        if (this.variation === 'carousel-navigation') {
          this.placeholderType = 2;
          this.elementsCount = 2;
        }

        if (this.variation === 'slide') {
          this.placeholderType = 1;
        }

      }

      if (this.type === 'cards') {
        this.typeClass = 'placeholder--'+this.type+'-'+this.variation;
        this.variationClass = 'placeholder--'+this.type+'-'+this.variation+'--'+this.count+'-columns';
        this.placeholderType = 2;
      }

      if (this.type === 'button') {
        this.typeClass = 'placeholder--'+this.type;
        this.variationClass = 'placeholder--'+this.type+'-'+this.variation;
        this.placeholderType = 1;
      }

    }


  }
</script>

<template>

  <span v-if="placeholderType === 1"
        :class="['placeholder',typeClass,variationClass]"></span>

  <span v-else-if="placeholderType === 2"
        :class="['placeholder',typeClass,variationClass]">
    <span v-for="elem in elementsCount"></span>
  </span>

</template>
