import AppHeader from "../../components/layout/AppHeader";
import VideoCapture from "../../components/video/VideoCapture";

export default function Upload({ view, profile, setView, onVideo }) {
  return (
    <div className="min-h-dvh bg-white">
      <AppHeader
        title="Record"
        onBack={() =>
          setView({
            name: "test",
            athlete: view.athlete,
            testId: view.testId,
          })
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
        {/* Sprint is NOT recorded in L1 */}
        {view.testId === "sprint100m" ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="font-semibold mb-1">
              100m Sprint — GPS Mode
            </div>
            <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1">
              <li>Turn ON GPS on your phone.</li>
              <li>
                Keep the phone with you and run 100m on a straight
                track.
              </li>
              <li>
                Video capture is disabled for this drill in Level 1.
              </li>
            </ul>
            <div className="text-xs text-amber-700 mt-2">
              (Future update: automatic timing using GPS + IMU)
            </div>
          </div>
        ) : (
          <>
            <VideoCapture
              testId={view.testId}
              onLiveMetric={() => {}}
              onVideoReady={(file, metric) => {
                // 🔥 central post-processing pipeline
                onVideo(file, metric);
              }}
            />

            <div className="text-xs text-gray-500 text-center">
              Tip: Short clips (5–15s) are enough for the demo.
            </div>
          </>
        )}
      </main>
    </div>
  );
}
