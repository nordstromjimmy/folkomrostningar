import HelpPopover from "@/app/components/HelpPopover";
import { VoteButtons } from "@/app/components/VoteButtons";
import { supabase } from "@/app/lib/supabaseClient";
import type { Metadata } from "next";

type DocumentDetail = {
  id: number;
  dok_id: string;
  titel: string;
  summary: string | null;
  doktyp: string | null;
  datum: string | null;
  dokument_url_pdf: string | null;
  authors: Author[] | null;
  vote_questions: VoteQuestion[] | null;
};

type Author = {
  roll: string | null;
  namn: string | null;
  partibet: string | null;
  intressent_id: string | null;
};

type DetailPageProps = {
  params: Promise<{ dok_id: string }>;
};

type VoteQuestion = {
  question: string;
};

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { dok_id } = await params;

  // Hämta dokumentet från Supabase
  const { data, error } = await supabase
    .from("documents")
    .select("titel, summary, doktyp")
    .eq("dok_id", dok_id)
    .maybeSingle();

  if (error || !data) {
    // Fallback if missing
    return {
      title: `Dokument ${dok_id} – Folkomröstningar.se`,
      description:
        "Se information om detta dokument från riksdagens öppna data på folkomrostningar.se.",
      alternates: {
        canonical: `https://folkomrostningar.se/dokument/${dok_id}`,
      },
    };
  }

  const { titel, summary, doktyp } = data;

  const typeLabel =
    doktyp === "mot"
      ? "Motion"
      : doktyp === "prop"
      ? "Proposition"
      : "Dokument";

  const desc =
    (summary as string | null)?.trim()?.slice(0, 250) ||
    `Läs ${typeLabel.toLowerCase()} från riksdagens öppna data och se hur användare röstar på förslaget.`;

  return {
    title: `${titel} – ${typeLabel} – Folkomröstningar.se`,
    description: desc,
    alternates: {
      canonical: `https://folkomrostningar.se/dokument/${dok_id}`,
    },
    openGraph: {
      title: `${titel} – ${typeLabel}`,
      description: desc,
      url: `https://folkomrostningar.se/dokument/${dok_id}`,
      type: "article",
    },
  };
}

export default async function DocumentDetailPage({ params }: DetailPageProps) {
  const { dok_id } = await params;

  const { data, error } = await supabase
    .from("documents")
    .select(
      "id, dok_id, titel, summary, doktyp, datum, dokument_url_pdf, authors, vote_questions"
    )
    .eq("dok_id", dok_id)
    .maybeSingle();

  if (error) {
    console.error("Error loading document", { error, dok_id });
  }

  const doc = data as DocumentDetail | null;

  const mainQuestion =
    doc!.vote_questions && doc!.vote_questions.length > 0
      ? doc!.vote_questions[0].question
      : null;

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
      <h1 className="text-lg font-semibold text-gray-900">{doc.titel}</h1>

      {/* Authors */}
      {doc.authors && doc.authors.length > 0 && (
        <p className="mt-1 text-sm text-gray-700">
          {doc.authors
            .map((a) => {
              if (!a) return null;
              const name = a.namn ?? "";
              const party = a.partibet ? ` (${a.partibet})` : "";
              return `${name}${party}`;
            })
            .filter(Boolean)
            .join(", ")}
        </p>
      )}
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
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Läs hela förslaget
          </h2>

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
        <h2 className="text-xl font-semibold text-gray-900">
          Vad tycker du om detta förslag?
          <HelpPopover title="Sammanfattning">
            <p className="mt-1 text-sm text-gray-500">
              Nedan är en förenklad formulering baserad på dokumentets förslag.
            </p>
          </HelpPopover>
        </h2>

        {mainQuestion ? (
          <>
            <p className="mt-2 text-ls text-gray-900">{mainQuestion}</p>
            <VoteButtons documentId={doc.id} />
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            För denna motion har vi inte kunnat formulera en tydlig röstfråga.
            Du kan läsa hela texten via PDF-länken ovan.
          </p>
        )}
      </div>
    </div>
  );
}
