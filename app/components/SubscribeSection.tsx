"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Ange en giltig e-postadress.");
      return;
    }

    setStatus("loading");

    const { error } = await supabase
      .from("subscriptions")
      .insert({ email: trimmed });

    if (error) {
      // unique-violation (already subscribed)
      if ((error as any).code === "23505") {
        setStatus("success");
        setMessage("Du är redan anmäld. Tack!");
      } else {
        console.error(error);
        setStatus("error");
        setMessage("Något gick fel. Försök igen senare.");
      }
      return;
    }

    setStatus("success");
    setMessage("Tack! Du kommer få ett mail när sidan är klar.");
    setEmail("");
  };

  const disabled = status === "loading";

  return (
    <section className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-red-700">
        Denna sida är under uppbyggnad.
      </h2>
      <p className="mt-1 text-sm text-gray-700">
        Lämna din e-postadress så hör vi av oss när vi öppnar för registrering
        och lanserar nästa version.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <input
          type="email"
          placeholder="din@email.se"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
        >
          {status === "loading" ? "Skickar..." : "Prenumerera"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-sm ${
            status === "error" ? "text-red-600" : "text-green-700"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
}
