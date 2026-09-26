export default function StatCard({ icon: Icon, iconBg, iconColor, value, label }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex items-center justify-between">
      <div>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        <div className="text-sm text-slate-400">{label}</div>
      </div>
      <span
        className={`flex items-center justify-center w-10 h-10 rounded-full ${iconBg} ${iconColor}`}
      >
        <Icon className="w-5 h-5" />
      </span>
    </div>
  )
}
