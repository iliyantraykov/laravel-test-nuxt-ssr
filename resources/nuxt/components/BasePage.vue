<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import EventBus from '@/utils/event-bus';

  @Component({
  })
  export default class BasePage extends Vue {
    async mounted() {
      EventBus.$emit('pageMounted');
    }
  }
</script>