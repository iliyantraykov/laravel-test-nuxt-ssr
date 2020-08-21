<script lang="ts">
    import {Component, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import EventBus from '@/utils/event-bus';

    const { Action } = namespace('Root');

    @Component
    export default class MultipleChoiceDropdown extends Vue {
        @Prop() value;
        @Prop() options;
        @Prop() dropdownId;
        @Prop() placeholder;

        dropdownOpen: boolean;
        checked: Array<Number>;
        valueProp: Array<Number>;
        id: number;
        menu_direction: String;
        menu_style: String;

        constructor(){
            super();
            this.dropdownOpen = false;
            this.id = -1;
            this.checked = [];
            this.menu_direction = 'down';
            this.menu_style = "transform: translateY(0px)); max-height: 450px;";
            this.valueProp = this.value;
        }

        mounted()
        {
            EventBus.$on('bodyClick', data => {
                this.closeDropdown(data);
            });
            this.checked = this.value;
        }

        async closeDropdown(data){
            if(this.dropdownOpen)
                if(!this.hasAncestor(data.target))
                    this.dropdownOpen = false;
        }

        hasAncestor(data){
            if(data.tagName === 'BODY')
                return false;
            if(data.id === this.dropdownId)
                return true;
            return this.hasAncestor(data.parentNode);
        }

        async onOptionClick(id, value){
            var internal_id = parseInt(id, 10);
            var index = this.checked.indexOf(internal_id);
            if(value && index == -1)
                this.checked.push(internal_id);
            else if (!value && index !== -1)
                this.checked.splice(index, 1);
            this.$emit('input', this.checked);
        }

        getDropdownClass() {
            let class_name = 'optionnav';
            if (this.dropdownOpen)
                class_name += ' selected';
            if (this.value.length)
                class_name += ' active';
            return class_name;
        }

        async menuClick(){
            this.dropdownOpen = !this.dropdownOpen;
            // let window_height = window.innerHeight;
            // let menu = document.querySelector('#' + this.dropdownId);
            // if(menu) {
            //     let vertical_position = menu.getBoundingClientRect().top;
            //     let height = menu.getBoundingClientRect().bottom - menu.getBoundingClientRect().top;
            //     vertical_position < window_height/2 ? this.menu_direction = 'down': this.menu_direction = 'up';
            //     console.log("Menu direction: " + this.menu_direction);
            //     if(this.menu_direction === 'down') {
            //         this.menu_style = "transform: translateY(0px))";
            //         // let style = "transform: translateY(0px));";
            //     } else {
            //         this.menu_style = "transform: translateY(calc(-100% - " + height + "px))";
            //         // let style = "transform: translateY(calc(-100% - " + height + "px));";
            //     }
            //     console.log("Height: " + height);
            // }
        }
    }
</script>

<template>
  <div
       :class="getDropdownClass()"
       :id="dropdownId">
    <span @click="menuClick">{{this.placeholder}}
    </span>
    <ul v-if="dropdownOpen"
        class="multiple-choice-dropdown"
        v-bind:class="{ 'up': (menu_direction === 'up'), 'down': (menu_direction === 'down')}"
        :style="menu_style">
      <li>
        <div v-for="option in options">
          <input style="display:none;"
                 type="checkbox"
                 name="xcv__"
                 :id="dropdownId+option.id"
                 :value="option.id"
                 v-model="valueProp"
                 @change="onOptionClick($event.target.value, $event.target.checked)">
          <label style="margin-bottom: 0"
                 :for="dropdownId+option.id">
            <b></b> <propertyhtml v-html="option.name"></propertyhtml>
          </label>
        </div>
      </li>
    </ul>
  </div>
</template>
