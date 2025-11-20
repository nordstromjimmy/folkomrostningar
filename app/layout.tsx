import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://folkomrostningar.se"),
  title: {
    default: "Folkomröstningar.se – Följ riksdagens förslag & folkets åsikter",
    template: "%s – Folkomröstningar.se",
  },
  description:
    "En inofficiell plattform för att se vad riksdagen behandlar och vad svenska folket tycker om aktuella motioner och propositioner.",
  keywords: [
    "riksdagen",
    "motioner",
    "propositioner",
    "förslag",
    "politik",
    "folkomröstning",
    "folkomröstningar",
    "folkomröstningar.se",
    "folkomrostningar.se",
    "omröstning",
    "svensk politik",
    "offentliga data",
  ],
  alternates: {
    canonical: "https://folkomrostningar.se",
  },
  openGraph: {
    title: "Folkomröstningar.se",
    description:
      "Se riksdagens dokument och hur svenska folket röstar på aktuella förslag.",
    url: "https://folkomrostningar.se",
    siteName: "Folkomröstningar.se",
    locale: "sv_SE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <head>
        <script
          defer
          data-domain="folkomrostningar.se"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className="flex min-h-screen flex-col bg-white text-black">
        <Header />
        <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-10">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "Folkomröstningar.se",
              description:
                "En inofficiell plattform för att följa riksdagens dokument och se hur folket röstar.",
              url: "https://folkomrostningar.se",
              sameAs: ["https://www.riksdagen.se"],
            }),
          }}
        />
      </body>
    </html>
  );
}
