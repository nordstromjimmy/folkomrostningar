import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title: "Folkomröstningar - ",
  description:
    "Inofficiell plattform för att se vad riksdagen behandlar och vad svenska folket tycker om nya förslag.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="flex min-h-screen flex-col bg-white text-black">
        <Header />
        <main className="flex-grow mx-auto w-full max-w-4xl px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
