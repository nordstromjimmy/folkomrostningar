import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 py-8 text-center text-sm text-gray-700">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Kontakt</h3>
          <p className="mt-1">
            Har du frågor eller synpunkter? Kontakta oss på{" "}
            <a
              href="mailto:info@folkomrostningar.se"
              className="text-blue-600 hover:underline"
            >
              info@folkomrostningar.se
            </a>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-gray-600">
          <Link className="hover:text-blue-600 hover:underline" href="/about">
            Om sidan
          </Link>
          <Link className="hover:text-blue-600 hover:underline" href="/privacy">
            Integritetspolicy
          </Link>
          <Link className="hover:text-blue-600 hover:underline" href="/terms">
            Användarvillkor
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} folkomrostningar.se
        </p>
      </div>
    </footer>
  );
}
