export function angleDeg(A, B, C) {
  if (!A || !B || !C) return 180;
  const ab = { x: A.x - B.x, y: A.y - B.y };
  const cb = { x: C.x - B.x, y: C.y - B.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const mag1 = Math.hypot(ab.x, ab.y);
  const mag2 = Math.hypot(cb.x, cb.y);
  if (!mag1 || !mag2) return 180;
  const cos = Math.min(1, Math.max(-1, dot / (mag1 * mag2)));
  return (Math.acos(cos) * 180) / Math.PI;
}

export function dist(A, B) {
  if (!A || !B) return 0;
  return Math.hypot(A.x - B.x, A.y - B.y);
}
