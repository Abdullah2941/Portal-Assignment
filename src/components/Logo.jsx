import { GraduationCap } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-1 mb-2">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-8 h-8 text-brand-light" strokeWidth={2.2} />
        <span className="text-3xl font-extrabold text-brand-light tracking-tight">SMIT</span>
      </div>
      <span className="text-[11px] font-medium text-slate-400 tracking-wide">
        SAYLANI MASS IT TRAINING
      </span>
    </div>
  )
}
