<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import { AddEntryForm, IncreaseAwareness} from "./_components";
    import SkIcon from "@/components/Icons/Icon.vue";

    @Component({
        components: {
            AddEntryForm,
            IncreaseAwareness,
            SkIcon,
        },
    })
    export default class Content extends Vue {
        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="container">
    <div class="row">

      <div class="col-xl-6 offset-xl-1 col-lg-8 offset-lg-2">
        <add-entry-form></add-entry-form>
      </div>

      <div class="col-xl-4 offset-xl-0 col-lg-8 offset-lg-2">
        <increase-awareness></increase-awareness>
      </div>

    </div>
  </div>
</template>
