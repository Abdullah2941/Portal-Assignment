import { AlertTriangle } from 'lucide-react'
import PageShell from '../../components/PageShell.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import ResponsiveTable from '../../components/ResponsiveTable.jsx'

const QUIZZES = [
  {
    id: 1,
    title: 'Javascript (Quiz-4)',
    module: 'Modern Front-End Development',
    questions: 40,
    attempts: '2/3',
    percentage: 53,
    status: 'FAILED',
  },
  {
    id: 2,
    title: 'Javascript (Quiz-3)',
    module: 'Modern Front-End Development',
    questions: 40,
    attempts: '1/3',
    percentage: 55,
    status: 'FAILED',
  },
  {
    id: 3,
    title: 'Javascript (Quiz-2)',
    module: 'Modern Front-End Development',
    questions: 40,
    attempts: '1/3',
    percentage: 53,
    status: 'FAILED',
  },
  {
    id: 4,
    title: 'Javascript (Quiz-1)',
    module: 'Modern Front-End Development',
    questions: 40,
    attempts: '1/3',
    percentage: 83,
    status: 'PASSED',
  },
  {
    id: 5,
    title: 'CSS Quiz',
    module: 'Front-End Development',
    questions: 40,
    attempts: '2/3',
    percentage: 57,
    status: 'FAILED',
  },
  {
    id: 6,
    title: 'HTML Quiz',
    module: 'Web Designing',
    questions: 40,
    attempts: '1/3',
    percentage: 88,
    status: 'PASSED',
  },
]

const COLUMNS = [
  { key: 'title', label: 'Title', render: (q) => <span className="text-slate-700 font-medium">{q.title}</span> },
  { key: 'module', label: 'Module', render: (q) => <span className="text-slate-500">{q.module}</span> },
  {
    key: 'questions',
    label: 'Questions',
    render: (q) => (
      <span className="inline-block bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-md">
        {q.questions}
      </span>
    ),
  },
  {
    key: 'attempts',
    label: 'Attempts',
    render: (q) => (
      <span
        className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md ${
          Number(q.attempts.split('/')[0]) >= 2 ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-600'
        }`}
      >
        {q.attempts}
      </span>
    ),
  },
  {
    key: 'percentage',
    label: 'Percentage',
    render: (q) => <span className="text-slate-600">{q.percentage}%</span>,
  },
  { key: 'status', label: 'Status', render: (q) => <StatusBadge status={q.status} /> },
  { key: 'note', label: 'Note', render: () => <span className="text-slate-300">–</span> },
  {
    key: 'action',
    label: 'Action',
    render: () => (
      <button className="bg-brand-light hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap">
        Completed
      </button>
    ),
  },
]

export default function StudentQuiz() {
  return (
    <PageShell
      crumbs={[
        { label: 'Home', to: '/dashboard/student' },
        { label: 'Modern Web Application Development', to: '/dashboard/student' },
        { label: 'Quiz' },
      ]}
    >
      <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-2 font-semibold text-slate-800 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Important Information
        </div>
        <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
          <li>Once started, quizzes must be completed in one session</li>
          <li>Switching tabs or leaving the window will be recorded</li>
          <li>Ensure you have a stable internet connection</li>
          <li>The quiz will open in fullscreen mode</li>
        </ul>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ResponsiveTable columns={COLUMNS} rows={QUIZZES} keyField="id" />
      </div>

      <p className="text-center text-sm text-slate-400 mt-4">
        Contact your instructor if you have any issues accessing your quizzes.
      </p>
    </PageShell>
  )
}
