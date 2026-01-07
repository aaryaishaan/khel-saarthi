import AppHeader from "../../components/layout/AppHeader";
import { TESTS_CATALOG_SAFE } from "../../constants/test.js";

function getTest(testId) {
  return (
    TESTS_CATALOG_SAFE.find((t) => t.id === testId) || {
      title: testId,
    }
  );
}

export default function Result({
  summary,
  profile,
  setView,
  l1Progress,
}) {
  const test = getTest(summary.testId);
  const allDone =
    Object.keys(l1Progress?.[summary.athlete] || {}).length ===
    TESTS_CATALOG_SAFE.length;

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader
        title="Results"
        onBack={() =>
          setView({ name: "home", athlete: summary.athlete })
        }
        profile={profile}
      />

      <main className="mx-auto max-w-md px-4 py-5 space-y-5">
        {/* Athlete + Test */}
        <div className="rounded-2xl border p-4 bg-gray-50">
          <div className="text-sm text-gray-600">Athlete</div>
          <div className="font-semibold">{summary.athlete}</div>

          <div className="text-sm text-gray-600 mt-3">Test</div>
          <div className="font-semibold">{test.title}</div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border rounded-xl">
              <div className="text-xs text-gray-500">
                Performance
              </div>
              <div className="text-xl font-bold">
                {summary.metrics.value}{" "}
                {summary.metrics.unit}
              </div>
            </div>

            <div className="p-3 bg-white border rounded-xl">
              <div className="text-xs text-gray-500">Date</div>
              <div className="text-sm font-medium">
                {new Date(summary.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="rounded-2xl border p-4">
          <div className="font-semibold mb-2">
            Score Breakdown
          </div>
          <div className="grid grid-cols-2 gap-3">
            {summary.stageBreakdown.map((s) => (
              <div
                key={s.stage}
                className="p-3 bg-gray-50 border rounded-xl"
              >
                <div className="text-xs text-gray-500">
                  {s.stage}
                </div>
                <div className="text-lg font-semibold">
                  {s.stage === "Consistency"
                    ? `${s.score}%`
                    : `${s.score}/100`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WAIT FOR SAI CARD */}
        {!allDone && (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
            <div className="font-semibold">
              Wait for SAI scorecard
            </div>
            <div className="text-sm text-amber-700 mt-1">
              Complete all Level 1 drills and then refresh to
              view your percentile.
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              setView({ name: "home", athlete: summary.athlete })
            }
            className="py-3 rounded-2xl border"
          >
            New Test
          </button>

          <button
            onClick={() =>
              setView({
                name: "history",
                athlete: summary.athlete,
              })
            }
            className="py-3 rounded-2xl bg-emerald-600 text-white"
          >
            See History
          </button>
        </div>
      </main>
    </div>
  );
}
