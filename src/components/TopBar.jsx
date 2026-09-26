import { Link } from 'react-router-dom'
import { MessageSquare, Menu } from 'lucide-react'
import { useSidebar } from '../hooks/useSidebar.jsx'

export default function TopBar({ crumbs = [] }) {
  const { setMobileOpen } = useSidebar()

  return (
    <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-100 bg-white">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden text-slate-500 shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-x-2 gap-y-1 text-sm flex-wrap min-w-0">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-300">›</span>}
                {crumb.to && !isLast ? (
                  <Link to={crumb.to} className="text-slate-400 hover:text-slate-500">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'font-semibold text-slate-700' : 'text-slate-400'}>
                    {crumb.label}
                  </span>
                )}
              </span>
            )
          })}
        </div>
      </div>
      <button className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition shrink-0">
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">Feedback</span>
      </button>
    </div>
  )
}
