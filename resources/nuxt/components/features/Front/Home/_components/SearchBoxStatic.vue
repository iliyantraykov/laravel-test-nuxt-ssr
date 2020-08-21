<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  @Component
  export default class SearchBoxStatic extends Vue {
  }
</script>

<template>
  <div>
    <div>
      <nav class="menu">
        <ul class="categories">
          <li class="selected"><a data-showtab="Locations" title="Location">Location</a></li>
          <li><a data-showtab="Catering" title="Catering">Catering</a></li>
          <li><a data-showtab="Eventtechnik" title="Technik">Technik</a></li>
          <li><a data-showtab="Agentur" title="Agentur">Agentur</a></li>
          <li><a data-showtab="Weitere" title="Weitere">Weitere</a></li>
        </ul>
        <div class="eventsearch" id="tab_content_Locations">
          <div class="container">
            <form name="eventsearch" action="" method="get">
              <div class="optionnav">
                <span>Event-Art</span>
              </div>
              <div class="optionnav">
                <span>Region</span>
              </div>
              <input type="text" name="suche_kapazitaet" placeholder="Personen">
              <input type="submit" value="Suchen" disabled="disabled">
            </form>
            <div class="clearer"></div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>