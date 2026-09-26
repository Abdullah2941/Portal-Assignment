import { Routes, Route } from 'react-router-dom'
import PortalSelect from './pages/PortalSelect.jsx'
import AuthPage from './pages/AuthPage.jsx'
import StudentLayout from './layouts/StudentLayout.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import StudentProgress from './pages/student/StudentProgress.jsx'
import StudentAttendance from './pages/student/StudentAttendance.jsx'
import StudentPayment from './pages/student/StudentPayment.jsx'
import StudentAssignment from './pages/student/StudentAssignment.jsx'
import StudentQuiz from './pages/student/StudentQuiz.jsx'
import TeacherLayout from './layouts/TeacherLayout.jsx'
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PortalSelect />} />
        <Route path="/student" element={<AuthPage role="student" />} />
        <Route path="/teacher" element={<AuthPage role="teacher" />} />
        <Route path="/admin" element={<AuthPage role="admin" />} />

        <Route path="/dashboard/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="progress" element={<StudentProgress />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="payment" element={<StudentPayment />} />
          <Route path="assignment" element={<StudentAssignment />} />
          <Route path="quiz" element={<StudentQuiz />} />
        </Route>

        <Route path="/dashboard/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboard />} />
        </Route>

        <Route path="/dashboard/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
