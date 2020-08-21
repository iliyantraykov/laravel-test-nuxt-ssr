<script lang="ts">
  import { namespace } from 'vuex-class';
  import {Component, Prop, Vue} from 'nuxt-property-decorator';
  import jsonIcons from './Icons.json';
  import { path , circle , ellipse , polygon , rect } from './IconDefaults';
  import { cloneDeep , mergeWith } from 'lodash';

  @Component
  export default class SkIcon extends Vue {
      @Prop({type: String, default: 'no_icon'}) type;
      @Prop({type: String, default: 'stroke'}) hoverType;

      iconsList : object = {};
      icon : Array<any> = [];

      constructor() {
          super();
          this.iconsList = jsonIcons;
          this.icon = this.setDefaults(this.iconsList[this.type]);
      }

      mounted() {}

      //TODO: Improve the definition of the types inside the svg elements, path, eclipse, cicrlce etc...
      setDefaults(icon) {
          icon.forEach((elem,index)=>{
              let newPath = {};
              if (typeof elem['path']!='undefined') {
                  newPath = cloneDeep(path);
              }
              if (typeof elem['circle']!='undefined') {
                  newPath = cloneDeep(circle);
              }
              if (typeof elem['ellipse']!='undefined') {
                  newPath = cloneDeep(ellipse);
              }
              if (typeof elem['ellipse']!='undefined') {
                  newPath = cloneDeep(ellipse);
              }
              if (typeof elem['polygon']!='undefined') {
                  newPath = cloneDeep(polygon);
              }
              if (typeof elem['rect']!='undefined') {
                  newPath = cloneDeep(rect);
              }
              icon[index] = mergeWith({}, newPath, elem, (a, b) => b === null ? a : undefined);
          });
          return icon;
      }
  }
</script>

<template>
  <span :class="['sk-icon',
                 'sk-icon--'+type,
                 'sk-icon--'+hoverType+'-hover']">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <template v-for="(line,index) in icon">

        <path v-if="typeof line['path'] != 'undefined'"
              :d="line['path']"
              :fill="line['fill']"
              :stroke="line['stroke']"
              :stroke-width="line['strokeWidth']"
              :stroke-linecap="line['strokeLinecap']"
              :stroke-linejoin="line['strokeLinejoin']"
              :stroke-miterlimit="line['strokeMiterlimit']"
              :class="'path-'+index"/>

        <circle v-else-if="typeof line['circle'] != 'undefined'"
                :r="line['r']"
                :cx="line['cx']"
                :cy="line['cy']"
                :fill="line['fill']"
                :class="'circle-'+index"/>

        <ellipse v-else-if="typeof line['ellipse'] != 'undefined'"
                 :cx="line['cx']"
                 :cy="line['cy']"
                 :rx="line['rx']"
                 :ry="line['ry']"
                 :fill="line['fill']"
                 :class="'ellipse-'+index"/>

        <polygon v-else-if="typeof line['polygon'] != 'undefined'"
                 :points="line['points']"
                 :fill="line['fill']"
                 :class="'polygon-'+index"/>

        <rect v-else-if="typeof line['rect'] != 'undefined'"
                 :width="line['width']"
                 :height="line['height']"
                 :y="line['y']"
                 :fill="line['fill']"
                 :class="'rect-'+index"/>

      </template>

    </svg>
  </span>
</template>
