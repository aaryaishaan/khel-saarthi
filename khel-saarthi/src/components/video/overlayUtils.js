import { angleDeg } from "../../utils/math";

export function computeOverlay({ lm, portrait, testId }) {
  if (!lm?.length) return null;

  let minX = 1, minY = 1, maxX = 0, maxY = 0;
  lm.forEach(p => {
    if (!p) return;
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  });

  const roi = portrait
    ? { L: 0.1, R: 0.9, T: 0.06, B: 0.94 }
    : { L: 0.12, R: 0.88, T: 0.08, B: 0.92 };

  let frame = "bad";
  if (minX >= roi.L && maxX <= roi.R && minY >= roi.T && maxY <= roi.B) {
    frame = "good";
  }

  let posture = "";
  if (testId === "squats") {
    const HIP = lm[24] || lm[23];
    const KNEE = lm[26] || lm[25];
    const ANK = lm[28] || lm[27];
    if (HIP && KNEE && ANK) {
      const kneeAng = angleDeg(HIP, KNEE, ANK);
      posture = kneeAng > 130 ? "Go lower" : kneeAng < 95 ? "Rise up" : "Good";
    }
  }

  return { frame, posture };
}
