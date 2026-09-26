import { Navigate, Outlet } from 'react-router-dom'
import { LayoutGrid, BookOpen, CalendarCheck, Wallet, FileText, ClipboardCheck } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { SidebarProvider } from '../hooks/useSidebar.jsx'
import Sidebar from '../components/Sidebar.jsx'

const NAV_ITEMS = [
  { to: '.', icon: LayoutGrid, label: 'Dashboard', end: true },
  { to: 'progress', icon: BookOpen, label: 'Progress' },
  { to: 'attendance', icon: CalendarCheck, label: 'Attendance' },
  { to: 'payment', icon: Wallet, label: 'Payment' },
  { to: 'assignment', icon: FileText, label: 'Assignment' },
  { to: 'quiz', icon: ClipboardCheck, label: 'Quiz' },
]

export default function StudentLayout() {
  const { session } = useAuth()

  if (!session || session.role !== 'student') {
    return <Navigate to="/student" replace />
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-[#F3F5F9]">
        <Sidebar items={NAV_ITEMS} roleLabel="Student" />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}
