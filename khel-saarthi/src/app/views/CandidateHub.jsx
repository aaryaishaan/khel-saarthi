import AppHeader from "../../components/layout/AppHeader";

export default function CandidateHub({ profile, setView }) {
  return (
    <div className="min-h-dvh bg-[#FAFAF7]">
      <AppHeader
        title="KHEL SAARTHI • SAI"
        profile={profile}
        onProfile={() =>
          alert(
            `Profile\nName: ${profile.name}\nGender: ${
              profile.gender || "-"
            }\nAge: ${profile.age ?? "-"}`
          )
        }
      />

      <main className="mx-auto max-w-md px-4 py-5 space-y-5">
        {/* Step 1 */}
        <div className="rounded-2xl bg-white border p-4">
          <div className="font-semibold mb-1">Step 1: Verify identity</div>
          <div className="text-sm text-gray-600">
            (Demo) Face and ID match ✓
          </div>
        </div>

        {/* Tutorials */}
        <div className="rounded-2xl bg-white border p-4">
          <div className="font-semibold mb-3">Tutorials – Recording Tips</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              "Lighting & framing",
              "Keep phone stable",
              "Full body in frame",
              "Clear background",
            ].map((t) => (
              <div
                key={t}
                className="rounded-xl border p-3 bg-gray-50"
              >
                🎬 {t}
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="rounded-2xl bg-white border p-4">
          <div className="font-semibold mb-2">How it works</div>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
            <li>Level 1: Upload/Record short clips for core drills</li>
            <li>Wait for SAI scorecard (percentile)</li>
            <li>Level 2: Upload advanced drills</li>
            <li>SAI final scorecard after 7 days</li>
          </ol>
        </div>

        <button
          onClick={() =>
            setView({ name: "home", athlete: profile.name })
          }
          className="w-full py-3 rounded-2xl bg-emerald-600 text-white"
        >
          Start Level 1
        </button>
      </main>
    </div>
  );
}
