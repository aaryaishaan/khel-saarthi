export const DEFAULT_TESTS = [
  { id: "sprint100m", title: "100m Sprint", desc: "Run 100 meters as fast as possible.", metric: "seconds", icon: "🏃" },
  { id: "pushups", title: "Push-ups (60s)", desc: "Max correct push-ups in 60 seconds.", metric: "reps", icon: "💪" },
  { id: "squats", title: "Bodyweight Squats (60s)", desc: "Max full-depth squats in 60 seconds.", metric: "reps", icon: "🦵" },
  { id: "jumpingjacks", title: "Jumping Jacks (30s)", desc: "Max full-extension jumping jacks in 30 seconds.", metric: "reps", icon: "⭐" },
  { id: "plank", title: "Forearm Plank Hold", desc: "Hold a straight plank as long as possible.", metric: "seconds", icon: "📏" },
];

export const TEST_ART = {
  pushups: "/drills/push-up.png",
  plank: "/drills/plank-hold.png",
  squats: "/drills/squat-front.png",
  jumpingjacks: "/drills/jumping-jack.png",
};

/* 🔽 ADD THIS (was in your original App.jsx) */
function sanitizeTestsCatalog(input) {
  if (!Array.isArray(input)) return DEFAULT_TESTS.slice();
  const out = [];
  const seen = new Set();

  for (const row of input) {
    if (!row || typeof row !== "object") continue;
    const { id, title, desc, icon, metric } = row;
    if (!id || !title || !desc || !icon) continue;
    if (!["reps", "seconds"].includes(metric)) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(row);
  }

  return out.length ? out : DEFAULT_TESTS.slice();
}

/* 🔽 THIS IS WHAT Home.jsx EXPECTS */
export const TESTS_CATALOG_SAFE = sanitizeTestsCatalog(DEFAULT_TESTS);
