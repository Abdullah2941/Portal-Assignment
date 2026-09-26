import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ModuleProgressList from '../ModuleProgressList.jsx'
import { STUDENTS } from '../../data/students.js'
import { progressForId, SELF_ID } from '../../data/progress.js'

export default function CourseProgressTab() {
  const [selectedId, setSelectedId] = useState(SELF_ID)
  const progress = progressForId(selectedId)

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="text-xs font-semibold text-slate-400 tracking-wide mb-1">
          COMPARE PROGRESS
        </div>
        <div className="font-semibold text-slate-800 mb-3">Course Progress Overview</div>
        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) =>
              setSelectedId(e.target.value === SELF_ID ? SELF_ID : Number(e.target.value))
            }
            className="w-full appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-600 outline-none focus:border-brand-light"
          >
            <option value={SELF_ID}>Only My Progress</option>
            {STUDENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.roll})
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="text-xs font-semibold text-slate-400 tracking-wide mb-1">
          {selectedId === SELF_ID ? 'MY PROGRESS' : 'STUDENT PROGRESS'}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <div className="font-semibold text-slate-800">
            {progress.name} - {progress.campus}{' '}
            <span className="text-xs font-medium text-slate-400">Batch {progress.batch}</span>
          </div>
          <span className="text-xs font-semibold text-brand-light bg-blue-50 px-2.5 py-1 rounded-full whitespace-nowrap">
            Topics: {progress.topicsDone}/{progress.topicsTotal}
          </span>
        </div>
        <div className="text-xs text-slate-400 mb-4">{progress.schedule.join(' | ')}</div>
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span>Overall progress</span>
          <span>{progress.overall}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden mb-5">
          <div
            className="h-full bg-brand-light rounded-full"
            style={{ width: `${progress.overall}%` }}
          />
        </div>
        <ModuleProgressList modules={progress.modules} />
      </div>
    </div>
  )
}
