import { supabase } from "@/app/lib/supabaseClient";

type DocumentDetail = {
  id: number;
  dok_id: string;
  titel: string;
  summary: string | null;
  doktyp: string | null;
  datum: string | null;
  dokument_url_pdf: string | null;
};

type DetailPageProps = {
  params: Promise<{ dok_id: string }>;
};

export default async function DocumentDetailPage({ params }: DetailPageProps) {
  const { dok_id } = await params;

  const { data, error } = await supabase
    .from("documents")
    .select("id, dok_id, titel, summary, doktyp, datum, dokument_url_pdf")
    .eq("dok_id", dok_id)
    .maybeSingle();

  if (error) {
    console.error("Error loading document", { error, dok_id });
  }

  const doc = data as DocumentDetail | null;

  if (!doc) {
    return (
      <div className="min-h-[50vh] py-10">
        <h1 className="text-xl font-semibold text-gray-900">
          Dokument hittades inte
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Det verkar som att detta dokument inte finns i systemet.
        </p>
      </div>
    );
  }
  return (
    <div className="min-h-[50vh] py-10">
      <h1 className="text-2xl font-semibold text-gray-900">{doc.titel}</h1>

      <p className="mt-2 text-sm text-gray-500">
        {doc.doktyp === "mot"
          ? "Motion"
          : doc.doktyp === "prop"
          ? "Proposition"
          : doc.doktyp ?? "Okänd typ"}
        {doc.datum && ` · ${new Date(doc.datum).toLocaleDateString("sv-SE")}`}
      </p>

      {doc.summary && (
        <p className="mt-4 whitespace-pre-line text-sm text-gray-900">
          {doc.summary}
        </p>
      )}

      {doc.dokument_url_pdf && (
        <div className="mt-6">
          <a
            href={doc.dokument_url_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-blue-700"
          >
            Öppna PDF
          </a>
        </div>
      )}

      <div className="mt-10 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Vad tycker du om detta förslag?
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Snart kommer du kunna logga in och rösta här.
        </p>
      </div>
    </div>
  );
}
