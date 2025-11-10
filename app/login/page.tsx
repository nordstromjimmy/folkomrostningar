"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Kunde inte logga in.");
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Logga in
        </h1>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Logga in för att kunna rösta på förslag.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-postadress
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Har du inget konto?{" "}
          <a
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Skapa konto
          </a>
        </p>
      </div>
    </div>
  );
}
