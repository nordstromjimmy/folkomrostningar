import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white py-6 text-center sticky top-0 bg-white/80 backdrop-blur">
      <h1 className="text-3xl font-semibold text-gray-900">
        <Link href="/">Folkomröstningar.se</Link>
      </h1>

      <p className="mt-6 mx-auto px-4 max-w-2xl text-lg font-medium text-gray-100 leading-relaxed">
        <span className="inline-block rounded-xl border-b-4 border-yellow-200 bg-blue-600 px-6 py-4">
          Inofficiell plattform för att lättare få en översyn över vad riksdagen
          behandlar och vad svenska folket tycker om nya förslag och lagar.
        </span>
      </p>

      <p className="mt-4 text-sm text-gray-500">
        Data hämtas från{" "}
        <a
          href="https://www.riksdagen.se/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-900 hover:underline"
        >
          riksdagen.se
        </a>{" "}
      </p>
    </header>
  );
}
