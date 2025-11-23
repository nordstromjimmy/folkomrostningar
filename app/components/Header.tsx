"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="bg-white/80 backdrop-blur border-b border-slate-200">
      {/* Top bar */}
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3 md:py-4">
        {/* Logo + name */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Folkomröstningar logo"
            width={40}
            height={40}
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-semibold text-slate-900">
              Folkomröstningar.se
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 text-sm md:flex">
          {isLoggedIn ? (
            <>
              {user?.email && (
                <Link
                  href="/profile"
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Min profil
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                Logga ut
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-sm bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-800"
              >
                Logga in
              </Link>
              <Link
                href="/signup"
                className="text-xs font-medium text-slate-700 hover:text-slate-900"
              >
                Skapa konto
              </Link>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Öppna meny"
        >
          <span className="sr-only">Öppna meny</span>
          <div className="space-y-1">
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-transform ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-900 transition-transform ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Tagline / info */}
      <div className="px-4 pb-4 text-center">
        <p className="mx-auto mt-2 max-w-3xl text-sm text-slate-700">
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-14 py-4">
            <span className="text-sm sm:text-sm text-slate-800">
              Inofficiell plattform för att få en översikt över vad riksdagen
              behandlar och vad svenska folket tycker om nya förslag och lagar.
              Sidan har ingen koppling till Sveriges riksdag eller regering.
            </span>
          </span>
        </p>

        <p className="mt-3 text-xs text-slate-500">
          Data hämtas från{" "}
          <a
            href="https://www.riksdagen.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-900 hover:underline"
          >
            riksdagen.se
          </a>
        </p>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-3 text-sm md:hidden">
          <nav className="flex flex-col items-start gap-2">
            {isLoggedIn ? (
              <>
                {user?.email && (
                  <Link
                    href="/profile"
                    className="mb-1 w-full rounded-md px-2 py-1 text-left text-slate-700 hover:bg-slate-50"
                    onClick={() => setMenuOpen(false)}
                  >
                    Min profil
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full rounded-md border border-slate-300 px-2 py-1 text-left text-red-600 hover:bg-red-50"
                >
                  Logga ut
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full rounded-sm bg-slate-900 px-3 py-1.5 text-left text-xs font-medium text-slate-50 hover:bg-slate-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Logga in
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-md border border-slate-300 px-2 py-1 text-left text-slate-700 hover:bg-slate-50"
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
