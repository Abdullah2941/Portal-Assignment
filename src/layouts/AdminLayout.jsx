import { Navigate, Outlet } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { SidebarProvider } from '../hooks/useSidebar.jsx'
import Sidebar from '../components/Sidebar.jsx'

const NAV_ITEMS = [{ to: '.', icon: LayoutGrid, label: 'Dashboard', end: true }]

export default function AdminLayout() {
  const { session } = useAuth()

  if (!session || session.role !== 'admin') {
    return <Navigate to="/admin" replace />
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-[#F3F5F9]">
        <Sidebar items={NAV_ITEMS} roleLabel="Admin" />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  )
}
