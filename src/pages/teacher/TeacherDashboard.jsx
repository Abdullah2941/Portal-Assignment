import { useState } from 'react'
import { Users, CalendarCheck, FileText, ClipboardCheck, BarChart3 } from 'lucide-react'
import PageShell from '../../components/PageShell.jsx'
import StudentsTable from '../../components/StudentsTable.jsx'
import AttendanceTab from '../../components/teacher/AttendanceTab.jsx'
import AssignmentsTab from '../../components/teacher/AssignmentsTab.jsx'
import QuizzesTab from '../../components/teacher/QuizzesTab.jsx'
import CourseProgressTab from '../../components/teacher/CourseProgressTab.jsx'

const COURSE_NAME = 'Modern Web Application Development'

const TABS = [
  { key: 'students', label: 'Students', icon: Users, Component: StudentsTable },
  { key: 'attendance', label: 'Attendance', icon: CalendarCheck, Component: AttendanceTab },
  { key: 'assignments', label: 'Assignments', icon: FileText, Component: AssignmentsTab },
  { key: 'quizzes', label: 'Quizzes', icon: ClipboardCheck, Component: QuizzesTab },
  { key: 'progress', label: 'Course Progress', icon: BarChart3, Component: CourseProgressTab },
]

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('students')
  const Active = TABS.find((t) => t.key === activeTab)?.Component ?? StudentsTable

  return (
    <PageShell crumbs={[{ label: 'Dashboard', to: '/dashboard/teacher' }, { label: COURSE_NAME }]}>
      <h1 className="text-2xl font-bold text-slate-800 mb-5">{COURSE_NAME}</h1>

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
