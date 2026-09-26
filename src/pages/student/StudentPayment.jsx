import PageShell from '../../components/PageShell.jsx'

export default function StudentPayment() {
  return (
    <PageShell
      crumbs={[
        { label: 'Home', to: '/dashboard/student' },
        { label: 'Modern Web Application Development', to: '/dashboard/student' },
        { label: 'Payment' },
      ]}
    >
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
        Payment page design coming soon.
      </div>
    </PageShell>
  )
}
