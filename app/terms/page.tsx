export default function TermsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Användarvillkor</h1>

      <p>
        Genom att använda folkomrostningar.se godkänner du dessa villkor. Syftet
        med tjänsten är att erbjuda en inofficiell och förenklad plattform där
        användare kan läsa om aktuella motioner och propositioner i riksdagen
        samt uttrycka sin åsikt genom att rösta för eller emot.
      </p>

      <h2 className="text-lg font-medium mt-6">1. Tjänstens natur</h2>
      <p>
        Den här webbplatsen är <strong>inte</strong> en officiell röstnings-
        eller beslutsplattform för Sveriges riksdag eller någon myndighet.
        Resultaten är endast opinionsindikatorer och saknar juridisk verkan.
      </p>

      <h2 className="text-lg font-medium mt-6">2. Användarkonton</h2>
      <p>
        För att kunna rösta krävs ett konto. Du är ansvarig för att hålla ditt
        konto och lösenord säkra. Vi förbehåller oss rätten att stänga eller
        begränsa konton som bryter mot dessa villkor eller misstänks missbruka
        tjänsten.
      </p>

      <h2 className="text-lg font-medium mt-6">3. Röstningsregler</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Varje användare kan rösta en (1) gång per dokument.</li>
        <li>Du kan ändra din röst när som helst.</li>
        <li>
          Alla röster lagras anonymt och kan inte kopplas till din identitet.
        </li>
        <li>
          Manipulation av röstningssystemet eller försök att kringgå
          begränsningar är förbjudet.
        </li>
      </ul>

      <h2 className="text-lg font-medium mt-6">4. Användarens ansvar</h2>
      <p>När du använder tjänsten förbinder du dig att:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>
          inte publicera stötande, diskriminerande eller olagligt innehåll,
        </li>
        <li>inte försöka hacka, störa eller manipulera webbplatsen,</li>
        <li>respektera andras integritet och säkerhet.</li>
      </ul>

      <h2 className="text-lg font-medium mt-6">5. Datakällor</h2>
      <p>
        All dokumentinformation på webbplatsen hämtas från{" "}
        <a
          href="https://www.riksdagen.se/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          riksdagen.se
        </a>{" "}
        (offentliga öppna data). Webbplatsen är fristående och saknar koppling
        till riksdagen.
      </p>

      <h2 className="text-lg font-medium mt-6">6. Ansvarsbegränsning</h2>
      <p>
        Vi ansvarar inte för eventuella felaktigheter i dokumentdata,
        driftstopp, tekniska problem eller konsekvenser som uppstår på grund av
        användning av tjänsten. Tjänsten erbjuds "som den är" utan garantier.
      </p>

      <h2 className="text-lg font-medium mt-6">7. Ändringar av villkoren</h2>
      <p>
        Vi kan komma att uppdatera dessa villkor vid behov. Fortsatt användning
        av tjänsten innebär att du accepterar de uppdaterade villkoren.
      </p>

      <h2 className="text-lg font-medium mt-6">8. Kontakt</h2>
      <p>
        För frågor om användarvillkoren, kontakta oss på{" "}
        <a
          href="mailto:info@folkomrostningar.se"
          className="text-blue-600 hover:underline"
        >
          info@folkomrostningar.se
        </a>
        .
      </p>
    </div>
  );
}
