<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import BasePage from '@/components/BasePage.vue';


  declare const baseDomains;

  @Component({
    components: {
    },
  })
  export default class AboutUs extends BasePage {


    constructor() {
      super();
      
    }



  }
</script>

<template>
  <div>
   
    <div>
      <section class="law">
        <div class="container">
          <div class="about">
            <h1 style="font-weight: 300;">Über eventlokale.ch</h1>
            <h4>Gekommen um zu bleiben</h4>
            <ul>
              <li><div class="fun"></div><h3>Seit 2008</h3><br>Mit dem Ziel, den Eventmachern und Veranstaltern im deutschsprachigen Raum die Arbeit zu erleichtern, haben der Zürcher Internet-Pionier Marcel Hophan und sein Team 2008 in mehr als 3000 Arbeitsstunden ein Eventportal aufgebaut, welches in Art und Umfang einzigartig war und bis heute geblieben ist.</li>
              <li><div class="chart"></div><h3>Schritt für Schritt</h3><br>2014 wurde eventlokale.ch Teil der Optimize AG, welche auf die Vermarktung von Locations und Eventdienstleistungen im deutschen Sprachraum spezialisiert ist. Seither wurde das Internetportal kontinuierlich ausgebaut und mit weiteren Angeboten, wie dem wöchentlichen "Eventmagazin", dem jährlichen "Swiss Location Award" und "inivitu.net" ergänzt.</li>
              <li><div class="fingerprint"></div><h3>Unsere Vision</h3><br>Das Ziel von eventlokale.ch ist es, möglichst viele Eventmacher und Veranstalter im deutschsprachigen Raum möglichst gut bei der Planung ihrer Events zu unterstützen. Mit innovativen Planungstools und attraktiven Angeboten will eventlokale.ch das Nr.1. Planungs- und Buchungsportal für Events im deutschsprachigen Raum sein.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div>
      <section class="detail">
        <div class="container">
          <div class="team">
            <h2>Unser Team</h2>
            <ul>
              <li><div style="background-image: url(images/content/dario.jpg)"></div><h4>Dario Jann</h4>Marketing & Sales</li>
              <li><div style="background-image: url(images/content/morena.jpg)"></div><h4>Morena Frehner</h4>Kundenbetreuung & Support</li>
              <li><div style="background-image: url(images/content/priska.jpg)"></div><h4>Priska Kipfer</h4>Finanzen & Administration</li>

<!--              <li><div style="background-image: url(images/content/flavio.jpg)"></div><h4>Flavio Leu</h4>Kundenbetreuung & Support</li>-->
<!--              <li><div style="background-image: url(images/content/nathalie.jpg)"></div><h4>Nathalie Yang</h4>Projekte & Entwicklung</li>-->
<!--              <li><div style="background-image: url(images/content/dennis.jpg)"></div><h4>Dennis Arpino</h4>Beratung & Verkauf</li>-->
<!--              <li><div style="background-image: url(images/content/ana.jpg)"></div><h4>Ana Williams</h4>Swiss Location Award</li>-->
            </ul>
          </div>
        </div>
      </section>
    </div>

    <div>
      <section class="way_to_us" id="kontakt" style="background-color: #fff;">
        <div class="kontakt">
          <div>
            <h2 style="font-weight: 300;">Kontakt</h2>
            <h4>Gerne sind wir von Montag bis Freitag zu Bürozeiten bei Fragen und Anregungen für euch da.</h4>
            <br>
            eventlokale.ch<br>
            c/o Optimize AG<br>
            Genossenschaftsstraße 11<br>
            8050 Zürich<br>
            <br>
            <a href="mailto:info@eventlokale.com" title="info@eventlokale.com">info@eventlokale.com</a>
          </div>
        </div>

        <div id="roadmap" style="position: relative; overflow: hidden;">
          
        </div>
      </section>
    </div>

  </div>
</template>
