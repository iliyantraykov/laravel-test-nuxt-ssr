<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';

@Component
export default class SkDropdown extends Vue {

  constructor() {
    super();
  }
}
</script>

<template>
  <li class="sk-dropdown__menu-item">
    <slot></slot>
  </li>
</template>
