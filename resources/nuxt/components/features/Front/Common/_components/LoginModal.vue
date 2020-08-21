<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');
    import SkModal from '@/components/Modal/Modal.vue';

    @Component({
        components: {
          SkModal,
        },
    })
    export default class LoginModal extends Vue {
        constructor() {
            super();
        }

        @Emit('close-modal')
        closeModal(): void {}
    }
</script>

<template>
  <sk-modal @close-modal="closeModal"
            :title="'auth.login.login'">
    <template v-slot:body>
      <span style="color:red">Test</span>
    </template>
    <template v-slot:footer></template>
  </sk-modal>
</template>
