import AppHeader from "../../components/layout/AppHeader";

export default function Processing({ testId, fileName }) {
  return (
    <div className="min-h-dvh bg-white">
      <AppHeader title="Processing…" />

      <main className="mx-auto max-w-md px-4 py-10">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-24 h-24 rounded-full border-8 border-emerald-100 animate-spin flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-8 border-emerald-300"></div>
          </div>

          <div className="mt-6 text-center">
            <div className="font-semibold text-lg">
              Analyzing your video
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {fileName || "recording.webm"}
            </div>
            <div className="text-xs text-gray-500 mt-3">
              AI is estimating reps, posture & consistency…
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
