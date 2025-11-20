"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

type SupabaseUser = {
  id: string;
  email?: string;
} | null;

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser>(null);

  // Check current user once on mount + listen for auth changes
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/");
  };

  const isLoggedIn = !!user;

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 md:py-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          <Link href="/">Folkomröstningar.se</Link>
        </h1>

        <nav className="hidden items-center gap-3 text-sm md:flex">
          {isLoggedIn ? (
            <>
              {user?.email && (
                <Link
                  href="/profile"
                  className="text-xs text-blue-900 hover:underline"
                >
                  Min profil
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="rounded-md border border-red-600 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-blue-700 bg-blue-700 px-3 py-1 text-sm text-white hover:bg-blue-800"
              >
                Logga in
              </Link>
              <Link
                href="/signup"
                className="text-blue-700 hover:text-blue-900"
              >
                Skapa konto
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Öppna meny"
        >
          <span className="sr-only">Öppna meny</span>
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-5 bg-gray-800 transition-transform ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-800 transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-800 transition-transform ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div className="px-4 pb-3 text-center md:pb-4">
        <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-gray-100">
          <span className="inline-block rounded-xl border-b-4 border-yellow-200 bg-blue-600 px-6 py-4">
            Inofficiell plattform för att lättare få en översyn över vad
            riksdagen behandlar och vad svenska folket tycker om nya förslag och
            lagar. <br></br> Sidan har ingen koppling till Sveriges riksdag
            eller regering.
          </span>
        </p>

        <p className="mt-3 text-sm text-gray-500">
          Data hämtas från{" "}
          <a
            href="https://www.riksdagen.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-900 hover:underline"
          >
            riksdagen.se
          </a>
        </p>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white/95 px-4 py-3 text-sm md:hidden">
          <nav className="flex flex-col items-start gap-2">
            {isLoggedIn ? (
              <>
                {user?.email && (
                  <Link
                    href="/profile"
                    className="mb-1 w-full rounded-md px-2 py-1 text-left text-blue-900 hover:bg-blue-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Min profil
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full rounded-md border px-2 py-1 text-left text-red-600"
                >
                  Logga ut
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full rounded-md border border-blue-700 bg-blue-700 px-3 py-1 text-left text-white hover:bg-blue-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Logga in
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-md border border-blue-700 px-2 py-1 text-left text-blue-700 hover:bg-blue-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Skapa konto
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
