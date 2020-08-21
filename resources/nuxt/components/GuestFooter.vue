<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';
    import SkIcon from "@/components/Icons/Icon.vue";

    import { Fetch } from '@/services';
    import container from "@/config/ioc_config";
    import SERVICE_IDENTIFIER from "@/config/constants/Identifiers";

    import { namespace } from 'vuex-class';
    const { State } = namespace('Root');

    @Component({
      components : {
        SkIcon
      }
    })
    export default class GuestFooter extends Vue {
        //@State('activeCategory') activeCategory;

        //fetch: Fetch = container.get<Fetch>(SERVICE_IDENTIFIER.FETCH);
        domains: Object = {};
        expandedMenu : number = 0;

        mounted(){
            this.$nextTick(() => {
              // console.log('We mounted the footer. PrerenderReady='+window.prerenderReady);
            });

            
        }

        toggleMenu(menu) {
          if (this.expandedMenu === menu) {
            this.expandedMenu = 0;
          } else {
            this.expandedMenu = menu;
          }
        }
    }
</script>
<template>
  <footer class="main-footer">
    <div class="container main-footer__inner">
      <div class="row">

        <div class="col-sm-8 offset-sm-2 col-md-3 offset-md-1 col-lg-2 offset-lg-2 offset-xl-1 ">
          <ul :class="['main-footer__list','main-footer__list--expandable',{
                        'main-footer__list--expandable--expanded':expandedMenu===1
                      }]">
            <li>
              <h4 class="main-footer__list__title" @click="toggleMenu(1)">
                Events
                <sk-icon type="navigate_next"></sk-icon>
              </h4>
            </li>
            <li><nuxt-link to="/site/_redaktionell/79/Dein_Hochzeits_Cockpit.html" title="Hochzeit">Hochzeit</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/84/Dein_Geburtstags_Cockpit.html" title="Geburtstag">Geburtstag</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/80/Dein_Privatanlass_Cockpit.html" title="Privatanlass">Privatanlass</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/82/Dein_Apero_Cockpit.html" title="Apéro">Apéro</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/100/Dein_Meeting_Cockpit.html" title="Meeting">Meeting</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/77/Dein_Tagungs_Cockpit.html" title="Tagung">Tagung</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/81/Dein_Firmenanlass_Cockpit.html" title="Firmenanlass">Firmenanlass</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/83/Dein_Kongress_Cockpit.html" title="Kongress">Kongress</nuxt-link></li>
          </ul>
        </div>

        <div class="col-sm-8 offset-sm-2 col-md-3 offset-md-0 col-lg-2 offset-lg-1 offset-xl-0">
          <ul :class="['main-footer__list','main-footer__list--expandable',{
                        'main-footer__list--expandable--expanded':expandedMenu===2
                      }]">
            <li>
              <h4 class="main-footer__list__title" @click="toggleMenu(2)">
                Locations
                <sk-icon type="navigate_next"></sk-icon>
              </h4>
            </li>
            <li><nuxt-link to="/site/_redaktionell/85/Die_schoensten_Eventlocations_der_Schweiz.html" title="Eventlocation">Eventlocation</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/64/Die_schoensten_Hochzeitslocations_der_Schweiz.html" title="Hochzeitslocation">Hochzeitslocation</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/65/Partyraum_mieten__Raum_mieten__Partylokal.html" title="Partyraum">Partyraum</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/67/Restaurant_mieten_fuer_Events.html" title="Restaurant">Restaurant</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/62/Seminarraum__Seminarzentrum_mieten.html" title="Seminarzentrum">Seminarzentrum</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/59/Tagungshotels__Seminarhotels_in_der_Schweiz.html" title="Tagungshotel">Tagungshotel</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/60/Kongresszentrum__Kongresshotel___Konferenzraeume.html" title="Kongresszentrum">Kongresszentrum</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/66/Waldhuette_mieten.html" title="Waldhütte">Waldhütte</nuxt-link></li>
          </ul>
        </div>

        <div class="col-sm-8 offset-sm-2 col-md-3 offset-md-0 col-lg-2 offset-lg-1 offset-xl-0">
          <ul :class="['main-footer__list','main-footer__list--no-border','main-footer__list--expandable',{
                        'main-footer__list--expandable--expanded':expandedMenu===3
                      }]">
            <li>
              <h4 class="main-footer__list__title" @click="toggleMenu(3)">
                Dienstleistungen
                <sk-icon type="navigate_next"></sk-icon>
              </h4>
            </li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1140/Die_besten_Event_Agenturen_der_Schweiz.html" title="Agentur">Agentur</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1141/Die_besten_Event_Catering_Anbieter_der_Schweiz.html" title="Catering">Catering</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1142/Die_besten_Eventtechnik___Veranstaltungstechnik_Anbieter_der_Schweiz.html" title="Eventtechnik">Eventtechnik</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1143/Limousine_mieten_fuer_Events.html" title="Limousine">Limousine</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1144/Eventmobiliar_mieten_in_der_Schweiz.html" title="Mobiliar">Mobiliar</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1145/Der_beste_Partyservice_in_der_Schweiz.html" title="Partyservice">Partyservice</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1146/Partyzelte_und_Festzelte_mieten_in_der_Schweiz.html" title="Partyzelt">Partyzelt</nuxt-link></li>
            <li><nuxt-link to="/site/_redaktionell/34/Dienstleistungen/1147/Partyband__DJ_s__Kuenstler__Clown_und_Zauberer_fuer_deinen_Event.html" title="Unterhaltung">Unterhaltung</nuxt-link></li>
          </ul>
        </div>

        <div class="col-sm-8 offset-sm-2 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-4 offset-xl-0">
          <div class="main-footer__right-section">
            <ul class="main-footer__list main-footer__list--social">
              <li class="facebook">
                <a href="https://www.facebook.com/eventlokale" title="Facebook" target="_blank">
                  <sk-icon :type="'facebook'"></sk-icon>
                </a>
              </li>
              <li class="linkedin">
                <a href="https://ch.linkedin.com/company/eventlokale-ch" title="LinkeIn" target="_blank">
                  <sk-icon :type="'linkedin_square'"></sk-icon>
                </a>
              </li>
              <li class="twitter">
                <a href="https://twitter.com/eventlokale" title="Twitter" target="_blank">
                  <sk-icon :type="'twitter'"></sk-icon>
                </a>
              </li>
              <li class="instagram">
                <a href="https://www.instagram.com/eventlokale.ch/ " title="Instagram" target="_blank">
                  <sk-icon :type="'instagram'"></sk-icon>
                </a>
              </li>
            </ul>

            <div class="main-footer__language-switch">
              <h5>Eventlokale gibt es auch in </h5>
              <ul class="main-footer__language-switch__list">
                <li v-if="$store.state.activeCategory !== 1">
                  <sk-icon :type="'switzerland_flag'"></sk-icon>
                  <a :href="domains.ch">
                    Schweiz
                  </a>
                </li>

                <li v-if="$store.state.activeCategory !== 2">
                  <sk-icon :type="'germany_flag'"></sk-icon>
                  <a :href="domains.de">
                    Deutschland
                  </a>
                </li>

                <li v-if="$store.state.activeCategory !== 3">
                  <sk-icon :type="'austria_flag'"></sk-icon>
                  <a :href="domains.at">
                    Österreich
                  </a>
                </li>
              </ul>
            </div>

            <div class="main-footer__copyright">
              <nuxt-link :to="{ name: 'site-extern-impressum' }"
                           title="Impressum / Copyright / AGB">Impressum</nuxt-link>

              <span class="main-footer__copyright__separator">|</span>

              <nuxt-link :to="{ name: 'site-extern-about_us' }"
                           title="AGB">AGB</nuxt-link>

              <span class="main-footer__copyright__text">© 2020 Eventlokale.ch2</span>
            </div>
          </div>
          <!--<ul class="main-footer__list">
            <li><h4>Infos</h4></li>
            <li>
              <nuxt-link :to="{ name: 'about.us' }"
                           title="Über uns">
                Über uns
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ path: '/site/extern/about_us.html#kontakt' }"
                           title="Kontakt">
                Kontakt
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'advertising' }"
                           title="Werbemöglichkeiten">
                Werbemöglichkeiten
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'presse' }"
                           title="Medien">
                Medien
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="{ name: 'impressum' }"
                           title="Impressum / Copyright / AGB">
                Impressum / Copyright / AGB
              </nuxt-link>
            </li>
          </ul>-->
        </div>

      </div>

    </div>
  </footer>
</template>
