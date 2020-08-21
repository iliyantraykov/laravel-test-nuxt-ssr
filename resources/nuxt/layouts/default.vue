<template>
  <div class="guest-default-page">
    <guest-header2 />
    <nuxt />
    <guest-footer/>   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import GuestHeader2 from '@/components/GuestHeader2.vue'
import GuestFooter from '@/components/GuestFooter.vue'

@Component({
  components: {
    GuestHeader2,
    GuestFooter
  }
})

export default class GuestDefaultPage extends Vue{
      visible: boolean = false;
      footer: boolean = false;

      constructor() {
        super();
        this.visible = false;
        this.footer = true;
      }

      toggleScrollToTopButton() {
        this.visible = window.scrollY > 400;
      }

      handleScroll (event) {
        try{ 
          this.toggleScrollToTopButton();
        } catch(e) {}
      }
}
</script>
