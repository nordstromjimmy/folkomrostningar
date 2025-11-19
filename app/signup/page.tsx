"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

// Toggle this when you're ready to re-enable signups
const REGISTRATION_OPEN = false;

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔴 STOP REGISTRATION
    if (!REGISTRATION_OPEN) {
      return;
    }

    // (Your existing logic remains but won't run)
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error) router.push("/login");
  };

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Skapa konto
        </h1>

        {/* 🔴 REGISTRATION DISABLED MESSAGE */}
        {!REGISTRATION_OPEN && (
          <p className="mt-4 text-sm text-red-700 text-center font-medium">
            Registrering är för närvarande avstängd medan vi arbetar vidare med
            sidan. <br /> Kom tillbaka snart!
          </p>
        )}

        {/* Form is still shown but inputs/buttons are disabled */}
        <form onSubmit={handleSubmit} className="mt-6 max-w-sm space-y-4">
          <div className={`${!REGISTRATION_OPEN ? "opacity-40" : ""}`}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-postadress
            </label>
            <input
              id="email"
              type="email"
              disabled={!REGISTRATION_OPEN}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className={`${!REGISTRATION_OPEN ? "opacity-40" : ""}`}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Lösenord
            </label>
            <input
              id="password"
              type="password"
              disabled={!REGISTRATION_OPEN}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={!REGISTRATION_OPEN}
            className="w-full inline-flex justify-center items-center rounded-md bg-blue-300 px-4 py-2 text-sm font-medium text-white cursor-not-allowed"
          >
            Skapa konto
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Har du redan ett konto?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Logga in
          </a>
        </p>
      </div>
    </div>
  );
}
