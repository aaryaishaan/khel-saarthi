import { initials } from "../../utils/format";

export default function AppHeader({ title, onBack, profile, onProfile }) {
  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
        {onBack ? (
          <button onClick={onBack}>←</button>
        ) : <div className="w-6" />}
        <h1 className="flex-1 font-semibold">{title}</h1>
        {profile && (
          <button onClick={onProfile} className="w-8 h-8 rounded-full bg-gray-200">
            {profile.photoUrl
              ? <img src={profile.photoUrl} className="w-full h-full object-cover" />
              : <span>{initials(profile.name)}</span>}
          </button>
        )}
      </div>
    </div>
  );
}
