<script lang="ts">
import { DialogComponent } from 'vue-modal-dialogs';
import { Component, Prop } from 'nuxt-property-decorator';

@Component
export default class BaseDialog extends DialogComponent<boolean> {
  @Prop() isConfirm;
  @Prop() message;

  cancel(): void {
    this.$close(false);
  }

  ok(): void {
    this.$close(true);
  }
}
</script>

<template>
  <div class="message-wrapper">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">{{ $t(message) }}</div>
        <div class="modal-footer">
          <button @click="ok" variant="primary">{{ $t('buttons.ok') }}</button>
          <button v-if="isConfirm" @click="cancel" variant="secondary">{{ $t('buttons.cancel') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
