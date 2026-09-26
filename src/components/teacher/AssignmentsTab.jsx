import { useState } from 'react'
import { Plus, Eye, Pencil } from 'lucide-react'
import Pagination from '../Pagination.jsx'
import ResponsiveTable from '../ResponsiveTable.jsx'

const PAGE_SIZE = 10

const ASSIGNMENTS = [
  {
    id: 1,
    title: 'Admin panel (E-commerce Dashboard)',
    description: 'Create the provided UI design in React or Next.js.',
    topics: ['NextJS', 'ReactJS Introduction', '+5'],
    due: 'Sep 10, 2026',
  },
  {
    id: 2,
    title: 'QUICKSERVE WMA (Batch-20)',
    hackathon: true,
    description: 'Challenge: Build a modern service-booking web application.',
    topics: [],
    due: 'Aug 30, 2026',
  },
  {
    id: 3,
    title: 'E-Commerce Website (React js)',
    description: 'React.js frontend — create all required e-commerce pages.',
    topics: ['ReactJS Introduction', 'Components, Props', '+2'],
    due: 'Aug 17, 2026',
  },
  {
    id: 4,
    title: 'Furniture E-Commerce Website',
    description: 'Follow the Figma design.',
    topics: ['JavaScript Book Component', 'Github', '+3'],
    due: 'Aug 10, 2026',
  },
  {
    id: 5,
    title: 'MaintainIQ (Batch-20)',
    hackathon: true,
    description: 'MaintainIQ — SMIT hackathon project.',
    topics: [],
    due: 'Jul 12, 2026',
  },
  {
    id: 6,
    title: 'JavaScript Assignment – 25 Questions',
    description: 'Complete all 25 JavaScript questions available at the link.',
    topics: ['JavaScript Introduction', 'JavaScript Chapter 1', '+6'],
    due: 'Jul 10, 2026',
  },
  {
    id: 7,
    title: 'Budgetting App',
    description: 'Develop a fully responsive and functional Budgeting Web app.',
    topics: ['JavaScript Chapter 2', 'JavaScript Chapter 3', '+10'],
    due: 'Jun 1, 2026',
  },
  {
    id: 8,
    title: 'Amazon Clone',
    description: 'Create a fully responsive landing page inspired by the official Amazon site.',
    topics: ['HTML Text', 'HTML Images', '+13'],
    due: 'May 24, 2026',
  },
  {
    id: 9,
    title: 'NASA Landing Page',
    description: 'Create a fully responsive landing page inspired by the official NASA site.',
    topics: ['Media Queries', 'HTML Text', '+7'],
    due: 'May 1, 2026',
  },
  {
    id: 10,
    title: 'Helplytics AI - Community Support App',
    hackathon: true,
    description: 'SMIT GRAND CODING NIGHT — April 2026 hackathon project.',
    topics: [],
    due: 'Apr 19, 2026',
  },
  {
    id: 11,
    title: 'Portfolio Website',
    description: 'Build a personal portfolio site with a projects and contact section.',
    topics: ['HTML', 'CSS', '+1'],
    due: 'Mar 20, 2026',
  },
  {
    id: 12,
    title: 'Weather App (API Integration)',
    description: 'Fetch and display live weather data from a public API.',
    topics: ['JavaScript', 'Fetch API', '+2'],
    due: 'Feb 15, 2026',
  },
  {
    id: 13,
    title: 'Quiz App (Vanilla JS)',
    description: 'Build a timed multiple-choice quiz app in vanilla JavaScript.',
    topics: ['JavaScript', 'DOM'],
    due: 'Jan 20, 2026',
  },
]

function TitleCell({ a }) {
  return (
    <div>
      <div className={a.hackathon ? 'text-violet-600 font-medium' : 'text-slate-700 font-medium'}>
        {a.title}
      </div>
      {a.hackathon && (
        <span className="inline-block mt-1 text-[10px] font-semibold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">
          HACKATHON
        </span>
      )}
    </div>
  )
}

function TopicsCell({ a }) {
  if (!a.topics.length) return <span className="text-slate-400 text-xs">No topics</span>
  return (
    <div className="flex flex-wrap gap-1 max-w-[220px] justify-end xl:justify-start ml-auto xl:ml-0">
      {a.topics.map((t) => (
        <span
          key={t}
          className="text-[11px] bg-blue-50 text-brand-light px-2 py-0.5 rounded-full whitespace-nowrap"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

const columns = [
  { key: 'title', label: 'Title', render: (a) => <TitleCell a={a} /> },
  {
    key: 'description',
    label: 'Description',
    render: (a) => <span className="text-slate-500">{a.description}</span>,
  },
  { key: 'topics', label: 'Topics', render: (a) => <TopicsCell a={a} /> },
  {
    key: 'due',
    label: 'Due Date',
    render: (a) => (
      <span className={a.hackathon ? 'text-violet-500' : 'text-slate-500'}>{a.due}</span>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: () => (
      <div className="flex items-center gap-3 justify-end xl:justify-start">
        <button className="text-slate-400 hover:text-slate-600" aria-label="View">
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-slate-400 hover:text-slate-600" aria-label="Edit">
          <Pencil className="w-4 h-4" />
        </button>
      </div>
    ),
  },
]

export default function AssignmentsTab() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(ASSIGNMENTS.length / PAGE_SIZE))
  const rows = ASSIGNMENTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <div className="flex justify-end mb-5">
        <button className="flex items-center gap-2 bg-brand-light hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">
          <Plus className="w-4 h-4" />
          New Assignment
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <ResponsiveTable columns={columns} rows={rows} keyField="id" />
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
          label={`Showing ${(page - 1) * PAGE_SIZE + 1}-${Math.min(
            page * PAGE_SIZE,
            ASSIGNMENTS.length
          )} of ${ASSIGNMENTS.length} records`}
        />
      </div>
    </>
  )
}
