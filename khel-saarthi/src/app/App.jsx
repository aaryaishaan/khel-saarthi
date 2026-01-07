import { useState } from "react";

import Landing from "./views/Landing";
import CandidateLogin from "./views/CandidateLogin";
import CandidateDetails from "./views/CandidateDetails";
import CandidateHub from "./views/CandidateHub";
import Home from "./views/Home";
import Test from "./views/Test";
import Upload from "./views/Upload";
import Processing from "./views/Processing";
import Result from "./views/Result";
import History from "./views/History";

export default function App() {
  const [view, setView] = useState({ name: "landing" });
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(null);
  const [history, setHistory] = useState([]);
  const [l1Progress, setL1Progress] = useState({});

  /* ---------------- L1 HELPERS ---------------- */

  const L1_TEST_IDS = [
    "sprint100m",
    "pushups",
    "squats",
    "jumpingjacks",
    "plank",
  ];

  function markL1Completed(athlete, testId) {
    setL1Progress((prev) => {
      const set = prev[athlete] || {};
      return {
        ...prev,
        [athlete]: { ...set, [testId]: true },
      };
    });
  }

  function l1AllDone(progress, athlete) {
    const set = progress[athlete] || {};
    return L1_TEST_IDS.every((id) => !!set[id]);
  }

  function l1Missing(progress, athlete) {
    const set = progress[athlete] || {};
    return L1_TEST_IDS.filter((id) => !set[id]);
  }

  /* ---------------- VIDEO PIPELINE ---------------- */

  function onVideo(file, finalMetric) {
    if (view.name !== "upload") return;

    setView({
      name: "processing",
      athlete: view.athlete,
      testId: view.testId,
      fileName: file.name,
    });

    setTimeout(() => {
      const result = {
        id: Date.now().toString(),
        athlete: view.athlete,
        testId: view.testId,
        createdAt: Date.now(),
        fileName: file.name,
        metrics: {
          value: finalMetric?.value ?? 0,
          unit: finalMetric?.unit ?? "reps",
        },
        stageBreakdown: [
          { stage: "L1 App Score", score: 75 },
          { stage: "L2 Manual", score: 82 },
          { stage: "Consistency", score: 88 },
        ],
        flags: [],
      };

      // ✅ save history
      setHistory((prev) => [...prev, result]);

      // ✅ mark L1 completion
      markL1Completed(view.athlete, view.testId);

      // ✅ go to result dashboard
      setView({
        name: "result",
        athlete: view.athlete,
        summary: result,
      });
    }, 1700);
  }

  /* ---------------- VIEW SWITCH ---------------- */

  switch (view.name) {
    case "landing":
      return <Landing setView={setView} />;

    case "candidateLogin":
      return (
        <CandidateLogin
          name={name}
          setName={setName}
          setView={setView}
        />
      );

    case "candidateDetails":
      return (
        <CandidateDetails
          athleteName={view.athleteName}
          onBack={() => setView({ name: "candidateLogin" })}
          onSave={(p) => {
            setProfile(p);
            setView({ name: "candidateHub", profile: p });
          }}
        />
      );

    case "candidateHub":
      return <CandidateHub profile={view.profile} setView={setView} />;

    case "home":
      return (
        <Home
          athlete={view.athlete}
          profile={profile}
          l1Progress={l1Progress}
          setView={setView}
        />
      );

    case "test":
      return (
        <Test
          view={view}
          profile={profile}
          setView={setView}
        />
      );

    case "upload":
      return (
        <Upload
          view={view}
          profile={profile}
          setView={setView}
          onVideo={onVideo}
        />
      );

    case "processing":
      return (
        <Processing
          testId={view.testId}
          fileName={view.fileName}
        />
      );

    case "result":
      return (
        <Result
          summary={view.summary}
          profile={profile}
          setView={setView}
          l1Progress={l1Progress}
          l1AllDone={l1AllDone}
          l1Missing={l1Missing}
        />
      );

    case "history":
      return (
        <History
          athlete={view.athlete}
          history={history}
          setView={setView}
        />
      );

    default:
      return (
        <div style={{ padding: 20 }}>
          <h2>Unknown view</h2>
          <pre>{JSON.stringify(view, null, 2)}</pre>
        </div>
      );
  }
}
