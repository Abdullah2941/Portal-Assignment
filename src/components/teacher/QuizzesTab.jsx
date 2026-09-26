import { Eye, Copy, ClipboardList } from 'lucide-react'
import StatusBadge from '../StatusBadge.jsx'
import ResponsiveTable from '../ResponsiveTable.jsx'

const QUIZZES = [
  {
    id: 1,
    title: 'Javascript (Quiz-4)',
    courses: 'Modern Web Application Development, Web and Mobile App Development',
    date: 'Jun 24, 2026',
    expiry: 'Jun 24, 2026',
  },
  {
    id: 2,
    title: 'Javascript (Quiz-3)',
    courses: 'Modern Web Application Development, Web and Mobile App Development',
    date: 'Jun 3, 2026',
    expiry: 'Jun 3, 2026',
  },
  {
    id: 3,
    title: 'Javascript (Quiz-2)',
    courses: 'Modern Web Application Development, Web and Mobile App Development',
    date: 'May 18, 2026',
    expiry: 'May 18, 2026',
  },
  {
    id: 4,
    title: 'Javascript (Quiz-1)',
    courses:
      'Modern Web Application Development, Web and Mobile App Development, JavaScript Crash Course, Full Stack Foundations for Teens',
    date: 'Apr 17, 2026',
    expiry: 'Apr 17, 2026',
  },
  {
    id: 5,
    title: 'CSS Quiz',
    courses:
      'Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development',
    date: 'Mar 27, 2026',
    expiry: 'Mar 27, 2026',
  },
  {
    id: 6,
    title: 'HTML Quiz',
    courses:
      'Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development, Mobile App Development (React Native)',
    date: 'Jan 7, 2026',
    expiry: 'Jan 7, 2026',
  },
  {
    id: 7,
    title: 'HTML Quiz',
    courses:
      'Modern Web Application Development, Web & Mobile Application Development (Female), Web and Mobile App Development, Techno Kids Course, Front End Development, Backend Development, Mobile App Development (React Native)',
    date: 'Jan 5, 2026',
    expiry: 'Jan 5, 2026',
  },
]

const columns = [
  {
    key: 'title',
    label: 'Quiz',
    render: (q) => <span className="text-slate-700 font-medium">{q.title}</span>,
  },
  {
    key: 'courses',
    label: 'Course(s)',
    render: (q) => (
      <span className="text-slate-500 block max-w-[320px] xl:max-w-[320px] text-right xl:text-left ml-auto xl:ml-0">
        {q.courses}
      </span>
    ),
  },
  { key: 'date', label: 'Date', render: (q) => <span className="text-slate-500">{q.date}</span> },
  {
    key: 'expiry',
    label: 'Expiry',
    render: (q) => <span className="text-slate-500">{q.expiry}</span>,
  },
  { key: 'status', label: 'Status', render: () => <StatusBadge status="ACTIVE" /> },
  {
    key: 'action',
    label: 'Action',
    render: () => (
      <div className="flex items-center gap-3 justify-end xl:justify-start">
        <button className="text-slate-400 hover:text-slate-600" aria-label="View">
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-slate-600" aria-label="Duplicate">
          <Copy className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-slate-600" aria-label="Results">
          <ClipboardList className="w-4 h-4" />
        </button>
      </div>
    ),
  },
]

export default function QuizzesTab() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <ResponsiveTable columns={columns} rows={QUIZZES} keyField="id" />
    </div>
  )
}
