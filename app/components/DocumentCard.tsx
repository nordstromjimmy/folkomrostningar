"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export type DocumentRow = {
  id: number;
  dok_id: string;
  titel: string;
  summary: string | null;
  doktyp: string | null;
  datum: string | null;
  dokument_url_pdf: string | null;
};

type DocumentCardProps = {
  doc: DocumentRow;
};

export function DocumentCard({ doc }: DocumentCardProps) {
  const [votes, setVotes] = useState<number | null>(null);

  useEffect(() => {
    const loadVotes = async () => {
      const { data, error } = await supabase
        .from("vote_counts")
        .select("votes_total")
        .eq("document_id", doc.id)
        .maybeSingle();

      if (!error && data) setVotes(data.votes_total ?? 0);
      else setVotes(0);
    };
    loadVotes();
  }, [doc.id]);

  return (
    <li className="rounded-xl border border-gray-200 bg-slate-50 p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Title + type pill */}
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/dokument/${doc.dok_id}`}
          className="inline-flex items-center text-sm font-medium text-gray-900 hover:underline"
        >
          {doc.titel}
        </Link>
        <span className="inline-flex items-center rounded-full border border-gray-300 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-600">
          {doc.doktyp === "mot"
            ? "Motion"
            : doc.doktyp === "prop"
            ? "Proposition"
            : doc.doktyp ?? "Okänd typ"}
        </span>
      </div>

      {/* Summary */}
      {doc.summary && (
        <p className="mt-2 text-sm italic text-gray-900">
          {doc.summary + ".."}
        </p>
      )}

      {/* Antal röster */}
      <p className="mt-2 text-xs text-gray-600">
        Antal röster: {votes === null ? "Laddar..." : votes}
      </p>

      {/* bottom row: left = link, right = date */}
      <div className="mt-2 flex items-center justify-between gap-2">
        <Link
          href={`/dokument/${doc.dok_id}`}
          className="text-xs font-medium text-blue-600 hover:underline"
        >
          Läs mer &amp; rösta
        </Link>
        <span className="text-xs text-gray-500">
          {doc.datum ? new Date(doc.datum).toLocaleDateString("sv-SE") : ""}
        </span>
      </div>
    </li>
  );
}
