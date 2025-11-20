import DocumentsInfinite from "./components/DocumentsInfinite";
import HelpPopover from "./components/HelpPopover";
import SubscribeSection from "./components/SubscribeSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl">
        <SubscribeSection />
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Senaste motioner och propositioner{" "}
            <HelpPopover title="">
              <h1>
                <strong>Motion</strong>
              </h1>
              <p>
                En motion till riksdagen är ett skriftligt förslag från en eller
                flera riksdagsledamöter om en ny lag eller en lagändring, som en
                del av riksdagens lagstiftningsprocess. Motionen har som
                betydelse att ge ledamöterna en möjlighet att ta egna initiativ,
                presentera politiska förslag och föra fram sin politik, även som
                motförslag till regeringens propositioner.
              </p>
              <br />
              <h1>
                <strong>Proposition</strong>
              </h1>
              <p>
                En proposition är ett förslag från regeringen till riksdagen om
                till exempel en ny lag. Vissa propositioner består av förslag
                till ny lagstiftning. Andra propositioner innehåller mindre
                eller större ändringar av redan gällande lagar eller förslag
                till riktlinjer av olika slag.
              </p>
            </HelpPopover>
          </h2>
          <DocumentsInfinite />
        </section>
      </div>
    </main>
  );
}
