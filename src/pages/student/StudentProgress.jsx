import { BookOpen, GraduationCap, Clock } from 'lucide-react'
import PageShell from '../../components/PageShell.jsx'
import StatCard from '../../components/StatCard.jsx'
import ModuleProgressList from '../../components/ModuleProgressList.jsx'
import { SELF_PROGRESS } from '../../data/progress.js'

export default function StudentProgress() {
  const { modules, topicsDone: completed, topicsTotal: total } = SELF_PROGRESS

  return (
    <PageShell
      crumbs={[
        { label: 'Home', to: '/dashboard/student' },
        { label: 'Modern Web Application Development', to: '/dashboard/student' },
        { label: 'Progress' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
        <StatCard
          icon={BookOpen}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-500"
          value={total}
          label="Total Topics"
        />
        <StatCard
          icon={GraduationCap}
          iconBg="bg-violet-50"
          iconColor="text-violet-500"
          value={completed}
          label="Completed Topics"
        />
        <StatCard
          icon={Clock}
          iconBg="bg-rose-50"
          iconColor="text-rose-500"
          value={total - completed}
          label="Pending Topics"
        />
      </div>

      <ModuleProgressList modules={modules} />
    </PageShell>
  )
}
