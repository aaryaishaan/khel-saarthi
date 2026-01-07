import { useState } from "react";
import AppHeader from "../../components/layout/AppHeader";
import { AGE_MIN, AGE_MAX } from "../../constants/limits";

export default function CandidateDetails({ athleteName, onBack, onSave }) {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);

  const ageNum = Number(age);
  const ageInvalid =
    age === "" || Number.isNaN(ageNum) || ageNum < AGE_MIN || ageNum > AGE_MAX;

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader title="Candidate Details" onBack={onBack} />

      <main className="mx-auto max-w-md px-4 py-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            value={athleteName}
            disabled
            className="w-full rounded-2xl border border-gray-300 px-4 py-3 bg-gray-50"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-4 py-3"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Age</label>
          <input
            type="number"
            min={AGE_MIN}
            max={AGE_MAX}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`w-full rounded-2xl border px-4 py-3 ${
              ageInvalid ? "border-red-500" : "border-gray-300"
            }`}
          />
          {ageInvalid && (
            <div className="mt-1 text-xs text-red-600">
              Age must be between {AGE_MIN} and {AGE_MAX}.
            </div>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Profile Photo (optional)
          </label>
          <label className="block cursor-pointer">
            <div className="w-full rounded-2xl border border-dashed border-gray-300 p-4 text-center">
              Upload image
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = () => setPhotoUrl(reader.result);
                reader.readAsDataURL(f);
              }}
            />
          </label>

          {photoUrl && (
            <div className="mt-2 w-16 h-16 rounded-full overflow-hidden">
              <img
                src={photoUrl}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>
          )}
        </div>

        <button
          disabled={ageInvalid}
          onClick={() =>
            onSave({
              name: athleteName,
              gender,
              age: ageNum,
              photoUrl,
            })
          }
          className={`w-full py-3 rounded-2xl text-white ${
            ageInvalid
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-emerald-600"
          }`}
        >
          Save & Continue
        </button>
      </main>
    </div>
  );
}
