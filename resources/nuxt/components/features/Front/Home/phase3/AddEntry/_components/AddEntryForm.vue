<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');
    import SkIcon from "@/components/Icons/Icon.vue";

    @Component({
        components: {
            SkIcon
        }
    })
    export default class AddEntryForm extends Vue {
        entry: string = 'Location';
        options: Array<any>;

        constructor() {
            super();
            this.options = [
                {value: 'Location', label: 'Location', route: '/site/extern/werbemoeglichkeiten_eintraege.html'},
                {value: 'Eventdienstleistung', label: 'Eventdienstleistung', route: '/site/extern/werbemoeglichkeiten_eintraege.html'}
            ];
        }

        goToRoute(){
            if(this.entry !== ""){
                this.$router.push({ path: this.options.find(obj =>  obj.value == this.entry).route});
            }
        }
    }
</script>

<template>
  <div class="landing-page__add-entry__left">
    <h4 class="h4__grey-header">Dein Eintrag auf Eventlokale</h4>
    <h3>Erstelle jetzt einen Eintrag für deine Location oder Eventdienstleistung</h3>
    <div class="vue-formulate-wrap vue-formulate-wrap--inline vue-formulate-wrap--icon">
      <sk-icon :type="'house'"></sk-icon>
      <FormulateInput
        type="customselect"
        :clearable="false"
        v-model="entry"
        :options="options"
        name="email"
        validation="required"
        class="formulate-input--grey-bg formulate-input--location-search"
      />
      <FormulateInput
        type="submit"
        label="weiter"
        class="formulate-input--submit--primary formulate-input--submit--sm formulate-input--location-search-submit"
        @click="goToRoute"
      />
    </div>
    <div class="landing-page__add-entry__left__btn-cont">
      <a href="documents/Featureliste_Location.pdf" class="btn btn--link" target="_blank">
        <span class="btn__icon btn__icon--solid">
          <sk-icon :type="'arrow_right'"></sk-icon>
        </span>
        <span class="btn--link__text">Mehr Infos</span>
      </a>
    </div>

  </div>
</template>
