<script lang="ts">
import { namespace } from 'vuex-class';
import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
import EventBus from '@/utils/event-bus';

const { Action } = namespace('Root');
import ClickOutside from 'v-click-outside';

@Component({
  directives: {
    ClickOutside: ClickOutside.directive,
  }
})
export default class SkModal extends Vue {
  @Action('setBodyClasses') setBodyClasses;

  @Prop({type: String}) title;
  @Prop({type: String, default: 'type'}) name; //Used to identify different types of modals on the site
  @Prop({type: String, default: 'regular'}) size;

  hasTitle: boolean = true;

  constructor() {
    super();

    if (typeof(this.title) === 'undefined' ) {
      this.hasTitle = false;
    }
  }

  //TODO: Open the modals on route

  @Emit('close-modal')
  closeModal() : void {};

  created() {
    // TODO: Update only one attribute in the state
    let bodyClass = {
      'navMenuOpen' : false,
      'modalOpen' : true,
      'navSearchActive' : false,
    };
    this.setBodyClasses(bodyClass);
    console.log('modal open');
  }

  destroyed() {
    // TODO: Update only one attribute in the state
    let bodyClass = {
      'navMenuOpen' : false,
      'modalOpen' : false,
      'navSearchActive' : false,
    };
    this.setBodyClasses(bodyClass);
  }

  hasFooterSlot() {
    return !!this.$slots.footer;
  }

}
</script>

<template>

  <div class="sk-modal" :class="['sk-modal__'+name+'-type','sk-modal--'+size+'-size']">

    <div class="sk-modal__inner"> <!--v-click-outside="closeModal"-->

      <div class="sk-modal__head"
           :class="{'sk-modal__head--no-title' : !hasTitle}">
        <h4 v-if="hasTitle">{{ $t(title) }}</h4>
        <span class="sk-modal__close" @click="closeModal">
          <sk-icon :type="'close'"></sk-icon>
        </span>
      </div> <!-- sk-modal-head -->

      <div class="sk-modal__body">
        <slot name="body"></slot>
      </div> <!-- sk-modal-body -->

      <div
        class="sk-modal__foot"
        v-if="hasFooterSlot()">
        <slot name="footer"></slot>
      </div> <!-- sk-foot -->

    </div>

  </div> <!-- sk-modal-overlay -->

</template>
