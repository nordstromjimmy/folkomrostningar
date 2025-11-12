export default function PrivacyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Integritetspolicy</h1>

      <p>
        Vi värnar om din integritet och behandlar personuppgifter på ett säkert
        och ansvarsfullt sätt i enlighet med gällande lagstiftning (GDPR).
      </p>

      <h2 className="text-lg font-medium mt-6">Vilka uppgifter vi samlar in</h2>
      <p>
        När du skapar ett konto lagras endast din e-postadress och ett krypterat
        lösenord i vår databas. Dessa uppgifter används enbart för att du ska
        kunna logga in och delta i röstningar.
      </p>

      <p>
        När du röstar sparas endast en anonym koppling mellan ditt konto och det
        dokument du har röstat på. Själva röstningen (för eller emot) lagras
        utan att kunna kopplas tillbaka till din identitet. Ingen personlig
        information om hur en enskild användare har röstat kan spåras.
      </p>

      <h2 className="text-lg font-medium mt-6">
        Hur vi använder informationen
      </h2>
      <p>Dina uppgifter används endast för:</p>
      <ul className="list-disc list-inside space-y-1">
        <li>att skapa och hantera ditt användarkonto,</li>
        <li>
          att säkerställa att varje användare endast kan rösta en gång per
          dokument,
        </li>
        <li>att visa sammanställda röstresultat för alla användare.</li>
      </ul>

      <h2 className="text-lg font-medium mt-6">Delning av data</h2>
      <p>
        Vi delar inte några personuppgifter med tredje part. All offentlig
        information som visas på webbplatsen är helt anonymiserad och består
        endast av summerade röstresultat.
      </p>

      <h2 className="text-lg font-medium mt-6">Lagring och säkerhet</h2>
      <p>
        Våra databaser och användaruppgifter hanteras via Supabase, en säker
        molntjänst som följer moderna säkerhetsstandarder för lagring och
        åtkomstkontroll. Endast nödvändiga uppgifter lagras.
      </p>

      <h2 className="text-lg font-medium mt-6">Radering av konto</h2>
      <p>
        Du kan när som helst begära att ditt konto och din e-postadress tas bort
        genom att kontakta oss via e-post. Dina eventuella röster ligger kvar i
        det anonyma, aggregerade röstresultatet men kan inte längre kopplas till
        dig.
      </p>

      <h2 className="text-lg font-medium mt-6">Kontakt</h2>
      <p>
        Har du frågor om hur vi hanterar data? Kontakta oss gärna på{" "}
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
