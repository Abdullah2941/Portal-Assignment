import { ChevronLeft, ChevronRight } from 'lucide-react'
import { pageNumbers } from '../utils/pagination.js'

export default function Pagination({ page, totalPages, onChange, label }) {
  if (totalPages <= 1 && !label) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-100">
      {label && <span className="text-xs text-slate-400 order-2 sm:order-1">{label}</span>}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="flex items-center gap-1 text-xs text-slate-500 px-2.5 py-1.5 rounded-lg disabled:opacity-40 hover:bg-slate-50"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Previous
        </button>
        {pageNumbers(page, totalPages).map((n, i) =>
          n === '...' ? (
            <span key={`dots-${i}`} className="text-xs text-slate-300 px-1">
              …
            </span>
          ) : (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`text-xs w-7 h-7 rounded-lg ${
                n === page ? 'bg-brand-light text-white font-semibold' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {n}
            </button>
          )
        )}
        <button
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="flex items-center gap-1 text-xs text-slate-500 px-2.5 py-1.5 rounded-lg disabled:opacity-40 hover:bg-slate-50"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
