import { useState } from 'react'
import { Clock, GraduationCap, Hash, User, Building2, MapPin, Copy } from 'lucide-react'
import PageShell from '../../components/PageShell.jsx'
import StatCard from '../../components/StatCard.jsx'
import Tabs from '../../components/Tabs.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import ResponsiveTable from '../../components/ResponsiveTable.jsx'

const COURSE = {
  name: 'Modern Web Application Development',
  schedule: ['Mon 01:00 PM - 03:00 PM', 'Wed 01:00 PM - 03:00 PM', 'Fri 01:00 PM - 03:00 PM'],
  progress: 73,
  batch: 20,
  roll: '771296',
  campus: 'Zaitoon Ashraf IT Park',
  city: 'Karachi',
}

const WEEK = [
  { day: 'Sun', date: 13, active: false },
  { day: 'Mon', date: 14, active: true },
  { day: 'Tue', date: 15, active: false },
  { day: 'Wed', date: 16, active: true },
  { day: 'Thu', date: 17, active: false },
  { day: 'Fri', date: 18, active: true },
  { day: 'Sat', date: 19, active: false },
]

const FEE_ROWS = [
  {
    id: '202609771296',
    month: 'Sep 2026',
    amount: 'Rs: 1000 /-',
    type: 'Monthly',
    due: '08-Sep-2026',
    voucher: '202609771296',
    status: 'PAID',
  },
]

const FEE_COLUMNS = [
  { key: 'month', label: 'Month' },
  { key: 'amount', label: 'Amount' },
  { key: 'type', label: 'Type', render: (r) => <span className="text-slate-500">{r.type}</span> },
  {
    key: 'due',
    label: 'Due date',
    render: (r) => <span className="text-slate-500">{r.due}</span>,
  },
  {
    key: 'voucher',
    label: 'Voucher ID',
    render: (r) => (
      <span className="inline-flex items-center gap-1.5 text-slate-500">
        {r.voucher}
        <Copy className="w-3.5 h-3.5 text-slate-300 cursor-pointer hover:text-slate-500 shrink-0" />
      </span>
    ),
  },
  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
]

export default function StudentDashboard() {
  const [tab, setTab] = useState('quizzes')

  return (
    <PageShell crumbs={[{ label: 'Home', to: '/dashboard/student' }, { label: COURSE.name }]}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <StatCard
              icon={Clock}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-500"
              value="99/110"
              label="Attendance"
            />
            <StatCard
              icon={GraduationCap}
              iconBg="bg-violet-50"
              iconColor="text-violet-500"
              value="8/13"
              label="Assignment"
            />
          </div>

          <div className="bg-blue-50/50 rounded-2xl border border-blue-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-800">{COURSE.name}</h2>
              <span className="text-xs font-semibold text-brand-light bg-white border border-blue-100 px-2.5 py-1 rounded-full">
                ENROLLED
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {COURSE.schedule.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-white border border-slate-200 rounded-full px-3 py-1 text-slate-500"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>Progress</span>
              <span>{COURSE.progress}% Completed</span>
            </div>
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden mb-4">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${COURSE.progress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-slate-400" /> Batch: {COURSE.batch}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" /> Roll: {COURSE.roll}
              </span>
              <span className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400" /> Campus: {COURSE.campus}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> City: {COURSE.city}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <h2 className="font-semibold text-slate-800 px-5 pt-5 mb-1">Fee</h2>
            <ResponsiveTable columns={FEE_COLUMNS} rows={FEE_ROWS} keyField="id" />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <h2 className="font-semibold text-slate-800 mb-4">Class Schedule</h2>
            <div className="grid grid-cols-7 gap-1.5">
              {WEEK.map(({ day, date, active }) => (
                <div
                  key={day + date}
                  className={`flex flex-col items-center gap-1 rounded-lg py-2 text-[11px] ${
                    active ? 'bg-emerald-500 text-white font-semibold' : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  <span>{day}</span>
                  <span>{date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <Tabs
              tabs={[
                { value: 'assignments', label: 'Assignments' },
                { value: 'quizzes', label: 'Quizzes' },
                { value: 'events', label: 'Events' },
              ]}
              active={tab}
              onChange={setTab}
            />
            <p className="text-sm text-slate-400 text-center py-4">
              {tab === 'assignments' && 'No upcoming assignments'}
              {tab === 'quizzes' && 'No upcoming quizzes'}
              {tab === 'events' && 'No upcoming events'}
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
