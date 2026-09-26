import { useMemo, useState } from 'react'
import { Search, Eye } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import Pagination from './Pagination.jsx'
import ResponsiveTable from './ResponsiveTable.jsx'
import { initials } from '../data/students.js'
import { TEACHERS } from '../data/teachers.js'

const PAGE_SIZE = 10

export default function TeachersTable() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TEACHERS.filter(
      (t) =>
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.employeeId.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q)
    )
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const updateQuery = (value) => {
    setQuery(value)
    setPage(1)
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (t) => (
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold flex items-center justify-center shrink-0">
            {initials(t.name)}
          </span>
          <span className="text-slate-700">{t.name}</span>
        </div>
      ),
    },
    { key: 'employeeId', label: 'Employee ID' },
    { key: 'subject', label: 'Subject' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (t) => <StatusBadge status={t.status} /> },
    {
      key: 'action',
      label: 'Action',
      render: () => (
        <button className="text-slate-400 hover:text-slate-600" aria-label="View">
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ]

  return (
    <>
      <div className="relative mb-5 sm:max-w-xs">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
          placeholder="Search by name, email or subject..."
          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-600 outline-none focus:border-brand-light"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ResponsiveTable
          columns={columns}
          rows={pageRows}
          keyField="id"
          emptyMessage="No teachers match your search."
        />
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onChange={setPage}
          label={`Showing ${filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}-${Math.min(
            safePage * PAGE_SIZE,
            filtered.length
          )} of ${filtered.length} records`}
        />
      </div>
    </>
  )
}
