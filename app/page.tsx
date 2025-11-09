import { DocumentCard, DocumentRow } from "./components/DocumentCard";
import { supabase } from "./lib/supabaseClient";

export default async function HomePage() {
  const { data, error } = await supabase
    .from("documents")
    .select("id, dok_id, titel, summary, doktyp, datum, dokument_url_pdf")
    .gte("datum", "2025-11-01")
    .order("datum", { ascending: false })
    .limit(20);

  const documents = (data ?? []) as DocumentRow[];

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-4 py-4">
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Senaste motioner och propositioner
          </h2>

          {documents.length === 0 ? (
            <p className="text-sm text-gray-600">Inga dokument hittades.</p>
          ) : (
            <ul className="space-y-3">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
