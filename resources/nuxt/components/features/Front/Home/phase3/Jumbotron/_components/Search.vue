<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');

    @Component({
        components: {
        },
    })

    export default class Search extends Vue {
        @Prop() result_counts;

        options: Array<any> = [
            { value: 'LOCATIONS', label: 'Location', route: '/locations'},
            { value: 'CATERING', label: 'Catering', route: '/provider/catering'},
            { value: 'TECHNIK', label: 'Technik', route: '/provider/eventtechnik'},
            { value: 'AGENTUR', label: 'Agentur', route: '/provider/agentur'},
            { value: 'MOBILAR', label: 'Mobiliar', route: '/provider/einrichtung_ausstattung'},
            { value: 'INFRASTRUKTUR', label: 'Infrastruktur', route: '/provider/infrastruktur'},
            { value: 'UNTERHALTUNG', label: 'Unterhaltung', route: '/provider/unterhaltung'},
        ];
        jumbotron_category: string|null = 'LOCATIONS';

        constructor() {
            super();
        }

        doSearch(){
            if(this.jumbotron_category !== null){
                this.$router.push({ path: this.options.find(obj =>  obj.value == this.jumbotron_category).route + '/seedId='+ Math.random().toString().slice(-8)});
            }
        }
    }
</script>

<template>
  <div class="landing-page__jumbotron__dropdown">
    <FormulateInput
      type="customselect"
      name="jumbotron_category"
      label="Womit möchtest du starten?"
      :clearable="false"
      v-model="jumbotron_category"
      :options="options"
      validation="required"
      class="formulate-input--dark-bg formulate-input--location-search"
    />
    <button class="btn btn--primary landing-page__jumbotron__dropdown__btn" role="button" aria-pressed="false" aria-label="Resultate anzeigen" @click="doSearch" v-if="jumbotron_category !== null">{{ result_counts[jumbotron_category] }} Resultate anzeigen</button>
    <button class="btn btn--primary landing-page__jumbotron__dropdown__btn" role="button" aria-pressed="false" aria-label="Choose a category" v-else>Choose a category</button>
  </div>
</template>
