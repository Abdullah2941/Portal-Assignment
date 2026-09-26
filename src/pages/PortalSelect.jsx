import { GraduationCap, Users, ShieldCheck } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import PortalOptionCard from '../components/PortalOptionCard.jsx'

export default function PortalSelect() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <Logo />
        <h1 className="text-center text-lg font-semibold text-slate-800 mb-6">
          Select Portal
        </h1>
        <div className="flex flex-col gap-4">
          <PortalOptionCard to="/student" icon={GraduationCap} label="Student Portal" />
          <PortalOptionCard to="/teacher" icon={Users} label="Teacher Portal" />
          <PortalOptionCard to="/admin" icon={ShieldCheck} label="Admin Portal" />
        </div>
      </div>
    </div>
  )
}
