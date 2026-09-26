const STYLES = {
  present: 'bg-emerald-50 text-emerald-600',
  paid: 'bg-emerald-50 text-emerald-600',
  approved: 'bg-emerald-50 text-emerald-600',
  passed: 'bg-emerald-50 text-emerald-600',
  submitted: 'bg-blue-50 text-brand-light',
  enrolled: 'bg-blue-50 text-brand-light',
  active: 'bg-emerald-50 text-emerald-600',
  absent: 'bg-rose-50 text-rose-500',
  failed: 'bg-rose-50 text-rose-500',
  leave: 'bg-amber-50 text-amber-600',
  pending: 'bg-amber-50 text-amber-600',
  'late submitted': 'bg-amber-50 text-amber-600',
  'not submitted': 'bg-slate-100 text-slate-500',
}

export default function StatusBadge({ status }) {
  const key = status.toLowerCase()
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide ${
        STYLES[key] ?? 'bg-slate-100 text-slate-500'
      }`}
    >
      {status.toUpperCase()}
    </span>
  )
}
