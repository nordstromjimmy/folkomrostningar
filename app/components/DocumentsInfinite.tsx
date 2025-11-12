"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { DocumentCard, DocumentRow } from "./DocumentCard";

const PAGE_SIZE = 20;

export default function DocumentsInfinite() {
  const [items, setItems] = useState<DocumentRow[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const didInitRef = useRef(false);
  const seenIdsRef = useRef<Set<number>>(new Set());

  const mergeUnique = (incoming: DocumentRow[]) => {
    if (!incoming?.length) return;
    const next: DocumentRow[] = [];
    for (const doc of incoming) {
      if (!seenIdsRef.current.has(doc.id)) {
        seenIdsRef.current.add(doc.id);
        next.push(doc);
      }
    }
    if (next.length) {
      setItems((prev) => [...prev, ...next]);
      setOffset((prev) => prev + next.length);
    }
    if (incoming.length < PAGE_SIZE) setHasMore(false);
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/documents?limit=${PAGE_SIZE}&offset=${offset}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      const newItems = (data?.items ?? []) as DocumentRow[];
      mergeUnique(newItems);
    } catch (e) {
      console.error("Failed to load more documents", e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, offset]);

  // Initial load – run once
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    loadMore();
  }, [loadMore]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) loadMore();
      },
      { rootMargin: "400px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      {items.length === 0 && !loading && (
        <p className="text-sm text-gray-600">
          Inga röstbara dokument hittades.
        </p>
      )}

      <ul className="space-y-3">
        {items.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </ul>

      <div className="mt-4 flex justify-center">
        {loading && <p className="text-xs text-gray-500">Laddar fler…</p>}
      </div>
      <div ref={sentinelRef} className="h-4" />
    </>
  );
}
