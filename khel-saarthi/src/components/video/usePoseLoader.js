import { POSE_MODE, TASKS_VISION_URL } from "../../constants/config";

export async function loadPoseModel(poseRef) {
  if (POSE_MODE === "off" || poseRef.current) return;

  let FilesetResolver, PoseLandmarker, baseUrl, modelAssetPath;

  if (POSE_MODE === "local") {
    const mod = await import("@mediapipe/tasks-vision");
    ({ FilesetResolver, PoseLandmarker } = mod);
    baseUrl = "/wasm";
    modelAssetPath = "/models/pose_landmarker_full.task";
  } else {
    const mod = await import(/* @vite-ignore */ TASKS_VISION_URL);
    ({ FilesetResolver, PoseLandmarker } = mod);
    baseUrl = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm";
    modelAssetPath =
      "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task";
  }

  const fileset = await FilesetResolver.forVisionTasks(baseUrl);
  poseRef.current = await PoseLandmarker.createFromOptions(fileset, {
    baseOptions: { modelAssetPath },
    runningMode: "VIDEO",
    numPoses: 1,
  });
}
