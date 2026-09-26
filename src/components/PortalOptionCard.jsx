import { Link } from 'react-router-dom'

export default function PortalOptionCard({ to, icon: Icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-4 hover:shadow-md hover:border-brand-light/30 transition"
    >
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-brand-light">
        <Icon className="w-5 h-5" strokeWidth={2} />
      </span>
      <span className="font-medium text-slate-700">{label}</span>
    </Link>
  )
}
