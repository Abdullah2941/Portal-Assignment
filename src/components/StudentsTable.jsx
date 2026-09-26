import { useMemo, useState } from 'react'
import { Search, ChevronDown, Eye } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import Pagination from './Pagination.jsx'
import ResponsiveTable from './ResponsiveTable.jsx'
import { STUDENTS, initials } from '../data/students.js'

const PAGE_SIZE = 10

export default function StudentsTable() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return STUDENTS.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.roll.toLowerCase().includes(q)
      const matchesStatus = status === 'All' || s.status === status.toUpperCase()
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const updateQuery = (value) => {
    setQuery(value)
    setPage(1)
  }
  const updateStatus = (value) => {
    setStatus(value)
    setPage(1)
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (s) => (
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-brand-light text-xs font-semibold flex items-center justify-center shrink-0">
            {initials(s.name)}
          </span>
          <span className="text-slate-700">{s.name}</span>
        </div>
      ),
    },
    { key: 'roll', label: 'Roll Number' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (s) => <StatusBadge status={s.status} /> },
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
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search by name, email or roll no..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-600 outline-none focus:border-brand-light"
          />
        </div>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => updateStatus(e.target.value)}
            className="appearance-none w-full sm:w-auto bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-600 outline-none focus:border-brand-light"
          >
            <option>All</option>
            <option>Enrolled</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ResponsiveTable
          columns={columns}
          rows={pageRows}
          keyField="id"
          emptyMessage="No students match your search."
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
