import { useMemo, useState } from 'react'
import { Users, CheckCircle2, XCircle, Clock } from 'lucide-react'
import StatCard from '../StatCard.jsx'
import Pagination from '../Pagination.jsx'
import ResponsiveTable from '../ResponsiveTable.jsx'
import { STUDENTS } from '../../data/students.js'

const PAGE_SIZE = 10
const ROSTER = STUDENTS.slice(0, 57)
const STATUS_OPTIONS = ['NOT MARKED', 'PRESENT', 'ABSENT', 'LEAVE']

const SELECT_STYLES = {
  'NOT MARKED': 'bg-slate-100 text-slate-500',
  PRESENT: 'bg-emerald-50 text-emerald-600',
  ABSENT: 'bg-rose-50 text-rose-500',
  LEAVE: 'bg-amber-50 text-amber-600',
}

export default function AttendanceTab() {
  const [date, setDate] = useState('2026-09-15')
  const [marks, setMarks] = useState({})
  const [page, setPage] = useState(1)

  const stats = useMemo(() => {
    let present = 0
    let absent = 0
    let leave = 0
    ROSTER.forEach((s) => {
      const m = marks[s.id]
      if (m === 'PRESENT') present += 1
      else if (m === 'ABSENT') absent += 1
      else if (m === 'LEAVE') leave += 1
    })
    return { total: ROSTER.length, present, absent, leave }
  }, [marks])

  const totalPages = Math.max(1, Math.ceil(ROSTER.length / PAGE_SIZE))
  const rows = ROSTER.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const setMark = (id, value) => setMarks((m) => ({ ...m, [id]: value }))

  const changeDate = (value) => {
    setDate(value)
    setMarks({})
    setPage(1)
  }

  const columns = [
    { key: 'roll', label: 'Roll #' },
    { key: 'name', label: 'Full Name' },
    {
      key: 'status',
      label: 'Status',
      render: (s) => {
        const value = marks[s.id] ?? 'NOT MARKED'
        return (
          <select
            value={value}
            onChange={(e) => setMark(s.id, e.target.value)}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 outline-none ${SELECT_STYLES[value]}`}
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )
      },
    },
  ]

  return (
    <>
      <div className="flex justify-end mb-5">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span className="font-medium whitespace-nowrap">Select a Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => changeDate(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-brand-light"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-5">
        <StatCard
          icon={Users}
          iconBg="bg-slate-100"
          iconColor="text-slate-500"
          value={stats.total}
          label="Total Students"
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
          value={stats.present}
          label="Present"
        />
        <StatCard
          icon={XCircle}
          iconBg="bg-rose-50"
          iconColor="text-rose-500"
          value={stats.absent}
          label="Absent"
        />
        <StatCard
          icon={Clock}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
          value={stats.leave}
          label="Leave"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ResponsiveTable columns={columns} rows={rows} keyField="id" />
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
          label={`Showing ${(page - 1) * PAGE_SIZE + 1}-${Math.min(
            page * PAGE_SIZE,
            ROSTER.length
          )} of ${ROSTER.length} students`}
        />
      </div>
    </>
  )
}
