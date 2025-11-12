"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login"); // redirect if not logged in
        return;
      }
      setUser(data.user);
      setLoading(false);
    }

    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-600">Laddar profil...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-[40vh] items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Profil
        </h1>

        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-medium">E-postadress:</span>{" "}
            {user.email || "—"}
          </p>
          <p>
            <span className="font-medium">Användar-ID:</span> {user.id || "—"}
          </p>
          <p>
            <span className="font-medium">Skapad:</span>{" "}
            {new Date(user.created_at).toLocaleString("sv-SE")}
          </p>
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/");
          }}
          className="mt-8 w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 cursor-pointer"
        >
          Logga ut
        </button>
      </div>
    </main>
  );
}
