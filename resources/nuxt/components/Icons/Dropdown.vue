<script lang="ts">
import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';

@Component
export default class SkDropdown extends Vue {
  @Prop() title;
  menuOpen : boolean = false;
  text : string = '';

  constructor() {
    super();
  }

  //TODO: Dinamicly create the trigger element based on recieved prop
  render(h) {
    return h('button', this.text);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.emitToggle();
  }

  closeMenu() {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.emitToggle();
    }
  }

  @Emit('dropdown-toggled')
  emitToggle() : void {}
}
</script>

<template>
  <div class="sk-dropdown">

    <a href=""
       @click.prevent="toggleMenu"
       class="sk-dropdown__trigger "
       :class="{'sk-dropdown__trigger--active' : menuOpen}">
      {{title}}
    </a>

    <ul v-show="menuOpen"
        class="sk-dropdown__menu">

      <slot></slot>

    </ul>
  </div>
</template>
