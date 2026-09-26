import { useState } from 'react'
import { GraduationCap, Users } from 'lucide-react'
import PageShell from '../../components/PageShell.jsx'
import StatCard from '../../components/StatCard.jsx'
import StudentsTable from '../../components/StudentsTable.jsx'
import TeachersTable from '../../components/TeachersTable.jsx'
import { STUDENTS } from '../../data/students.js'
import { TEACHERS } from '../../data/teachers.js'

const TABS = [
  { key: 'students', label: 'Students', icon: GraduationCap, Component: StudentsTable },
  { key: 'teachers', label: 'Teachers', icon: Users, Component: TeachersTable },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('students')
  const Active = TABS.find((t) => t.key === activeTab)?.Component ?? StudentsTable

  return (
    <PageShell crumbs={[{ label: 'Dashboard' }]}>
      <h1 className="text-2xl font-bold text-slate-800 mb-5">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-5 mb-5 max-w-md">
        <StatCard
          icon={GraduationCap}
          iconBg="bg-blue-50"
          iconColor="text-brand-light"
          value={STUDENTS.length}
          label="Total Students"
        />
        <StatCard
          icon={Users}
          iconBg="bg-violet-50"
          iconColor="text-violet-500"
          value={TEACHERS.length}
          label="Total Teachers"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 mb-5">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px transition ${
              activeTab === key
                ? 'border-brand-light text-brand-light font-medium'
                : 'border-transparent text-slate-500 hover:text-slate-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <Active />
    </PageShell>
  )
}
