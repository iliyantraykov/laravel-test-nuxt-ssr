<script lang="ts">
    import { Component, Emit, Vue } from 'nuxt-property-decorator';
    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');

    @Component({
        components: {
        },
    })
    export default class LookingForSomething  extends Vue {
        constructor() {
            super();
        }
    }
</script>

<template>
  <div class="container">
    <div class="row">

      <div class="col-lg-4 col-6">
        <h2 class="main-nav__list-title">Locations</h2>
        <ul class="main-nav__list">
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/site/_redaktionell/85/Die_schoensten_Eventlocations_der_Schweiz.html'}">Eventlocation</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/site/_redaktionell/64/Die_schoensten_Hochzeitslocations_der_Schweiz.html'}">Hochzeitslocation</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/site/_redaktionell/65/Partyraum_mieten__Raum_mieten__Partylokal.html'}">Partyraum</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/site/_redaktionell/67/Restaurant_mieten_fuer_Events.html'}">Restaurant</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/site/_redaktionell/62/Seminarraum__Seminarzentrum_mieten.html'}">Seminarraum</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/site/_redaktionell/59/Tagungshotels__Seminarhotels_in_der_Schweiz.html'}">Tagungshotel</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/site/_redaktionell/66/Waldhuette_mieten.html'}">Waldhütte</router-link>
          </li>
        </ul>
      </div>
      <div class="col-lg-4 col-6">
        <h2 class="main-nav__list-title">Dienstleistungen</h2>
        <ul class="main-nav__list">
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/provider/catering'}">Catering</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/provider/eventtechnik'}">Technik</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/provider/agentur'}">Agentur</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/provider/einrichtung_ausstattung'}">Mobiliar</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/provider/infrastruktur'}">Infrastruktur</router-link>
          </li>
          <li class="main-nav__list__item">
            <router-link :to="{ path: '/provider/unterhaltung'}">Unterhaltung</router-link>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
