import AppHeader from "../../components/layout/AppHeader";
import { TESTS_CATALOG_SAFE } from "../../constants/test.js";

export default function Home({
  athlete,
  profile,
  l1Progress,
  setView,
}) {
  // -------- Level 1 tests --------
  const tests = TESTS_CATALOG_SAFE;

  // completed tests for this athlete
  const completedSet = l1Progress?.[athlete] || {};
  const completedCount = tests.filter(
    (t) => completedSet[t.id]
  ).length;

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader
        title="Level 1 – Pick a Test"
        onBack={() =>
          setView({
            name: "candidateHub",
            profile:
              profile || {
                name: athlete,
                age: null,
                gender: "",
              },
          })
        }
        profile={profile}
        onProfile={() =>
          setView({
            name: "candidateHub",
            profile:
              profile || {
                name: athlete,
                age: null,
                gender: "",
              },
          })
        }
      />

      <main className="mx-auto max-w-md px-4 py-5 space-y-4">
        {/* Athlete info */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Athlete</div>
            <div className="font-semibold">{athlete}</div>
          </div>

          <button
            onClick={() =>
              setView({
                name: "history",
                athlete,
              })
            }
            className="px-3 py-1.5 rounded-xl border text-sm"
          >
            History
          </button>
        </div>

        {/* Progress */}
        <div className="text-sm text-gray-600">
          Progress:{" "}
          <span className="font-medium">
            {completedCount} / {tests.length}
          </span>{" "}
          completed
        </div>

        {/* Tests list */}
        <div className="space-y-3 pt-2">
          {tests.map((t) => {
            const done = !!completedSet[t.id];

            return (
              <div
                key={t.id}
                onClick={() =>
                  setView({
                    name: "test",
                    athlete,
                    testId: t.id,
                  })
                }
                className="relative p-4 rounded-2xl border bg-white cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{t.icon}</div>

                  <div className="flex-1">
                    <div className="font-semibold">
                      {t.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.desc}
                    </div>
                  </div>
                </div>

                {/* DONE BADGE */}
                {done && (
                  <div className="absolute top-3 right-3 px-2 py-1 text-xs rounded-lg bg-emerald-100 text-emerald-700 font-medium">
                    ✓ Done
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
