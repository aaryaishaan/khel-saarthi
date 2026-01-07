src/
├── App.jsx                      # Main app with routing logic
├── config/
│   ├── constants.js            # POSE_MODE, AGE_MIN, AGE_MAX, URLs
│   └── catalog.js              # Tests catalog, test art, L1 test IDs
├── utils/
│   ├── helpers.js              # String/validation helpers
│   ├── geometry.js             # angleDeg, dist functions
│   ├── random.js               # Demo data generators
│   └── storage.js              # localStorage utilities
├── hooks/
│   ├── useCamera.js            # Camera stream management
│   ├── usePoseDetection.js    # MediaPipe pose loading & detection
│   └── useRecording.js         # MediaRecorder logic
├── evaluators/
│   ├── pushups.js              # Push-ups evaluation logic
│   ├── squats.js               # Squats evaluation logic
│   ├── jumpingJacks.js         # Jumping jacks evaluation logic
│   └── plank.js                # Plank evaluation logic
├── components/
│   ├── common/
│   │   ├── AppHeader.jsx       # Reusable header
│   │   └── Button.jsx          # Reusable button (optional)
│   ├── video/
│   │   ├── VideoCapture.jsx    # Main video capture component
│   │   ├── VideoOverlay.jsx    # ROI, hints, posture chips
│   │   └── VideoControls.jsx   # Camera/record buttons
│   ├── screens/
│   │   ├── LandingScreen.jsx
│   │   ├── CandidateLoginScreen.jsx
│   │   ├── CandidateDetailsScreen.jsx
│   │   ├── CandidateHubScreen.jsx
│   │   ├── HomeScreen.jsx
│   │   ├── TestScreen.jsx
│   │   ├── UploadScreen.jsx
│   │   ├── ProcessingScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   ├── SaiGateScreen.jsx
│   │   ├── Level2Screen.jsx
│   │   ├── SubmittedL2Screen.jsx
│   │   ├── HistoryScreen.jsx
│   │   └── ReviewSaiScreen.jsx
│   └── cards/
│       ├── ProgressCard.jsx
│       ├── SaiCard.jsx
│       └── InstructionCard.jsx
└── public/
    ├── drills/
    │   ├── push-up.png
    │   ├── plank-hold.png
    │   ├── squat-front.png
    │   └── jumping-jack.png
    ├── wasm/                    # MediaPipe WASM files (local mode)
    └── models/                  # pose_landmarker_full.task (local mode)
```


src/
│
├── app/
│   ├── App.jsx                 # Main router/state controller (lean)
│   ├── views/                  # Screen-level components
│   │   ├── Landing.jsx
│   │   ├── CandidateLogin.jsx
│   │   ├── CandidateDetails.jsx
│   │   ├── CandidateHub.jsx
│   │   ├── Home.jsx
│   │   ├── Test.jsx
│   │   ├── Upload.jsx
│   │   ├── Processing.jsx
│   │   ├── Result.jsx
│   │   ├── SaiGate.jsx
│   │   ├── Level2.jsx
│   │   ├── SubmittedL2.jsx
│   │   └── History.jsx
│
├── components/
│   ├── layout/
│   │   └── AppHeader.jsx
│   │
│   ├── video/
│   │   ├── VideoCapture.jsx
│   │   ├── usePoseLoader.js
│   │   ├── usePoseEvaluators.js
│   │   └── overlayUtils.js
│
├── constants/
│   ├── tests.js
│   ├── config.js
│   └── limits.js
│
├── utils/
│   ├── math.js
│   ├── random.js
│   ├── format.js
│   ├── storage.js
│   └── ids.js
│
├── styles/
│   └── globals.css
│
├── main.jsx
└── index.css
