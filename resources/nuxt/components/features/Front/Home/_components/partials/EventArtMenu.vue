<script lang="ts">
    import {Component, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    import EventBus from '@/utils/event-bus';
    import { TaxonomySubType } from '@/utils/taxonomyTypes';

    const { Action } = namespace('Root');
    const SELECTED_EVENT_PLACEHOLDER = 'Event-Art';

    @Component
    export default class EventArtMenu extends Vue {
        @Prop() value!: number[];
        @Prop() types!: Taxonomy[];

        dropDowns: Array<Object>;
        eventDropdownOpen: boolean;
        isEventSelected: object;
        selectedEvent: string;
        subDropdown: number;
        selectedSubDropdown: number;
        dropdownId: string;
        menu_direction: String;
        menu_style: String;

        constructor(){
            super();

            this.dropDowns = [
                {id: TaxonomySubType.PRIVATE, name: 'Privat / Freunde'},
                {id: TaxonomySubType.BUSINESS, name: 'Geschäftlich'},
                {id: TaxonomySubType.PUBLIC, name: 'Öffentlich'}
            ];
            this.eventDropdownOpen = false;
            this.isEventSelected = {'background-color': 'rgb(255, 255, 255)'};
            this.selectedEvent = SELECTED_EVENT_PLACEHOLDER;
            this.subDropdown = 0;
            this.selectedSubDropdown = 0;
            let id = Math.floor(Math.random() * 8998) + 1001;
            this.dropdownId = 'dropdown'+ id;
            this.menu_direction = 'down';
            this.menu_style = "transform: translateY(0px))";
        }

        async mounted(){
            EventBus.$on('resetEventArt', this.reset);
            EventBus.$on('bodyClick', data => {
                this.closeDropdown(data);
            });
            if (this.value?.length) {
                // Select first event item only
                if (this.value.length == 1) {
                    let event_id = this.value[0];
                    let eventObject = this.types.filter(object => { return object.id == event_id});
                    this.selectedEvent = eventObject[0]?.name ?? SELECTED_EVENT_PLACEHOLDER;
                    this.subDropdown = eventObject[0]?.subtype;
                } else {
                    this.selectedEvent = '';
                }
                this.isEventSelected = {'background-color': '#eaeaea'};
            }
        }

        closeDropdown(data){
            if(this.eventDropdownOpen)
                if(!this.hasAncestor(data.target)) {
                    this.eventDropdownOpen = false;
                    this.subDropdown = 0;
                }
        }

        hasAncestor(data){
            if(data.tagName === 'BODY')
                return false;
            if(data.id === this.dropdownId)
                return true;
            return this.hasAncestor(data.parentNode);
        }

        setEvent(event_id) {
            var eventObject = this.types.filter(object => { return object.id == event_id});
            this.selectedEvent = eventObject[0]?.name ?? SELECTED_EVENT_PLACEHOLDER;
            this.isEventSelected = {'background-color': '#eaeaea'};
            this.eventDropdownOpen = false;
            this.subDropdown = 0;
            this.$emit('input', [event_id]);
        }

        setActiveDropdown(sub: number) {
            if (sub === this.subDropdown) {
                this.subDropdown = 0;
                this.selectedSubDropdown = 0;
            } else {
                this.subDropdown = sub;
                this.selectedSubDropdown = sub;
            }
        }

        getEventClass() {
            return this.getClass(this.eventDropdownOpen, this.value);
        }

        getClass(selected, active) {
            let class_name = 'optionnav';
            if (selected) class_name += ' selected';
            if (active) class_name += ' active';
            return class_name;
        }

        reset() {
            this.eventDropdownOpen = false;
            this.subDropdown = 0;
            this.selectedSubDropdown = 0;
            this.$emit('input', '');
        }

        async menuClick(){
            this.eventDropdownOpen = !this.eventDropdownOpen;
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
  <div :id="dropdownId" :class="getEventClass()">
    <span @click="menuClick" v-bind:style="isEventSelected">{{this.selectedEvent}}</span>
    <ul v-if="eventDropdownOpen" style="background:#9b9b9b;" :style="menu_style">
      <li v-for="dropDown in dropDowns" :class="subDropdown === dropDown.id ? 'selected' : ''">
        <span :class="selectedSubDropdown === dropDown.id ? 'active' : ''" @click="setActiveDropdown(dropDown.id)">{{dropDown.name}}</span>
        <i v-if="subDropdown === dropDown.id">
          <div v-for="option in types"
               v-if="option.subtype === dropDown.id">
            <input style="display:none;"
                   type="radio"
                   :id="'geeignet_fuer_Locations_'+option.id"
                   name="type"
                   :value="option.id"
                   :checked="value === option.id">
            <label :for="'geeignet_fuer_Locations_'+option.id"
                   @click="setEvent(option.id)">
              <b></b>
              {{ option.name }}
            </label>
          </div>
        </i>
      </li>
    </ul>
  </div>
</template>
