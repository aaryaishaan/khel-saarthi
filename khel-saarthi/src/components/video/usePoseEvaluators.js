import { angleDeg, dist } from "../../utils/math";

export function createPoseEvaluators(emitLiveMetric) {
  const evalRef = {
    phase: "top", lastToggle: 0, reps: 0,
    sPhase: "top", sLast: 0, sReps: 0,
    jState: "closed", jLast: 0, jReps: 0, baseShoulderWidth: null,
    pStart: null, pMax: 0, pGood: false, pGate: null,
  };

  function evalPushups(lm) {
    const R = (i) => lm?.[i] ? { x: lm[i].x, y: lm[i].y } : null;
    const shoulder = R(12), elbow = R(14), wrist = R(16);
    const hip = R(24), ankle = R(28);
    const elbowAng = angleDeg(shoulder, elbow, wrist);
    const hipLine = angleDeg(shoulder, hip, ankle);
    const goodPlank = hipLine > 165 && hipLine < 195;

    const t = performance.now();
    if (evalRef.phase === "top" && elbowAng < 80 && goodPlank && t - evalRef.lastToggle > 250) {
      evalRef.phase = "bottom";
      evalRef.lastToggle = t;
    } else if (evalRef.phase === "bottom" && elbowAng > 155 && t - evalRef.lastToggle > 250) {
      evalRef.phase = "top";
      evalRef.lastToggle = t;
      evalRef.reps++;
    }

    emitLiveMetric({ testId: "pushups", value: evalRef.reps, unit: "reps" });
  }

  function evalSquats(lm) {
    const R = (i) => lm?.[i] ? { x: lm[i].x, y: lm[i].y } : null;
    const hip = R(24), knee = R(26), ankle = R(28);
    const kneeAng = angleDeg(hip, knee, ankle);

    const t = performance.now();
    if (evalRef.sPhase === "top" && kneeAng < 85 && t - evalRef.sLast > 300) {
      evalRef.sPhase = "bottom";
      evalRef.sLast = t;
    } else if (evalRef.sPhase === "bottom" && kneeAng > 165 && t - evalRef.sLast > 300) {
      evalRef.sPhase = "top";
      evalRef.sLast = t;
      evalRef.sReps++;
    }

    emitLiveMetric({ testId: "squats", value: evalRef.sReps, unit: "reps" });
  }

  function evalJumpingJacks(lm) {
    const R = (i) => lm?.[i] ? { x: lm[i].x, y: lm[i].y } : null;
    const Lw = R(15), Rw = R(16);
    const La = R(27), Ra = R(28);
    const Ls = R(11), Rs = R(12);
    const head = R(0) || R(7) || R(8);

    const sh = (Ls && Rs) ? dist(Ls, Rs) : 0;
    if (sh) {
      evalRef.baseShoulderWidth =
        evalRef.baseShoulderWidth
          ? 0.9 * evalRef.baseShoulderWidth + 0.1 * sh
          : sh;
    }

    const base = evalRef.baseShoulderWidth || sh;
    const feetApart = base && dist(La, Ra) >= 1.25 * base;
    const handsUp = head && Lw?.y < head.y && Rw?.y < head.y;

    const t = performance.now();
    if (evalRef.jState === "closed" && feetApart && handsUp && t - evalRef.jLast > 220) {
      evalRef.jState = "open";
      evalRef.jLast = t;
    } else if (evalRef.jState === "open" && !feetApart && !handsUp && t - evalRef.jLast > 220) {
      evalRef.jState = "closed";
      evalRef.jLast = t;
      evalRef.jReps++;
    }

    emitLiveMetric({ testId: "jumpingjacks", value: evalRef.jReps, unit: "reps" });
  }

  function evalPlank(lm) {
    const G = (i) => lm?.[i] ? { x: lm[i].x, y: lm[i].y } : null;
    const Sh = G(12) || G(11);
    const Hp = G(24) || G(23);
    const An = G(28) || G(27);

    const lineDeg = angleDeg(Sh, Hp, An);
    const midYA = (Sh?.y + An?.y) / 2;
    const hipCentered = Hp && Math.abs(Hp.y - midYA) <= 0.045;
    const good = lineDeg >= 168 && lineDeg <= 192 && hipCentered;

    const now = performance.now();
    if (good) {
      if (!evalRef.pGood) {
        evalRef.pGood = true;
        evalRef.pGate = now;
        evalRef.pStart = null;
      }
      if (!evalRef.pStart && now - evalRef.pGate >= 400) {
        evalRef.pStart = now;
      }
      if (evalRef.pStart) {
        evalRef.pMax = Math.max(evalRef.pMax, (now - evalRef.pStart) / 1000);
      }
    } else {
      evalRef.pGood = false;
      evalRef.pGate = null;
      evalRef.pStart = null;
    }

    emitLiveMetric({ testId: "plank", value: Math.floor(evalRef.pMax), unit: "s" });
  }

  function detect(testId, lm) {
    if (!lm) return;
    switch (testId) {
      case "pushups": return evalPushups(lm);
      case "squats": return evalSquats(lm);
      case "jumpingjacks": return evalJumpingJacks(lm);
      case "plank": return evalPlank(lm);
      default: return;
    }
  }

  return { evalRef, detect };
}
