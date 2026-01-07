import AppHeader from "../../components/layout/AppHeader";
import { TESTS_CATALOG_SAFE, TEST_ART } from "../../constants/test.js";

/**
 * This screen is a 1:1 extraction of:
 * if (view.name === "test") { ... }
 * from your original App.jsx
 */
export default function Test({ view, profile, setView, markL1Completed }) {
  const test =
    TESTS_CATALOG_SAFE.find((t) => t.id === view.testId) || {
      id: "unknown",
      title: "Unknown Test",
      desc: "—",
      metric: "reps",
      icon: "❓",
    };

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader
        title={test.title}
        onBack={() =>
          setView({ name: "home", athlete: view.athlete })
        }
        profile={profile}
        onProfile={() =>
          setView({
            name: "candidateHub",
            profile:
              profile || {
                name: view.athlete,
                gender: "",
                age: null,
              },
          })
        }
      />

      <main className="mx-auto max-w-md px-4 py-5 space-y-5">
        {/* ================= SPRINT SPECIAL CASE ================= */}
        {view.testId === "sprint100m" ? (
          <>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="font-semibold mb-1">
                100m Sprint — GPS Mode
              </div>
              <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1">
                <li>Turn ON GPS on your phone.</li>
                <li>
                  Keep the phone with you and run 100m on a
                  straight track.
                </li>
                <li>
                  Video capture is disabled for this drill in
                  Level 1.
                </li>
              </ul>
              <div className="text-xs text-amber-700 mt-2">
                (Future: automatic timing using GPS + IMU)
              </div>
            </div>

            <button
              onClick={() => {
                markL1Completed(view.athlete, "sprint100m");
                alert(
                  "100m Sprint marked complete (demo). Finish the other drills to unlock Level 2."
                );
                setView({
                  name: "home",
                  athlete: view.athlete,
                });
              }}
              className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-medium active:scale-95"
            >
              Mark Sprint as Done
            </button>
          </>
        ) : (
          <>
            {/* ================= INSTRUCTIONS CARD ================= */}
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4">
              <div className="font-semibold mb-1">
                Instructions
              </div>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>{test.desc}</li>
                <li>
                  Place the phone in a stable position with full
                  body in frame.
                </li>
                <li>
                  Good lighting improves recognition quality.
                </li>

                {/* Jumping Jacks specific */}
                {view.testId === "jumpingjacks" && (
                  <li>
                    <span className="font-medium">
                      How it counts:
                    </span>{" "}
                    Start <b>CLOSED</b> (feet together, hands
                    down) → go <b>FULLY OPEN</b> (feet wide +
                    both wrists above head) → back to{" "}
                    <b>CLOSED</b>.
                  </li>
                )}

                {/* Pushups & Plank tip */}
                {(view.testId === "pushups" ||
                  view.testId === "plank") && (
                  <li>
                    Rotate your phone to{" "}
                    <b>landscape</b>, enable auto-rotate, then
                    refresh once for better detection.
                  </li>
                )}

                {/* Plank specific */}
                {view.testId === "plank" && (
                  <li>
                    <span className="font-medium">
                      Plank timing:
                    </span>{" "}
                    Timer starts only when body is straight
                    (shoulder–hip–ankle aligned) and steady for
                    ~0.4s.
                  </li>
                )}
              </ul>
            </div>

            {/* ================= INSTRUCTION ART ================= */}
            {TEST_ART[view.testId] && (
              <div className="rounded-2xl border border-gray-200 bg-white p-2">
                <div className="w-full aspect-video max-h-64 overflow-hidden flex items-center justify-center">
                  <img
                    src={TEST_ART[view.testId]}
                    alt={`${test.title} guide`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* ================= START RECORD ================= */}
            <button
              onClick={() =>
                setView({
                  name: "upload",
                  athlete: view.athlete,
                  testId: view.testId,
                })
              }
              className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-medium active:scale-95"
            >
              Start – Record
            </button>
          </>
        )}
      </main>
    </div>
  );
}
