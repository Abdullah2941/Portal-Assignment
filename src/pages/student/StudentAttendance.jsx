import { useState } from 'react'
import { Calendar, CheckCircle2, XCircle, ChevronDown } from 'lucide-react'
import PageShell from '../../components/PageShell.jsx'
import StatCard from '../../components/StatCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import ResponsiveTable from '../../components/ResponsiveTable.jsx'

const MONTHS = ['Sep 2026']

const RECORDS = [
  { class: 1, date: 'Wed, Sep 2, 2026', status: 'PRESENT' },
  { class: 2, date: 'Fri, Sep 4, 2026', status: 'PRESENT' },
  { class: 3, date: 'Mon, Sep 7, 2026', status: 'PRESENT' },
  { class: 4, date: 'Wed, Sep 9, 2026', status: 'PRESENT' },
  { class: 5, date: 'Fri, Sep 11, 2026', status: 'PRESENT' },
]

const STATS = { total: 110, present: 99, leave: 0, absent: 11 }

const COLUMNS = [
  {
    key: 'class',
    label: 'Class',
    render: (r) => <span className="text-brand-light font-medium">{r.class}</span>,
  },
  { key: 'date', label: 'Date', render: (r) => <span className="text-slate-600">{r.date}</span> },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

export default function StudentAttendance() {
  const [month, setMonth] = useState(MONTHS[0])
  const percent = Math.round((STATS.present / STATS.total) * 100)

  return (
    <PageShell
      crumbs={[
        { label: 'Home', to: '/dashboard/student' },
        { label: 'Modern Web Application Development', to: '/dashboard/student' },
        { label: 'Attendance' },
      ]}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-5">
        <StatCard
          icon={Calendar}
          iconBg="bg-slate-100"
          iconColor="text-slate-500"
          value={STATS.total}
          label="Total Classes"
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
          value={STATS.present}
          label="Present"
        />
        <StatCard
          icon={XCircle}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
          value={STATS.leave}
          label="Leave"
        />
        <StatCard
          icon={XCircle}
          iconBg="bg-rose-50"
          iconColor="text-rose-500"
          value={STATS.absent}
          label="Absent"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mb-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-slate-800">Attendance Overview</h2>
          <span className="text-lg font-bold text-emerald-500">{percent}%</span>
        </div>
        <p className="text-sm text-slate-400 mb-3">
          {percent >= 75
            ? 'Your attendance is good. Keep it up!'
            : 'Your attendance needs improvement.'}
        </p>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="flex justify-end mb-3">
        <div className="relative">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-1.5 text-sm text-slate-600"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ResponsiveTable columns={COLUMNS} rows={RECORDS} keyField="class" />
      </div>
    </PageShell>
  )
}
