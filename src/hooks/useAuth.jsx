import { createContext, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from './useLocalStorage.js'

const AuthContext = createContext(null)

const emptyUsers = { student: [], teacher: [], admin: [] }

// NOTE: passwords are stored in plain text in localStorage for this demo
// project only. A real backend should hash passwords and never keep them
// in browser storage.
export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('smit_users', emptyUsers)
  const [session, setSession] = useLocalStorage('smit_session', null)
  const navigate = useNavigate()

  const register = useCallback(
    ({ role, cnic, dob, password }) => {
      const list = users[role] ?? []
      if (list.some((u) => u.cnic === cnic)) {
        return {
          ok: false,
          message: 'An account with this CNIC already exists. Please login instead.',
        }
      }
      setUsers({ ...users, [role]: [...list, { cnic, dob, password }] })
      return { ok: true, message: 'Password created. You can now login.' }
    },
    [users, setUsers]
  )

  const login = useCallback(
    ({ role, cnic, password }) => {
      const list = users[role] ?? []
      const match = list.find((u) => u.cnic === cnic && u.password === password)
      if (!match) {
        return { ok: false, message: 'Invalid CNIC or password.' }
      }
      setSession({ role, cnic })
      navigate(`/dashboard/${role}`)
      return { ok: true, message: 'Login successful.' }
    },
    [users, setSession, navigate]
  )

  const logout = useCallback(() => {
    setSession(null)
    navigate('/')
  }, [setSession, navigate])

  return (
    <AuthContext.Provider value={{ session, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
