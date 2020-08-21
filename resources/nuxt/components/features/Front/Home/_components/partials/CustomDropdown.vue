<script lang="ts">
  import { Component, Prop, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  import EventBus from '@/utils/event-bus';

  const { Action } = namespace('Root');

  @Component
  export default class CustomDropdown extends Vue {
      @Prop() value;
      @Prop() options!: Array<Taxonomy>;
      @Prop() placeholder;
      @Prop() custom_options;
      @Prop() onOptionChangeCallback;

      selectedOption: string;
      filterDropdownOpen: boolean;
      hoverFilterDropdownOpen: boolean;
      dropdownStyle: object;
      dropdownId: string;
      menu_direction: String;
      menu_style: String;

      constructor(){
          super();
          this.selectedOption = this.placeholder ? this.placeholder : '';
          this.filterDropdownOpen = false;
          this.hoverFilterDropdownOpen = false;
          this.dropdownStyle = {'background-color': 'rgb(255, 255, 255)'};
          let id = Math.floor(Math.random() * 8998) + 1001;
          this.dropdownId = 'dropdown'+ id;
          this.menu_direction = 'down';
          this.menu_style = "transform: translateY(0px)); max-height: 450px;";
      }

      async mounted() {
        EventBus.$on('bodyClick', data => {
          this.closeDropdown(data);
        });
        this.setMenuSelectedValue(this.value);
      }

      async closeDropdown(data){
        if (data.target.id != this.dropdownId) {
          this.filterDropdownOpen = false;
          let nav_menu = document.querySelector('.menu');
          if (nav_menu) {
            if (!this.filterDropdownOpen)
                nav_menu.classList.remove('dropdown_active');
            else
                nav_menu.classList.add('dropdown_active');
          }
        }
      }

      async onOptionChange(id){
          this.setMenuSelectedValue(id);
          this.filterDropdownOpen = false;
          this.$emit('input', id);
          let nav_menu = document.querySelector('.menu');
          if (nav_menu) {
            if (!this.filterDropdownOpen)
                nav_menu.classList.remove('dropdown_active');
            else
                nav_menu.classList.add('dropdown_active');
          }
      }

      async setMenuSelectedValue(id){
        if (id === '' && typeof this.placeholder !== "undefined") {
          this.selectedOption = this.placeholder;
          this.dropdownStyle = {'background-color': '#ffffff'};
        } else {
          var eventObject = this.options.filter(option => {
            return option.id == id;
          });
          if(eventObject.length == 0 && typeof this.custom_options !== "undefined") {
            eventObject = this.custom_options.filter(option => {
              return option.id == id;
            });
          }
          if (eventObject && eventObject.length > 0) {
            this.selectedOption = eventObject[0].name!;
            this.dropdownStyle = {'background-color': '#eaeaea'};
          }
        }
      }

      async menuClick(){
          this.filterDropdownOpen = !this.filterDropdownOpen;
          if(this.placeholder === 'Region' && window.outerWidth > 599) {
              let nav_menu = document.querySelector('.menu');
              if(nav_menu){
                  if (!this.filterDropdownOpen)
                      nav_menu.classList.remove('dropdown_active');
                  else
                      nav_menu.classList.add('dropdown_active');
              }
              let window_height = window.innerHeight;
              let menu = document.querySelector('#' + this.dropdownId);
              if(menu) {
                  let vertical_position = menu.getBoundingClientRect().top;
                  let height = menu.getBoundingClientRect().bottom - menu.getBoundingClientRect().top;
                  vertical_position < window_height/2 ? this.menu_direction = 'down': this.menu_direction = 'up';
                  if(this.menu_direction === 'down') {
                      this.menu_style = "transform: translateY(0px)); max-height: 450px;";
                  } else {
                      let max_height = vertical_position < 450 ? vertical_position : 450;
                      this.menu_style = "transform: translateY(calc(-100% - " + height + "px)); max-height: " + max_height + "px;";
                  }
              }
          }
      }
  }
</script>

<template>
  <div class="optionnav">
    <span :id="dropdownId"
          @click="menuClick"
          @mouseover="hoverFilterDropdownOpen = true"
          @mouseleave="hoverFilterDropdownOpen = false"
          v-bind:style="dropdownStyle">{{selectedOption}}</span>
    <ul v-if="filterDropdownOpen"
        class="custom-dropdown"
        v-bind:class="{ 'up': (menu_direction === 'up'), 'down': (menu_direction === 'down')}"
        :style="menu_style">
      <li>
        <template v-if="placeholder">
          <input style="display:none;"
                 type="radio"
                 :id="'option_'"
                 name="options"
                 :value="''"
                 :checked="value === ''">
          <label :for="'option_'"
                 @click="onOptionChange('')">
            <b></b>
            {{ placeholder }}
          </label>
        </template>
        <template v-for="option in custom_options">
          <input style="display:none;"
                 type="radio"
                 :id="'option_'+option.id"
                 name="options"
                 :value="option.id"
                 :checked="value === option.id">
          <label :for="'option_'+option.id"
                 @click="onOptionChange(option.id)">
            <b></b>
            {{ option.name }}
          </label>
        </template>
        <template v-for="option in options">
          <input style="display:none;"
                 type="radio"
                 :id="'option_'+option.id"
                 name="options"
                 :value="option.id"
                 :checked="value === option.id">
          <label :for="'option_'+option.id"
                 @click="onOptionChange(option.id)">
            <b></b>
            {{ option.name }}
          </label>
        </template>
      </li>
    </ul>
  </div>
</template>
