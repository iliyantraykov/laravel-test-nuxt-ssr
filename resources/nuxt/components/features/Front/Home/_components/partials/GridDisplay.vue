<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import EntryCard from './EntryCard.vue';

  @Component({
    components: {
      EntryCard
    },
  })
  export default class GridDisplay extends Vue {
    @Prop() items;
    @Prop() type;

    constructor() {
      super();
    }

    getClassName(index) {
      switch (index) {
        case 0:
          return "entry wide";
        case 1:
          return "entry slim";
        case 2:
          return "entry";
        case 3:
          return "entry";
        case 4:
          return "entry slim";
        case 5:
          return "entry wide";
        default:
          return "entry";
      }
    }

  }
</script>

<template>
    <div>
        <entry-card
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :type="type"
                :class_name="getClassName(index)">
        </entry-card>
    </div>
</template>