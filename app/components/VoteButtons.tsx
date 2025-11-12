"use client";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";

type Counts = { for: number; against: number; total: number };

export function VoteButtons({ documentId }: { documentId: number }) {
  const [ready, setReady] = useState(false); // unified loading
  const [casting, setCasting] = useState<false | "for" | "against">(false);
  const [counts, setCounts] = useState<Counts>({
    for: 0,
    against: 0,
    total: 0,
  });
  const [myVote, setMyVote] = useState<1 | -1 | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const [{ data: u }, { data: countsRow }] = await Promise.all([
          supabase.auth.getUser(),
          supabase
            .from("vote_counts")
            .select("votes_for, votes_against, votes_total")
            .eq("document_id", documentId)
            .maybeSingle(),
        ]);

        if (cancelled) return;
        setUser(u.user ?? null);

        const c = countsRow
          ? {
              for: countsRow.votes_for ?? 0,
              against: countsRow.votes_against ?? 0,
              total: countsRow.votes_total ?? 0,
            }
          : { for: 0, against: 0, total: 0 };
        setCounts(c);

        if (u.user) {
          const { data: receipt } = await supabase
            .from("vote_receipts")
            .select("opaque_id")
            .eq("document_id", documentId)
            .maybeSingle();

          if (receipt?.opaque_id) {
            const { data: vp } = await supabase
              .from("votes_public")
              .select("choice")
              .eq("opaque_id", receipt.opaque_id)
              .maybeSingle();
            if (!cancelled)
              setMyVote((vp?.choice as 1 | -1 | undefined) ?? null);
          }
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [documentId]);

  const cast = async (choice: 1 | -1) => {
    if (!user) return; // just ignore if not logged in
    setCasting(choice === 1 ? "for" : "against");

    const { data, error } = await supabase.rpc("rpc_vote", {
      p_document_id: documentId,
      p_choice: choice,
    });

    setCasting(false);
    if (error) {
      console.error(error);
      return;
    }

    setMyVote(choice);
    if (data && data.length > 0) {
      const row = data[0];
      setCounts({
        for: Number(row.votes_for) || 0,
        against: Number(row.votes_against) || 0,
        total: Number(row.votes_total) || 0,
      });
    }
  };

  if (!ready) {
    return (
      <div className="mt-6 space-y-3">
        <div className="h-5 w-60 rounded bg-gray-200 animate-pulse" />
        <div className="flex gap-3">
          <div className="h-9 w-28 rounded bg-gray-200 animate-pulse" />
          <div className="h-9 w-28 rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="h-4 w-40 rounded bg-gray-200 animate-pulse" />
      </div>
    );
  }

  const baseBtn =
    "rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer disabled:opacity-50 transition";

  return (
    <div className="mt-6 flex flex-col gap-3">
      {!user && (
        <p className="text-sm text-gray-600">
          Om du vill delta i röstningar behöver du vara inloggad.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          disabled={!user || !!casting}
          onClick={() => cast(1)}
          className={`${baseBtn} ${
            myVote === 1
              ? "bg-green-700"
              : !user
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {casting === "for"
            ? "Skickar…"
            : myVote === 1
            ? "Röstat för"
            : "Rösta för"}
        </button>

        <button
          disabled={!user || !!casting}
          onClick={() => cast(-1)}
          className={`${baseBtn} ${
            myVote === -1
              ? "bg-red-700"
              : !user
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {casting === "against"
            ? "Skickar…"
            : myVote === -1
            ? "Röstat emot"
            : "Rösta emot"}
        </button>
      </div>

      {user && myVote !== null && (
        <p className="text-xs text-gray-600">
          Din röst är registrerad som{" "}
          <span className="font-medium">{myVote === 1 ? "för" : "emot"}</span>.
        </p>
      )}

      {counts.total === 0 ? (
        <p className="text-sm text-gray-700">Inga röster ännu</p>
      ) : (
        <p className="text-sm text-gray-700">
          <strong>Röster: </strong>För: {counts.for} · Emot: {counts.against} ·
          Totalt: {counts.total}
        </p>
      )}
    </div>
  );
}
