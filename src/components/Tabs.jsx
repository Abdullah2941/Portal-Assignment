const COLS = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' }

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className={`grid ${COLS[tabs.length] ?? 'grid-cols-2'} bg-slate-100 rounded-xl p-1 mb-5`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`py-2 rounded-lg text-sm font-semibold transition ${
            active === tab.value
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-400 hover:text-slate-500'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
