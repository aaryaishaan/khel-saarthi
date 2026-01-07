import AppHeader from "../../components/layout/AppHeader";

export default function History({ athlete, history, setView }) {
  const list = history.filter(h => h.athlete === athlete).reverse();

  return (
    <div className="min-h-dvh bg-white">
      <AppHeader title="History" onBack={() => setView({ name: "home", athlete })} />

      <main className="mx-auto max-w-md px-4 py-5 space-y-4">
        {list.map(r => (
          <div key={r.id} className="border p-4 rounded-2xl">
            <div className="font-semibold">{r.testTitle}</div>
            <div className="text-sm">{r.metrics.value} {r.metrics.unit}</div>
          </div>
        ))}
      </main>
    </div>
  );
}
