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
    export default class RegisterModal extends Vue {
        constructor() {
            super();
        }

        @Emit('close-modal')
        closeModal(): void {}
    }
</script>

<template>
  <sk-modal @close-modal="closeModal"></sk-modal>
  <!--:title="'auth.register.register'"-->
</template>
