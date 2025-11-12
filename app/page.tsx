import DocumentsInfinite from "./components/DocumentsInfinite";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-4 py-4">
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Senaste motioner och propositioner
          </h2>
          <DocumentsInfinite />
        </section>
      </div>
    </main>
  );
}
