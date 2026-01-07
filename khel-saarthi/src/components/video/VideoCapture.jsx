import { useEffect, useRef, useState } from "react";

export default function VideoCapture({ onVideoReady }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const stoppedRef = useRef(false); // 🔴 IMPORTANT

  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  /* ---------------- TIMER ---------------- */

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  /* ---------------- CAMERA ---------------- */

  async function enableCamera() {
    const s = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true,
    });

    setStream(s);
    videoRef.current.srcObject = s;
    await videoRef.current.play();
  }

  /* ---------------- RECORDING ---------------- */

  function startRecording() {
    if (!stream) return;

    chunksRef.current = [];
    stoppedRef.current = false;
    setSeconds(0);

    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      // 🔴 guard against double execution
      if (stoppedRef.current) return;
      stoppedRef.current = true;

      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const file = new File(
        [blob],
        `recording_${Date.now()}.webm`,
        { type: "video/webm" }
      );

      // stop camera AFTER file is ready
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      onVideoReady(file, null);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
  }

  function stopRecording() {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  }

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => {
      // ❌ DO NOT stop recorder here
      // it is already handled safely above

      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-4">
      <div className="relative mx-auto w-full max-w-[360px] aspect-[9/16] rounded-2xl bg-black overflow-hidden border-2 border-emerald-500">
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center px-6">
            Camera preview will appear here.
            <br />
            Please allow camera & microphone access.
          </div>
        )}

        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Portrait 9:16
        </div>

        {recording && (
          <div className="absolute top-2 right-2 flex items-center gap-2 text-white text-sm">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {!stream ? (
          <button
            onClick={enableCamera}
            className="col-span-2 py-3 rounded-2xl border"
          >
            Enable Camera
          </button>
        ) : recording ? (
          <button
            onClick={stopRecording}
            className="col-span-2 py-3 rounded-2xl bg-red-600 text-white"
          >
            Stop & Save
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="col-span-2 py-3 rounded-2xl bg-emerald-600 text-white"
          >
            Record
          </button>
        )}
      </div>
    </div>
  );
}
