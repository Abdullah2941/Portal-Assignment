import { ClipboardList, CheckCircle2, Clock, Eye, Upload, Pencil } from 'lucide-react'
import PageShell from '../../components/PageShell.jsx'
import StatCard from '../../components/StatCard.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import ResponsiveTable from '../../components/ResponsiveTable.jsx'

const STATS = { assigned: 16, submitted: 14, pending: 2 }

const ASSIGNMENTS = [
  {
    id: 1,
    name: 'Admin panel (E commerce Dashboard)',
    topics: 7,
    due: 'September 10, 2026',
    status: 'APPROVED',
  },
  {
    id: 2,
    name: 'QUICKSERVE WMA (Batch-20)',
    hackathon: true,
    due: 'August 30, 2026',
    status: 'NOT SUBMITTED',
    closed: true,
  },
  {
    id: 3,
    name: 'E-Commerce Website (React js)',
    topics: 4,
    due: 'August 17, 2026',
    status: 'APPROVED',
  },
  {
    id: 4,
    name: 'Furniture E-Commerce Website',
    topics: 5,
    due: 'August 10, 2026',
    status: 'SUBMITTED',
  },
  {
    id: 5,
    name: 'MaintainIQ (Batch-20)',
    hackathon: true,
    due: 'July 12, 2026',
    status: 'NOT SUBMITTED',
    closed: true,
  },
  {
    id: 6,
    name: 'JavaScript Assignment – 25 Questions',
    topics: 8,
    due: 'July 10, 2026',
    status: 'LATE SUBMITTED',
  },
  {
    id: 7,
    name: 'Budgetting App',
    topics: 12,
    due: 'June 1, 2026',
    status: 'APPROVED',
  },
]

function NameCell({ a }) {
  return (
    <div className="flex flex-col items-end xl:items-start gap-1">
      <span className={a.hackathon ? 'text-violet-600 font-medium' : 'text-slate-700'}>
        {a.name}
      </span>
      {a.hackathon && (
        <span className="text-[10px] font-semibold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">
          HACKATHON
        </span>
      )}
    </div>
  )
}

const COLUMNS = [
  { key: 'name', label: 'Assignment', render: (a) => <NameCell a={a} /> },
  {
    key: 'topics',
    label: 'Topics',
    render: (a) =>
      a.topics ? (
        <span className="inline-block bg-blue-50 text-brand-light text-xs font-medium px-2.5 py-1 rounded-md">
          {a.topics} Topics
        </span>
      ) : (
        <span className="text-slate-400 text-xs">No topics</span>
      ),
  },
  {
    key: 'due',
    label: 'Due Date',
    render: (a) => <span className={a.hackathon ? 'text-violet-500' : 'text-slate-500'}>{a.due}</span>,
  },
  { key: 'status', label: 'Status', render: (a) => <StatusBadge status={a.status} /> },
  {
    key: 'action',
    label: 'Action',
    render: (a) => (
      <div className="flex items-center gap-3 justify-end xl:justify-start">
        <button className="text-slate-400 hover:text-slate-600" aria-label="View">
          <Eye className="w-4 h-4" />
        </button>
        {a.closed ? (
          <span className="text-rose-500 text-xs italic whitespace-nowrap">Submissions closed</span>
        ) : (
          <>
            <button className="text-slate-400 hover:text-slate-600" aria-label="Submit">
              <Upload className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-slate-600" aria-label="Edit">
              <Pencil className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    ),
  },
]

export default function StudentAssignment() {
  return (
    <PageShell
      crumbs={[
        { label: 'Home', to: '/dashboard/student' },
        { label: 'Modern Web Application Development', to: '/dashboard/student' },
        { label: 'Assignment' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <StatCard
          icon={ClipboardList}
          iconBg="bg-blue-50"
          iconColor="text-brand-light"
          value={STATS.assigned}
          label="Assigned"
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
          value={STATS.submitted}
          label="Submitted"
        />
        <StatCard
          icon={Clock}
          iconBg="bg-amber-50"
          iconColor="text-amber-500"
          value={STATS.pending}
          label="Pending"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ResponsiveTable columns={COLUMNS} rows={ASSIGNMENTS} keyField="id" />
      </div>
    </PageShell>
  )
}
