import { useState } from 'react'
import { Clock, ChevronDown, CheckCircle2 } from 'lucide-react'
import CircularProgress from './CircularProgress.jsx'

export default function ModuleProgressList({ modules }) {
  const [openId, setOpenId] = useState(null)

  return (
    <div className="border border-slate-100 rounded-2xl divide-y divide-slate-50 overflow-hidden">
      {modules.map((m) => {
        const isOpen = openId === m.id
        return (
          <div key={m.id}>
            <button
              onClick={() => setOpenId(isOpen ? null : m.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                {m.complete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <div>
                  <div className={`font-semibold text-slate-800 ${m.complete ? 'underline' : ''}`}>
                    {m.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    Topics: {m.done}/{m.total}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CircularProgress percent={m.percent} />
                <ChevronDown
                  className={`w-4 h-4 text-slate-300 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-slate-400">
                Detailed topic breakdown for this module is coming soon.
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
