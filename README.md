# KHEL SAARTHI — Democratizing Sports Talent Assessment

>   **A lightweight, mobile-first prototype to standardize athlete testing across India**  
> On-device AI + fair, multi-stage scoring → equal opportunity for both **rural** and **metro** athletes.

---

## 🚩 Problem

India has talent everywhere—but access to **standardized, trustworthy** assessments is uneven.  
- Long travel & patchy internet  
-  Inconsistent judging , corruption and biasness
-  Heavy, video-first systems that punish low-end phones  

**Result:** talent gets missed.

---

## ✅ Our Approach

**KHEL SAARTHI** keeps things simple, cheap, and fair:

- 📲 **On-device AI (MediaPipe Pose)** for Level-1 generic fitness tests (jump jacks, push-ups, plank).  
  No server inference, no heavy uploads; we send **keypoints/metrics, not raw video**.
- 🔁 **Three-stage pipeline** with clear cut-offs and checks:
  - **L1 — BAS (Baseline App Score)**: app scores from AI keypoints; **percentile-based** within age/gender/region.  
  - **L2 — SSVS(Sport-Specific Video Score)**: short clips; **single calibrated reviewer** with a numeric rubric.  
  - **L3 — MS (Match Score)**: regional matches; **official numbers only**.
- 📈 **Consistency Graph** (prototype): compares L1 vs later-stage scores; flags spikes/inversions.
- 🛡️ **Integrity**: one appeal per stage, random audits (5–10%), automatic anomaly flags.
- 🌐 **Offline-first**: record-only camera, store-and-forward; works on low bandwidth.

> 🧮 **Final Score (FSS)**  
> `FSS = 0.30*BAS + 0.40*SSVS + 0.25*LMS + 0.05*Consistency`

---

##  Key Features (prototype)

- ⚛️ Mobile-first React UI (Vite + Tailwind)  
- 🧍‍♂️ **MediaPipe Pose Landmarker** for basic fitness tests (on-device)  
- 🎥 Record-only camera UX (no local judging)  
- 🧾 Candidate scorecard + stage progression mock  
- 📊 Percentile & cut-off visuals (placeholder data)  
- 🇮🇳 Hindi labels (WIP) and PWA packaging (WIP)

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite, Tailwind CSS  
- **AI (on device):** MediaPipe Pose Landmarker (TFLite/wasm behind the scenes)  
- **State/Storage:** Local state + localStorage (prototype)  
- **Build/Tooling:** ESLint, PostCSS

> 💡 **Why MediaPipe?**  
> - Runs **fully on device** → privacy + low cost  
> - Works on **low-end hardware**  
> - Returns structured **keypoints**, perfect for bandwidth-light uploads

---

## 🚀 Quick Start

```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview the production build
npm run preview

FOLDER STRUCTURE 
khel-saarthi/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  └─ App.css
├─ .gitignore
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
