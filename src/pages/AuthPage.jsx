import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../components/Logo.jsx'
import Tabs from '../components/Tabs.jsx'
import FormField from '../components/FormField.jsx'
import { useAuth } from '../hooks/useAuth.jsx'

const ROLE_LABEL = {
  student: 'Student Portal',
  teacher: 'Teacher Portal',
  admin: 'Admin Portal',
}

const OTHER_ROLES = {
  student: ['teacher', 'admin'],
  teacher: ['student', 'admin'],
  admin: ['student', 'teacher'],
}

export default function AuthPage({ role }) {
  const [tab, setTab] = useState('login')
  const { login, register } = useAuth()
  const [status, setStatus] = useState(null)

  const [loginForm, setLoginForm] = useState({ cnic: '', password: '', remember: false })
  const [createForm, setCreateForm] = useState({ cnic: '', dob: '', password: '' })

  const handleLogin = (e) => {
    e.preventDefault()
    setStatus(login({ role, cnic: loginForm.cnic, password: loginForm.password }))
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const result = register({ role, ...createForm })
    setStatus(result)
    if (result.ok) {
      setTab('login')
      setCreateForm({ cnic: '', dob: '', password: '' })
    }
  }

  const switchTab = (value) => {
    setTab(value)
    setStatus(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <Logo />
        <h1 className="text-center text-lg font-semibold text-slate-800 mb-4">
          {ROLE_LABEL[role]}
        </h1>

        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-500 mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to portal selection
        </Link>

        <Tabs
          tabs={[
            { value: 'login', label: 'Login' },
            { value: 'create', label: 'Create Password' },
          ]}
          active={tab}
          onChange={switchTab}
        />

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          {tab === 'login' ? (
            <>
              <h2 className="font-semibold text-slate-800 mb-1">Login</h2>
              <p className="text-sm text-slate-400 mb-5">
                Kindly provide the CNIC number and password used during SMIT course
                registration.
              </p>
              <form onSubmit={handleLogin}>
                <FormField
                  label="CNIC"
                  required
                  placeholder="123456789"
                  value={loginForm.cnic}
                  onChange={(e) => setLoginForm({ ...loginForm, cnic: e.target.value })}
                />
                <FormField
                  label="Password"
                  required
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <label className="flex items-center gap-2 text-sm text-slate-500 mb-5">
                  <input
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, remember: e.target.checked })
                    }
                    className="rounded border-slate-300 text-brand-light focus:ring-brand-light"
                  />
                  Remember me
                </label>
                <button
                  type="submit"
                  className="w-full bg-[#1B2A6B] hover:bg-[#16215A] text-white font-semibold rounded-lg py-2.5 transition"
                >
                  LOGIN
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="font-semibold text-slate-800 mb-1">Create a Password</h2>
              <p className="text-sm text-slate-400 mb-5">
                Kindly provide the CNIC number and DOB used during SMIT course
                registration.
              </p>
              <form onSubmit={handleCreate}>
                <FormField
                  label="CNIC"
                  required
                  placeholder="123456789"
                  value={createForm.cnic}
                  onChange={(e) => setCreateForm({ ...createForm, cnic: e.target.value })}
                />
                <FormField
                  label="DOB"
                  required
                  type="date"
                  value={createForm.dob}
                  onChange={(e) => setCreateForm({ ...createForm, dob: e.target.value })}
                />
                <FormField
                  label="Password"
                  required
                  type="password"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                />
                <button
                  type="submit"
                  className="w-full bg-[#1B2A6B] hover:bg-[#16215A] text-white font-semibold rounded-lg py-2.5 transition"
                >
                  SUBMIT
                </button>
              </form>
            </>
          )}

          {status && (
            <p
              className={`mt-4 text-sm text-center ${
                status.ok ? 'text-emerald-600' : 'text-rose-500'
              }`}
            >
              {status.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {OTHER_ROLES[role].map((r) => (
            <Link
              key={r}
              to={`/${r}`}
              className="text-center bg-white rounded-xl border border-slate-100 shadow-sm py-3 text-sm font-medium text-slate-600 hover:border-brand-light/30 transition"
            >
              Login as {r.charAt(0).toUpperCase() + r.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
