import React from "react";
import AppHeader from "../../components/layout/AppHeader";

export default function Landing({ setView }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-emerald-50 to-white">
      <AppHeader title="KHEL SAARTHI" />

      <main className="mx-auto max-w-md px-4 py-10 space-y-4">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-600 text-white grid place-items-center text-2xl shadow-lg">
            KS
          </div>

          <h2 className="mt-4 text-xl font-semibold">Welcome</h2>
          <p className="text-sm text-gray-600">Choose your login</p>
        </div>

        <button
          onClick={() => setView({ name: "candidateLogin" })}
          className="w-full py-3 rounded-2xl bg-emerald-600 text-white active:scale-95"
        >
          Candidate Login
        </button>

        <button
          onClick={() => setView({ name: "reviewSai" })}
          className="w-full py-3 rounded-2xl border border-gray-300 active:scale-95"
        >
          Official Login
        </button>
      </main>
    </div>
  );
}
