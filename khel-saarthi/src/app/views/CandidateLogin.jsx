import AppHeader from "../../components/layout/AppHeader";

export default function CandidateLogin({ name, setName, setView }) {
  return (
    <div className="min-h-dvh bg-white">
      <AppHeader
        title="Candidate Login"
        onBack={() => setView({ name: "landing" })}
      />

      <main className="mx-auto max-w-md px-4 py-6">
        <label className="block mb-3 text-sm font-medium">Name</label>

        <input
          className="w-full rounded-2xl border border-gray-300 px-4 py-3"
          placeholder="e.g., A. Sharma"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={() =>
            setView({
              name: "candidateDetails",
              athleteName: name.trim() || "Guest Athlete",
            })
          }
          className="mt-4 w-full py-3 rounded-2xl bg-emerald-600 text-white"
        >
          Continue
        </button>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Demo only. Data stays in your browser.
        </p>
      </main>
    </div>
  );
}
