"use client";

type Counts = {
  for: number;
  against: number;
  total: number;
};

export default function VoteResultsBar({ counts }: { counts: Counts }) {
  const { for: forCount, against: againstCount, total } = counts;

  const forPct = total > 0 ? (forCount / total) * 100 : 0;
  const againstPct = total > 0 ? (againstCount / total) * 100 : 0;

  return (
    <div className="mt-4 w-full">
      <h2 className="text-md text-center font-semibold text-gray-900">
        Så här röstar svenska folket
      </h2>

      {total === 0 ? (
        <p className="mt-1 text-sm text-gray-700">Inga röster ännu</p>
      ) : (
        <>
          <div className="mt-2 relative h-6 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute left-0 top-0 h-full bg-green-600 transition-all duration-700"
              style={{ width: `${forPct}%` }}
            />
            <div
              className="absolute right-0 top-0 h-full bg-red-600 transition-all duration-700"
              style={{ width: `${againstPct}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-gray-700">
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full bg-green-600" />
              För: <strong>{forCount}</strong> ({forPct.toFixed(1)}%)
            </span>

            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full bg-red-600" />
              Emot: <strong>{againstCount}</strong> ({againstPct.toFixed(1)}%)
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-500 text-right">
            Totalt: <strong>{total}</strong> röster
          </p>
        </>
      )}
    </div>
  );
}
