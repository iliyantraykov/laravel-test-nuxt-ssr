<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator';
  import { namespace } from 'vuex-class';
  const { State } = namespace('Root');

  @Component({
  })
  export default class SeoSearchBox extends Vue {

    constructor() {
      super();
    }

    async mounted() {}
  }
</script>

<template>
  <nav class="menu notstart menu_seo placeholder">

    <div class="seo_header">
      <div class="image">
        <u><i><img></i></u>
      </div>
      <div class="text">
        <div class="inner-content">
          <span class="title h1-size"></span>
          <span class="title h2-size"></span>
        </div>
      </div>
      <div class="clearer"></div>
    </div> <!-- .seo_header -->

    <div class="tab_content">
      <form class="filter">
        <div class="fullsearch">
          <div class="container">
            <table>
              <tr><td></td> <td></td> <td></td> <td></td></tr>
              <tr>
                <td class="text">
                  <span class="title h2-size"></span>
                </td>
                <td colspan="3">
                  <div class="filter"></div>
                  <div class="showfilter"></div>
                </td>
              </tr>
            </table>
            <div class="clearer"></div>
          </div>
        </div>
      </form>
    </div> <!-- .tab_content -->

  </nav>
</template>
