import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GraduationCap, ChevronLeft, ChevronRight, LogOut, User, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useSidebar } from '../hooks/useSidebar.jsx'

export default function Sidebar({ items, roleLabel }) {
  const [collapsed, setCollapsed] = useState(false)
  const { session, logout } = useAuth()
  const { mobileOpen, setMobileOpen } = useSidebar()

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-200 md:transition-[width] md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${collapsed ? 'md:w-[76px]' : 'md:w-[220px]'}`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <GraduationCap className="w-6 h-6 text-brand-light shrink-0" />
            {!collapsed && (
              <div className="leading-none min-w-0">
                <div className="font-extrabold text-brand-light text-lg">SMIT</div>
                <div className="text-[8px] text-slate-400 tracking-wide truncate">
                  SAYLANI MASS IT TRAINING
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden md:inline-flex text-slate-400 hover:text-slate-600 shrink-0"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-slate-400 hover:text-slate-600 shrink-0"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto">
          {items.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? 'bg-blue-50 text-brand-light font-medium'
                    : 'text-slate-500 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-100 flex items-center gap-2">
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 shrink-0">
            <User className="w-5 h-5" />
          </span>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-700 truncate">{roleLabel}</div>
              <div className="text-xs text-slate-400 truncate">{session?.cnic}</div>
            </div>
          )}
          <button
            onClick={logout}
            className="text-slate-300 hover:text-rose-500 shrink-0"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  )
}
