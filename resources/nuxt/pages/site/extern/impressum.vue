<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import BasePage from '@/components/BasePage.vue';

  //import NewsletterPlaceholder from '../../../features/Front/Home/_components/partials/placeholders/NewsletterPlaceholder.vue';

  declare const baseDomains;

  @Component({
    components: {
      //Newsletter:  () => import('../../../features/Front/Locations/_components/partials/Newsletter.vue')
    },
  })

  export default class Impressum extends BasePage {

    constructor() {
      super();
      
    }

  }
</script>

<template>
  <div>
    
    <div>
      <section class="law">
        <div class="impressum">
          <div>
            <h1>Impressum</h1>
            <br>
            eventlokale.com<br>
            c/o Optimize AG<br>
            Genossenschaftsstraße 11<br>
            8050 Zürich<br>
            <br>
            <a href="mailto:info@eventlokale.com" title="info@eventlokale.com">info@eventlokale.com</a>
          </div>
        </div>
        <div class="copyright">
          <div>
            <h2>Copyright</h2>
            <br>
            Die Datenbank mit allen Informationen wie Texte, Bilder, Grafiken, Programme, Firmenlogos etc. von eventlokale.ch © / eventlokale.com © / eventdienstleister.com © stellt ein Sammelwerk im Sinne von Art. 4 Abs. 1 des Schweizerischen Urheberrechtsgesetzes dar und ist somit urheberrechtlich geschützt. Die Inhalte der Datenbank dürfen nicht kopiert oder in andere elektronische Verzeichnisse übertragen werden.<br>
            <br>
            eventlokale.ch © / eventlokale.com © / eventdienstleister.com © ist markenrechtlich geschützt beim Eidgenössisches Institut für Geistiges Eigentum in Bern. Der Inhalt der Datenbank, die verwendete Software, die Darstellung, Texte, Bilder etc. darf nicht kopiert oder anderweitig verwendet werden.der Schweiz setzen wir Akzente.
          </div>
        </div>
      </section>
    </div>

    <div>
      <section class="detail">
        <div class="container">
          <div class="agb">
            <h2>Allgemeine Geschäftsbedingungen</h2>
            <br>
            Allgemeine Geschäftsbedingungeneventlokale.com, eventdienstleister.com sowie die dazugehörenden Partnerportale beinhalten eine umfangreiche Datenbank für die Suche von Eventlokalen und Eventdienstleistern. Die Anbieter von Eventlokalen und Eventdienstleister können ihre Räumlichkeiten, Dienstleistung und Informationen durch uns, oder direkt selbst eintragen (nach Verfügbarkeit).<br>
            <br>
            <br>
            <h3>I. Allgemeine Bedingungen</h3>
            <br>
            Wenn Sie diese Website besuchen, erklären Sie sich mit allen unten aufgeführten Bedingungen einverstanden. Die Datenbank von eventlokale.com und eventdienstleister.com sowie unseren Partnerportale stellen ein Sammelwerk im Sinne von Art. 4 Abs. 1 des Schweizerischen Urheberrechtsgesetzes dar und ist somit urheberrechtlich geschützt. Die Inhalte der Datenbank (Text, Bilder etc.) dürfen nicht kopiert, vervielfältigt oder in andere Elektronische-, Print- oder Werbe-Verzeichnisse übertragen werden (zu kommerziellen Zwecken).<br>
            <br>
            Alles auf dieser Website enthaltene und veröffentlichte Material ist Copyright-Material und nur für den persönlichen, nichtkommerziellen Gebrauch des Nutzers bestimmt. Der Nutzer kann für seinen eigenen Gebrauch Informationen und Texte herunterladen oder kopieren, jedoch bleibt dieses Material Copyright von dieser Website.<br>
            <br>
            Alle Warenzeichen/Logos/Bilder etc. der auf dieser Website enthaltenen Firmen dürfen nicht ohne vorherige schriftliche Erlaubnis genutzt werden.<br>
            <br>
            Dem Nutzer ist es ausdrücklich verboten, irgendwelches Material auf dieser Website, Software oder Materialien, die sich ganz oder teilweise hierauf beziehen, zu verändern, zu veröffentlichen, weiterzuleiten, zu verkaufen, sich an der Übermittlung, Verkauf oder Reproduktion zu beteiligen, Derivate hiervon zu erstellen, zu verteilen, vorzuführen, auszustellen oder auf irgendeine andere Weise auszunutzen.<br>
            <br>
            Zudem ist unsere Website als Markenname geschützt (Eidgenössisches Institut für Geistiges Eigentum in Bern). Wir schliessen jede Gewährleistung, ausdrücklich oder stillschweigend, in Bezug auf die Qualität, Genauigkeit, Aktualität, Vollständigkeit oder Eignung für einen bestimmten Zweck des auf dieser Website veröffentlichten Materials aus und können nicht für irgendwelche Schadenersatzforderungen, Strafen, Verluste, Schäden, Minderung des Firmenwertes oder Ausgaben resultierend aus der Nutzung, oder der Nichtnutzbarkeit von unserer Website, oder von irgendeinem unerlaubten Zugang oder Änderung von dieser Website haftbar gemacht werden.<br>
            <br>
            Der Nutzer akzeptiert, dass, nachdem er diese Website verlassen hat, uns in keiner Weise verantwortlich gemacht werden kann für irgendwelches Material, auf das der Nutzer stößt, und wir schliessen bis zum gesetzlich erlaubten Maximalausmaß jede Haftung aus für irgendwelche Schäden, Kosten, Verletzungen oder finanzielle Verluste, die dem Nutzer mit Bezug auf oder als Ergebnis eines solchen Materials entstanden sind.<br>
            <br>
            Wir behalten das Recht, die Bedingungen dieser Vereinbarung zu ergänzen oder zu ändern. Es obliegt der Eigenverantwortung des Nutzers, diese Bedingungen zu lesen und sich daran zu halten, wenn er diese Website besucht.<br>
            <br>
            Anbieter von Eventlokalen, Räumlichkeiten und Eventdienstleister etc. steht es frei, sich direkt selbst auf unserem Portal anzumelden und einen Eintrag zu erfassen (nach Verfügbarkeit). Die allfälligen Aufschaltgebühren und Jahresgebühren ersehen Sie auf den entsprechenden Eingabeseiten und Preistabellen. Eine Erhöhung der bestehenden Gebühren wird rechtzeitig im Voraus angekündigt. Es ist verboten auf dieser Website pornographisches Material, Bilder etc. hochzuladen. Zudem dürfen keine Lokale, Räumlichkeiten, Firma etc. eingetragen werden, die in irgendwelcher Form den aktuellen Gesetzen widersprechen.<br>
            <br>
            Wir wünschen keine Einträge gegen geltende Rechte wie: Gewalt, Sex, Drogen, Alkohol, Tabak, Diskriminierung etc. und behalten das Recht vor, diese ohne Ankündigung wieder zu löschen.<br>
            <br>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. Wir distanzieren uns ausdrücklich von allen Inhalten aller gelinkten Seiten unserer Suchmaschine.<br>
            <br>
            Diese Nutzerbedingungen sind in Übereinstimmung mit dem schweizerischen Gesetz auslegbar. Irgendwelche Schadenersatzansprüche, Streitsachen oder andere sich hieraus ergebende, strittige Angelegenheiten unterliegen der Zuständigkeit der Gerichtshöfe von der Schweiz / Zürich.<br>
            <br>
            <br>
            <h3>II. Nutzung der Website</h3>
            <br>
            Die Suche nach einem geeigneten Lokal oder Eventdienstleister auf dieser Website ist für alle kostenfrei. Wir übernehmen keine Gewähr für Vollständigkeit und die Richtigkeit der eingestellten Lokale, Angaben, Einträge von Eventdienstleister und die sonstigen auf der Homepage befindlichen Angaben.<br>
            <br>
            <br>
            <h3>III. Verfügbarkeit der Website</h3>
            <br>
            Wir gewährleisten nicht, dass der Inhalt dieser Website mit allen Computersystemen und Browsern kompatibel ist. Wir sind jedoch bestrebt, dass diese Website möglichst auf allen bekannten Computersystemen optimal angezeigt wird. Wir sind bemüht, den Zugang zu dem Internet-Angebot 24 Stunden täglich und 7 Tage die Woche zur Verfügung zu stellen. Vorübergehende Betriebsunterbrechungen aufgrund Wartungsarbeiten, Störungen des Internet bei m Provider oder bei fremden Netzbetreibern sowie im Falle höherer Gewalt und böswilligen Softwareangriffe sind allerdings möglich. Wir bitten diesbezüglich um Verständnis und können keinen garantierten jederzeitig ununterbrochenen Zugang gewährleisten.<br>
            <br>
            <br>
            <h3>IV. Datenschutz</h3>
            <br>
            Dem Kunde (Lokalanbieter, Firma etc.) ist bekannt, das personenbezogene sowie unternehmungsbezogene Daten gespeichert und verarbeitet werden. Der Kunde verzichtet auf eine Benachrichtigung nach dem Datenschutzgesetzt. Sie haben jederzeit das Recht auf kostenlose Auskunft, Berichtigung, Sperrung und Löschung Ihrer gespeicherten Daten. Der Kunde hat jederzeit das Recht gegen den Erhalt der Newsletter Widerspruch einzulegen. Diese Website erhebt und speichert ausserdem automatisch in unseren Server Logs Informationen, die Ihr Browser uns übermittelt. Dabei handelt es sich insbesondere um Ihre IP-Adresse, Informationen und Daten die diese Website auf Ihren Cookies abgelegt hat und die von Ihnen aufgerufenen Seiten, URL, Browsertyp und die Browsersprache sowie das Datum und die Uhrzeit Ihrer Web-Anfrage.<br>
            <br>
            <br>
            <b>Datenschutz Google Analytics:</b><br>
            <br>
            Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. ("Google"). Google Analytics verwendet sog. "Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung diese Website (einschliesslich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden. Cookies sind Dateien, die wir auf Ihrer Festplatte, nicht auf dem Server ablegen. Die in Cookies enthaltenen Informationen dienen der Erleichterung der Navigation und vermeiden, dass Sie bei jeder Nutzung Ihre gesamten Registrierungsdaten neu eingeben müssen. Sie können das Speichern von Cookies auf Ihrer Festplatte verhindern, indem Sie in Ihren Browser-Einstellungen "keine Cookies akzeptieren" wählen. Wenn Sie keine Cookies akzeptieren, kann dieses aber zu Funktionseinschränkungen unserer Angebote führen. Wir benutzen die erhobenen Daten nur für interne Zwecke, um unser Angebot entsprechend den Bedürfnissen der Nutzer optimaler zu gestalten. Wir werden keine persönlichen Daten von Ihnen etc. an Dritte weiterleiten oder offen legen (ausgenommen sind die Daten welche auf unserer Homepage ersichtlich sind und somit öffentlich zugänglich sind).<br>
            <br>
            <br>
            <h3>V. Datensicherheit</h3>
            <br>
            Wir bemühen uns, Ihre persönlichen Informationen vor Verlust, Missbrauch, ungenehmigtem Zugang, Offenlegung, Änderung oder Zerstörung zu schützen. Die Daten in Ihrem Konto auf dieser Website sind zur Wahrung der Vertraulichkeit und Sicherheit durch ein Passwort geschützt.<br>
            <br>
            <br>
            <h3>VI. Zustandekommen des Vertrages über den Eintrag</h3>
            <br>
            Durch das Eintragen Ihres Angebotes (neuer Grundeintrag oder neuer Premiumeintrag) direkt auf unserer Homepage (nach Verfügbarkeit) oder übermitteln der entsprechenden Daten per Post, Fax oder E-Mail bestätigen Sie Ihren Eintrag und die damit verbundenen Kosten sowie unsere AGB. Der Kunde erhält eine Bestätigung des Empfangs der Auftragserteilung per E-Mail. Diese Bestätigung stellt keine Annahme des Angebotes dar, sondern soll den Kunden nur informieren, dass der Auftrag bei uns eingegangen ist.<br>
            <br>
            <br>
            <h3>VII. Urheberrechte</h3>
            <br>
            Jeder Kunde hat die Möglichkeit, einen Eintrag selbst zu erfassen und/oder seine Angaben im Eintrag auf eventlokale.com, eventdienstleister.com sowie den dazugehörenden Webseiten selbst zu bearbeiten, anpassen und ergänzen. Der Kunde ist dafür verantwortlich, dass sämtliche Inhalte (insbesondere Texte, Dokumente, Videos, Bilder etc.), welche auf eventlokale.com, eventdienstleister.com und den dazugehörenden Webseiten veröffentlicht werden, frei von Urheberrechten Dritter sind bzw. keine Urheberrechte Dritter verletzen. Wir empfehlen daher auch einen eigenen separaten Unique-Text &amp; Beschreibungstext zu verfassen sowie nur eigene Fotos resp. Videos im Eintrag zu verwenden.<br>
            <br>
            Sollten von Kunden erstellte Einträge zu Schadenersatzansprüchen durch Dritte wegen Verletzung von Urheberrechten gegenüber dem Betreiber von eventlokale.com, eventdienstleister.com und den dazugehörenden Webseiten führen, so ist der Kunde verpflichtet, dem Betreiber von eventlokale.com, eventdienstleister.com sowie den dazugehörigen Webseiten den gesamten Schaden inkl. Umtriebsentschädigung und allfälliger Anwaltskosten zu ersetzen.<br>
            <br>
            <br>
            <h3>VIII. Zahlungen / Verzug / Rechnungsstellung</h3>
            <br>
            Die allfälligen Aufschaltgebühren und Jahresgebühren für neue Einträge, sowie Kosten für Bannerwerbung ersehen Sie auf den entsprechenden Eingabeseiten und Preistabellen. Eine Erhöhung der bestehenden Gebühren wird rechtzeitig im Voraus angekündigt. Korrekturen und Anpassungen können immer und kostenlos direkt von den Verwaltern der Einträge selbst getätigt werden. Falls nichts anderes schriftlich vereinbart ist, sind Zahlungen des Kunden nach Rechnungsstellung im Voraus zu leisten. Erst nach Eingang der Zahlung werden wir die entsprechende Leistung erbringen.<br>
            <br>
            Alle Preisangaben sind immer exklusiv der geltenden Mwst in der Schweiz. Der Kunde erklärt durch Vertragsabschluss seine Zustimmung zu einer Versendung der Rechnung per E-Mail oder Post. Der Kunde verpflichtet sich zu einer Vertragsdauer der bei der Anmeldung vereinbarten Laufzeit. Lokale- und Firmeneinträge verlängern sich um die angegebene Vertragsdauer stillschweigend, wenn nicht einen Monat vor Vertragsablauf der Auftrag schriftlich gekündigt wird. Banner-Werbungen müssen rechtzeitig vor Ende der Laufzeit neu gebucht werden.
            <br>
            <br>
            Zürich, April 2015
          </div>
          <div class="clearer"></div>
        </div>
      </section>
    </div>

    <div>
      
    </div>
  </div>
</template>
