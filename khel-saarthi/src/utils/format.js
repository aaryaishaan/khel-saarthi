export const formatTime = (ts) => new Date(ts).toLocaleString();

export const initials = (name = "") =>
  name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join("") || "A";
