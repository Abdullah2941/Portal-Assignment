import { useState, useEffect } from 'react';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  BookOpen,
  CalendarCheck,
  CreditCard,
  ClipboardList,
  HelpCircle,
  User,
  MessageSquare,
  CalendarDays,
  Clock,
  Hash,
  MapPin,
  Copy,
  Check,
  Calendar,
  XCircle,
  Upload,
  Pencil,
  Menu,
  X,
  AlertTriangle,
  Search,
} from 'lucide-react';

// Measures the ACTUAL rendered width (not a guessed CSS breakpoint) so the
// layout reliably switches to "wide" mode whatever panel size it's shown in.
function useIsWide(breakpoint = 640) {
  const [isWide, setIsWide] = useState(true);
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isWide;
}

const ROLES = {
  student: {
    key: 'student',
    label: 'Student',
    portalName: 'Student Portal',
    Icon: GraduationCap,
    identifierLabel: 'CNIC',
    identifierPlaceholder: '4230188141761',
    signupIdentifierPlaceholder: '123456789',
    loginDesc:
      'Kindly provide the CNIC number and password used during SMIT course registration.',
    signupDesc:
      'Kindly provide the CNIC number and DOB used during SMIT course registration.',
    showForgotPassword: false,
    showRememberMe: true,
  },
  teacher: {
    key: 'teacher',
    label: 'Teacher',
    portalName: 'Trainer Portal',
    Icon: Users,
    identifierLabel: 'Email',
    identifierPlaceholder: 'trainer@smit.edu.pk',
    signupIdentifierPlaceholder: 'trainer@smit.edu.pk',
    loginDesc:
      'Kindly provide your email and password to access the trainer portal.',
    signupDesc:
      'Kindly provide your email and date of birth to create your trainer password.',
    showForgotPassword: true,
    showRememberMe: true,
  },
  admin: {
    key: 'admin',
    label: 'Admin',
    portalName: 'Admin Portal',
    Icon: ShieldCheck,
    identifierLabel: 'Email',
    identifierPlaceholder: 'admin@smit.edu.pk',
    signupIdentifierPlaceholder: 'admin@smit.edu.pk',
    loginDesc:
      'Kindly provide your email and password to access the admin portal.',
    signupDesc:
      'Kindly provide your email and date of birth to create your admin password.',
    showForgotPassword: true,
  },
};

// ---- persisted "accounts" store (survives reloads, keyed by role + identifier) ----
async function saveAccount(roleKey, identifier, password, dob) {
  const key = `account:${roleKey}:${identifier}`;
  localStorage.setItem(key, JSON.stringify({ password, dob }));
}

async function getAccount(roleKey, identifier) {
  const key = `account:${roleKey}:${identifier}`;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function Logo({ subtitle }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center gap-1.5">
        <GraduationCap className="w-8 h-8 text-blue-800" strokeWidth={2.2} />
        <span className="text-3xl font-bold text-blue-800 tracking-tight">
          SMIT
        </span>
      </div>
      <span className="text-[10px] tracking-widest text-gray-400 font-medium mt-0.5">
        SAYLANI MASS IT TRAINING
      </span>
      {subtitle && (
        <span className="mt-2 text-lg text-gray-700 font-medium">
          {subtitle}
        </span>
      )}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputClass =
  'w-full rounded-md bg-blue-50 border border-transparent focus:border-blue-300 focus:outline-none px-3 py-2.5 text-sm text-gray-800';

function PasswordField({ value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

function Tabs({ active, onChange }) {
  const tabs = [
    { key: 'login', label: 'Login' },
    { key: 'signup', label: 'Create Password' },
  ];
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={`flex-1 text-sm font-medium py-2 rounded-md transition ${
            active === t.key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function Note({ text, tone }) {
  const styles =
    tone === 'error'
      ? 'text-red-600 bg-red-50'
      : 'text-emerald-600 bg-emerald-50';
  return (
    <div
      className={`mt-4 flex items-center gap-2 text-sm rounded-md px-3 py-2 ${styles}`}
    >
      <CheckCircle2 className="w-4 h-4 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

function LoginForm({ role, onSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!identifier) newErrors.identifier = `${role.identifierLabel} is required`;
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    const account = await getAccount(role.key, identifier);
    setLoading(false);

    if (!account) {
      setErrors({
        general: 'No account found. Please create a password first.',
      });
      return;
    }
    if (account.password !== password) {
      setErrors({ general: `Invalid ${role.identifierLabel} or password.` });
      return;
    }
    onSuccess?.();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Login</h2>
      <p className="text-sm text-slate-500 mb-5 leading-snug">
        {role.loginDesc}
      </p>

      <Field label={role.identifierLabel} required error={errors.identifier}>
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={role.identifierPlaceholder}
          className={inputClass}
        />
      </Field>

      <Field label="Password" required error={errors.password}>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
        />
      </Field>

      {role.showRememberMe && (
        <label className="flex items-center gap-2 mb-4 text-sm text-gray-600 select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-800 focus:ring-blue-300"
          />
          Remember me
        </label>
      )}

      {errors.general && <Note text={errors.general} tone="error" />}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm tracking-wide py-3 rounded-md transition mt-1 ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'LOGGING IN...' : 'LOGIN'}
      </button>

      {role.showForgotPassword && (
        <p className="text-center mt-4">
          <button
            type="button"
            className="text-blue-700 text-sm hover:underline"
          >
            Forgot Password?
          </button>
        </p>
      )}
    </div>
  );
}

function SignupForm({ role, onSignupSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!identifier) newErrors.identifier = `${role.identifierLabel} is required`;
    if (!dob) newErrors.dob = 'Date of birth is required';
    if (!password) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await saveAccount(role.key, identifier, password, dob);
      setSubmitted(true);
      setTimeout(() => onSignupSuccess?.(), 900);
    } catch (e) {
      setErrors({ general: 'Could not save your account, please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">
        Create a Password
      </h2>
      <p className="text-sm text-slate-500 mb-5 leading-snug">
        {role.signupDesc}
      </p>

      <Field label={role.identifierLabel} required error={errors.identifier}>
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={role.signupIdentifierPlaceholder}
          className={inputClass}
        />
      </Field>

      <Field label="DOB" required error={errors.dob}>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field label="Password" required error={errors.password}>
        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
        />
      </Field>

      {errors.general && <Note text={errors.general} tone="error" />}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading || submitted}
        className={`w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm tracking-wide py-3 rounded-md transition mt-1 ${
          loading || submitted ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'SAVING...' : 'SUBMIT'}
      </button>

      {submitted && (
        <Note text="Password created! Taking you to Login..." tone="success" />
      )}
    </div>
  );
}

function RoleSwitcher({ current, onSwitch }) {
  const others = Object.values(ROLES).filter((r) => r.key !== current);
  return (
    <div className="mt-4 space-y-2">
      {others.map((r) => (
        <button
          key={r.key}
          type="button"
          onClick={() => onSwitch(r.key)}
          className="w-full bg-white border border-gray-200 rounded-md py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-800 transition"
        >
          Login as {r.label.toLowerCase()}
        </button>
      ))}
    </div>
  );
}

function RoleSelect({ onSelect }) {
  return (
    <div>
      <Logo subtitle="Select Portal" />
      <div className="space-y-3">
        {Object.values(ROLES).map((r) => {
          const Icon = r.Icon;
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => onSelect(r.key)}
              className="w-full flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3.5 hover:border-blue-800 hover:shadow-md transition"
            >
              <span className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-blue-800" />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {r.label} Portal
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard({ role, onLogout }) {
  const Icon = role.Icon;
  return (
    <div>
      <Logo subtitle={role.portalName} />
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 text-center">
        <span className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
          <Icon className="w-6 h-6 text-blue-800" />
        </span>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Welcome, {role.label}!
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          You're logged in. The full dashboard and other pages will go here
          once their designs are shared.
        </p>
        <button
          type="button"
          onClick={onLogout}
          className="w-full border border-gray-200 rounded-md py-2.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// ---------------- Student Dashboard ----------------

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid },
  { label: 'Progress', icon: BookOpen },
  { label: 'Attendance', icon: CalendarCheck },
  { label: 'Payment', icon: CreditCard },
  { label: 'Assignment', icon: ClipboardList },
  { label: 'Quiz', icon: HelpCircle },
];

function SidebarContent({ active, onSelect, onLogout, onNavigate }) {
  return (
    <div className="w-56 bg-white h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-8 px-1">
        <div className="flex items-center gap-1">
          <GraduationCap className="w-6 h-6 text-blue-800" strokeWidth={2.2} />
          <span className="text-xl font-bold text-blue-800">SMIT</span>
        </div>
        <ChevronLeft className="w-4 h-4 text-gray-300 hidden md:block" />
      </div>
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.label === active;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                onSelect(item.label);
                onNavigate?.();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-50 text-blue-800'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-gray-100 pt-4 mt-4">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
        >
          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-gray-500" />
          </span>
          <span className="text-left">
            <span className="block font-medium text-gray-700">Student</span>
            <span className="block text-xs text-gray-400">Logout</span>
          </span>
        </button>
      </div>
    </div>
  );
}

function Sidebar({ active, onSelect, onLogout, mobileOpen, onCloseMobile, isWide }) {
  return (
    <>
      {/* Tablet / laptop / desktop: always-visible sidebar */}
      {isWide && (
        <div className="border-r border-gray-100 min-h-screen shrink-0">
          <SidebarContent active={active} onSelect={onSelect} onLogout={onLogout} />
        </div>
      )}

      {/* Mobile: slide-in drawer */}
      {!isWide && mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 max-w-[80%] bg-white h-full shadow-xl overflow-y-auto">
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={onCloseMobile}
                className="text-gray-400 hover:text-gray-600 p-2"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent
              active={active}
              onSelect={onSelect}
              onLogout={onLogout}
              onNavigate={onCloseMobile}
            />
          </div>
          <div
            className="flex-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={onCloseMobile}
          />
        </div>
      )}
    </>
  );
}

function FeedbackModal({ onClose }) {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900">
              Feedback bhej diya gaya, shukriya!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-sm text-blue-700 hover:underline"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">
                Send Feedback
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Apna feedback likhein..."
              className="w-full rounded-md bg-blue-50 border border-transparent focus:border-blue-300 focus:outline-none px-3 py-2.5 text-sm text-gray-800 resize-none"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full mt-4 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm py-2.5 rounded-md transition"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function TopBar({ trail, onMenuClick, isWide }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {!isWide && (
          <button
            type="button"
            onClick={onMenuClick}
            className="text-gray-500 hover:text-gray-700 p-1.5 -ml-1.5 shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2 text-sm flex-wrap min-w-0">
          {trail.map((t, i) => (
            <span key={i} className="flex items-center gap-2 min-w-0">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
              <span
                className={`truncate ${
                  i === trail.length - 1
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {t}
              </span>
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setFeedbackOpen(true)}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:border-blue-300 hover:text-blue-800 transition shrink-0"
      >
        <MessageSquare className="w-4 h-4" />
        Feedback
      </button>
      {feedbackOpen && (
        <FeedbackModal onClose={() => setFeedbackOpen(false)} />
      )}
    </div>
  );
}

function StatCard({ value, label, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-5 flex items-center justify-between gap-2 min-w-0">
      <div className="min-w-0">
        <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
          {value}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
          {label}
        </p>
      </div>
      <span
        className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
      </span>
    </div>
  );
}

function ClassScheduleCard({ days }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-4 h-4 text-gray-700" />
        <h3 className="text-sm font-semibold text-gray-900">Class Schedule</h3>
      </div>
      <div className="flex justify-between gap-1">
        {days.map((d) => (
          <div
            key={d.date}
            className={`flex-1 flex flex-col items-center rounded-lg py-2 text-xs font-medium ${
              d.active ? 'bg-emerald-500 text-white' : 'bg-gray-50 text-gray-600'
            }`}
          >
            <span>{d.day}</span>
            <span className="mt-1">{d.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingPanel() {
  const [tab, setTab] = useState('Quizzes');
  const tabs = ['Assignments', 'Quizzes', 'Events'];
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 text-sm font-medium py-2 rounded-md transition ${
              tab === t
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-400 text-center py-4">
        No upcoming {tab.toLowerCase()}
      </p>
    </div>
  );
}

function ActiveCourseCard({ course, isWide }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Active Course</h3>
      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <h4 className="text-lg font-bold text-gray-900">{course.title}</h4>
          <span className="text-xs font-medium text-blue-700 border border-blue-200 rounded-full px-3 py-1 whitespace-nowrap">
            {course.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {course.schedule.map((s) => (
            <span
              key={s}
              className="text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="text-gray-600">Progress</span>
          <span className="text-gray-500">{course.progress}% Completed</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
          <div
            className="bg-emerald-500 h-2 rounded-full"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <div
          className="grid gap-y-3 gap-x-4 text-sm"
          style={{
            gridTemplateColumns: isWide ? 'repeat(2, minmax(0, 1fr))' : '1fr',
          }}
        >
          <div className="flex items-center gap-2 text-gray-600">
            <Hash className="w-4 h-4 text-gray-400" />
            Batch: <span className="text-gray-800 font-medium">{course.batch}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4 text-gray-400" />
            Roll: <span className="text-gray-800 font-medium">{course.roll}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            Campus:{' '}
            <span className="text-blue-700 font-medium">{course.campus}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            City: <span className="text-blue-700 font-medium">{course.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeeSection({ rows, isWide }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Fee</h3>
      {isWide ? (
        <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="font-medium px-5 py-3">Month</th>
                <th className="font-medium px-5 py-3">Amount</th>
                <th className="font-medium px-5 py-3">Type</th>
                <th className="font-medium px-5 py-3">Due date</th>
                <th className="font-medium px-5 py-3">Voucher ID</th>
                <th className="font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.voucherId} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r.month}</td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r.amount}</td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r.type}</td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{r.dueDate}</td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-2">
                      {r.voucherId}
                      <Copy className="w-3.5 h-3.5 text-gray-400" />
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.voucherId}
              className="bg-white border border-gray-100 rounded-xl p-4 text-sm space-y-2 min-w-0"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-gray-800">{r.month}</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1 shrink-0">
                  {r.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-500 gap-2">
                <span className="truncate">{r.type}</span>
                <span className="text-gray-800 font-medium shrink-0">{r.amount}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 gap-2">
                <span className="truncate">Due: {r.dueDate}</span>
                <span className="inline-flex items-center gap-1 shrink-0">
                  {r.voucherId}
                  <Copy className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardHome({ isWide }) {
  const course = {
    title: 'Modern Web Application Development',
    status: 'ENROLLED',
    schedule: [
      'Mon 01:00 PM – 03:00 PM',
      'Wed 01:00 PM – 03:00 PM',
      'Fri 01:00 PM – 03:00 PM',
    ],
    progress: 73,
    batch: 20,
    roll: '771296',
    campus: 'Zaitoon Ashraf IT Park',
    city: 'Karachi',
  };

  const scheduleDays = [
    { day: 'Sun', date: 13, active: false },
    { day: 'Mon', date: 14, active: true },
    { day: 'Tue', date: 15, active: false },
    { day: 'Wed', date: 16, active: true },
    { day: 'Thu', date: 17, active: false },
    { day: 'Fri', date: 18, active: true },
    { day: 'Sat', date: 19, active: false },
  ];

  const feeRows = [
    {
      month: 'Sep 2026',
      amount: 'Rs: 1000 /-',
      type: 'Monthly',
      dueDate: '08-Sep-2026',
      voucherId: '202609771296',
      status: 'PAID',
    },
  ];

  return (
    <div
      className="grid gap-4 mt-4"
      style={{ gridTemplateColumns: isWide ? '2fr 1fr' : '1fr' }}
    >
      <div className="space-y-4">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: isWide ? 'repeat(2, minmax(0, 1fr))' : '1fr',
          }}
        >
          <StatCard
            value="99/110"
            label="Attendance"
            icon={Clock}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-500"
          />
          <StatCard
            value="8/13"
            label="Assignment"
            icon={GraduationCap}
            iconBg="bg-purple-50"
            iconColor="text-purple-500"
          />
        </div>

        <ActiveCourseCard course={course} isWide={isWide} />
        <FeeSection rows={feeRows} isWide={isWide} />
      </div>

      <div className="space-y-4">
        <ClassScheduleCard days={scheduleDays} />
        <UpcomingPanel />
      </div>
    </div>
  );
}

function CircularProgress({ percent, size = 44, strokeWidth = 4 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2563EB"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-blue-700">
        {percent}%
      </span>
    </div>
  );
}

function TopicRow({ title, topicsLabel, percent, completed }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              completed ? 'bg-emerald-50' : 'bg-amber-50'
            }`}
          >
            {completed ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Clock className="w-4 h-4 text-amber-500" />
            )}
          </span>
          <div className="min-w-0">
            <p
              className={`text-sm font-semibold text-gray-900 truncate ${
                completed ? 'underline' : ''
              }`}
            >
              {title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{topicsLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {percent > 0 ? (
            <CircularProgress percent={percent} />
          ) : (
            <span className="text-sm text-gray-500 w-11 text-center">0</span>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-gray-300 hover:text-gray-500"
            aria-label="Toggle topics"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
      {open && (
        <div className="px-5 pb-4 pt-0 border-t border-gray-50 text-xs text-gray-400">
          Individual topic list ka data abhi share nahi hua — jaise milega,
          yahan list ho jayega.
        </div>
      )}
    </div>
  );
}

function ProgressPage({ isWide }) {
  const stats = [
    {
      value: 81,
      label: 'Total Topics',
      icon: BookOpen,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      value: 56,
      label: 'Completed Topics',
      icon: GraduationCap,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      value: 25,
      label: 'Pending Topics',
      icon: Clock,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
  ];

  const modules = [
    { title: 'Web Designing', topicsLabel: 'Topics: 20/20', percent: 100, completed: true },
    { title: 'Front-End Development', topicsLabel: 'Topics: 26/31', percent: 84, completed: false },
    { title: 'Modern Front-End Development', topicsLabel: 'Topics: 10/14', percent: 71, completed: false },
    { title: 'Back-End Development', topicsLabel: 'Topics: 0/16', percent: 0, completed: false },
  ];

  return (
    <div className="space-y-4 mt-4">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: isWide ? 'repeat(3, minmax(0, 1fr))' : '1fr',
        }}
      >
        {stats.map((s) => (
          <StatCard
            key={s.label}
            value={s.value}
            label={s.label}
            icon={s.icon}
            iconBg={s.iconBg}
            iconColor={s.iconColor}
          />
        ))}
      </div>
      <div className="space-y-3">
        {modules.map((m) => (
          <TopicRow key={m.title} {...m} />
        ))}
      </div>
    </div>
  );
}

function statusBadgeClass(status) {
  switch (status) {
    case 'APPROVED':
      return 'bg-emerald-50 text-emerald-600';
    case 'SUBMITTED':
      return 'bg-blue-50 text-blue-600';
    case 'LATE SUBMITTED':
      return 'bg-amber-50 text-amber-600';
    case 'NOT SUBMITTED':
    default:
      return 'bg-gray-100 text-gray-500';
  }
}

function AssignmentsTable({ rows, isWide }) {
  if (!isWide) {
    return (
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.title}
            className={`border border-gray-100 rounded-xl p-4 text-sm space-y-2 min-w-0 ${
              r.hackathon ? 'bg-purple-50' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-medium ${
                  r.hackathon ? 'text-purple-700' : 'text-gray-800'
                }`}
              >
                {r.title}
              </span>
              {r.hackathon && (
                <span className="text-[10px] font-semibold text-purple-600 bg-purple-100 rounded-full px-2 py-0.5">
                  HACKATHON
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              {r.topics === 'No topics' ? (
                <span className="text-xs text-gray-400">{r.topics}</span>
              ) : (
                <span className="text-xs text-blue-700 bg-blue-50 rounded-full px-3 py-1">
                  {r.topics}
                </span>
              )}
              <span
                className={`text-xs font-medium rounded-full px-3 py-1 shrink-0 ${statusBadgeClass(
                  r.status
                )}`}
              >
                {r.status}
              </span>
            </div>
            <div
              className={`text-xs ${
                r.hackathon ? 'text-purple-600 font-medium' : 'text-gray-500'
              }`}
            >
              Due: {r.dueDate}
            </div>
            <div className="flex items-center gap-3 pt-1">
              {r.hackathon ? (
                <>
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-red-500 italic">
                    Submissions closed
                  </span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-gray-400" />
                  <Upload className="w-4 h-4 text-gray-400" />
                  <Pencil className="w-4 h-4 text-gray-400" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            <th className="font-medium px-5 py-3">Assignment</th>
            <th className="font-medium px-5 py-3">Topics</th>
            <th className="font-medium px-5 py-3">Due Date</th>
            <th className="font-medium px-5 py-3">Status</th>
            <th className="font-medium px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.title}
              className={`border-b border-gray-50 last:border-0 ${
                r.hackathon ? 'bg-purple-50' : ''
              }`}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`font-medium ${
                      r.hackathon ? 'text-purple-700' : 'text-gray-800'
                    }`}
                  >
                    {r.title}
                  </span>
                  {r.hackathon && (
                    <span className="text-[10px] font-semibold text-purple-600 bg-purple-100 rounded-full px-2 py-0.5">
                      HACKATHON
                    </span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                {r.topics === 'No topics' ? (
                  <span className="text-gray-400">{r.topics}</span>
                ) : (
                  <span className="text-xs text-blue-700 bg-blue-50 rounded-full px-3 py-1">
                    {r.topics}
                  </span>
                )}
              </td>
              <td
                className={`px-5 py-4 whitespace-nowrap ${
                  r.hackathon ? 'text-purple-600 font-medium' : 'text-gray-700'
                }`}
              >
                {r.dueDate}
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span
                  className={`text-xs font-medium rounded-full px-3 py-1 ${statusBadgeClass(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                {r.hackathon ? (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-red-500 italic">
                      Submissions closed
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-gray-400">
                    <button type="button" className="hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:text-gray-600">
                      <Upload className="w-4 h-4" />
                    </button>
                    <button type="button" className="hover:text-gray-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md bg-white border border-gray-200 focus:border-blue-300 focus:outline-none pl-9 pr-3 py-2.5 text-sm text-gray-800"
      />
    </div>
  );
}

function AssignmentsPage({ isWide }) {
  const [search, setSearch] = useState('');

  const stats = [
    {
      value: 16,
      label: 'Assigned',
      icon: ClipboardList,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      value: 14,
      label: 'Submitted',
      icon: Check,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      value: 2,
      label: 'Pending',
      icon: Clock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
  ];

  const assignments = [
    {
      title: 'Admin panel (E commerce Dashboad)',
      topics: '7 Topics',
      dueDate: 'September 10, 2026',
      status: 'APPROVED',
      hackathon: false,
    },
    {
      title: 'QUICKSERVE WMA (Batch-20)',
      topics: 'No topics',
      dueDate: 'August 30, 2026',
      status: 'NOT SUBMITTED',
      hackathon: true,
    },
    {
      title: 'E-Commerce Website (React js)',
      topics: '4 Topics',
      dueDate: 'August 17, 2026',
      status: 'APPROVED',
      hackathon: false,
    },
    {
      title: 'Furniture E-Commerce Website',
      topics: '5 Topics',
      dueDate: 'August 10, 2026',
      status: 'SUBMITTED',
      hackathon: false,
    },
    {
      title: 'MaintainIQ (Batch-20)',
      topics: 'No topics',
      dueDate: 'July 12, 2026',
      status: 'NOT SUBMITTED',
      hackathon: true,
    },
    {
      title: 'JavaScript Assignment – 25 Questions',
      topics: '8 Topics',
      dueDate: 'July 10, 2026',
      status: 'LATE SUBMITTED',
      hackathon: false,
    },
    {
      title: 'Budgetting App',
      topics: '12 Topics',
      dueDate: 'June 1, 2026',
      status: 'APPROVED',
      hackathon: false,
    },
  ];

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 mt-4">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: isWide ? 'repeat(3, minmax(0, 1fr))' : '1fr',
        }}
      >
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search assignments..."
      />
      <AssignmentsTable rows={filteredAssignments} isWide={isWide} />
    </div>
  );
}

function AttendancePage({ isWide }) {
  const [month, setMonth] = useState('Sep 2026');

  const stats = [
    {
      value: 110,
      label: 'Total Classes',
      icon: Calendar,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      value: 99,
      label: 'Present',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      value: 0,
      label: 'Leave',
      icon: XCircle,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      value: 11,
      label: 'Absent',
      icon: XCircle,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
  ];

  const records = [
    { id: 1, date: 'Wed, Sep 2, 2026', status: 'PRESENT' },
    { id: 2, date: 'Fri, Sep 4, 2026', status: 'PRESENT' },
    { id: 3, date: 'Mon, Sep 7, 2026', status: 'PRESENT' },
    { id: 4, date: 'Wed, Sep 9, 2026', status: 'PRESENT' },
    { id: 5, date: 'Fri, Sep 11, 2026', status: 'PRESENT' },
  ];

  return (
    <div className="space-y-4 mt-4">
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: isWide ? 'repeat(4, minmax(0, 1fr))' : '1fr',
        }}
      >
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          Attendance Overview
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Your attendance is good. Keep it up!
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-emerald-500 h-2.5 rounded-full"
              style={{ width: '90%' }}
            />
          </div>
          <span className="text-lg font-bold text-emerald-600">90%</span>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="relative">
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg text-sm text-gray-700 pl-3 pr-8 py-2 focus:outline-none"
          >
            <option>Sep 2026</option>
            <option>Aug 2026</option>
            <option>Jul 2026</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {isWide ? (
        <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="font-medium px-5 py-3">Class</th>
                <th className="font-medium px-5 py-3">Date</th>
                <th className="font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-4 text-blue-700 font-medium">{r.id}</td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    {r.date}
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-2">
          {records.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between text-sm gap-2 min-w-0"
            >
              <div className="min-w-0 truncate">
                <span className="text-blue-700 font-medium mr-2">#{r.id}</span>
                <span className="text-gray-700">{r.date}</span>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 rounded-full px-3 py-1 shrink-0">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImportantInfoBanner() {
  const points = [
    'Once started, quizzes must be completed in one session',
    'Switching tabs or leaving the window will be recorded',
    'Ensure you have a stable internet connection',
    'The quiz will open in fullscreen mode',
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-gray-700" />
        <h3 className="text-sm font-semibold text-gray-900">
          Important Information
        </h3>
      </div>
      <ul className="space-y-1.5 text-sm text-gray-500 list-disc pl-5">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function quizStatusBadgeClass(status) {
  return status === 'PASSED'
    ? 'bg-emerald-50 text-emerald-600'
    : 'bg-red-50 text-red-600';
}

function QuizTable({ rows, isWide }) {
  if (!isWide) {
    return (
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.title}
            className="bg-white border border-gray-100 rounded-xl p-4 text-sm space-y-2 min-w-0"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-gray-800 truncate">
                {r.title}
              </span>
              <span
                className={`text-xs font-medium rounded-full px-3 py-1 shrink-0 ${quizStatusBadgeClass(
                  r.status
                )}`}
              >
                {r.status}
              </span>
            </div>
            <div className="text-xs text-gray-400 truncate">{r.module}</div>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
              <span>
                Questions:{' '}
                <span className="text-gray-700 font-medium">
                  {r.questions}
                </span>
              </span>
              <span
                className={`px-2 py-0.5 rounded ${
                  r.attemptsWarn
                    ? 'bg-red-50 text-red-600'
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                Attempts: {r.attempts}
              </span>
              <span>
                Score:{' '}
                <span className="text-gray-700 font-medium">
                  {r.percentage}%
                </span>
              </span>
            </div>
            <button
              type="button"
              className="w-full bg-indigo-400 hover:bg-indigo-500 text-white text-xs font-medium rounded-md py-2 mt-1"
            >
              Completed
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            <th className="font-medium px-5 py-3">Title</th>
            <th className="font-medium px-5 py-3">Module</th>
            <th className="font-medium px-5 py-3">Questions</th>
            <th className="font-medium px-5 py-3">Attempts</th>
            <th className="font-medium px-5 py-3">Percentage</th>
            <th className="font-medium px-5 py-3">Status</th>
            <th className="font-medium px-5 py-3">Note</th>
            <th className="font-medium px-5 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.title} className="border-b border-gray-50 last:border-0">
              <td className="px-5 py-4 text-gray-800 font-medium whitespace-nowrap">
                {r.title}
              </td>
              <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                {r.module}
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className="inline-flex items-center justify-center w-9 h-7 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700 font-medium">
                  {r.questions}
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-medium ${
                    r.attemptsWarn
                      ? 'bg-red-50 text-red-600'
                      : 'bg-gray-50 border border-gray-200 text-gray-600'
                  }`}
                >
                  {r.attempts}
                </span>
              </td>
              <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                {r.percentage}%
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span
                  className={`text-xs font-medium rounded-full px-3 py-1 ${quizStatusBadgeClass(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </td>
              <td className="px-5 py-4 text-gray-400 whitespace-nowrap">–</td>
              <td className="px-5 py-4 whitespace-nowrap">
                <button
                  type="button"
                  className="bg-indigo-400 hover:bg-indigo-500 text-white text-xs font-medium rounded-md px-4 py-1.5"
                >
                  Completed
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuizPage({ isWide }) {
  const [search, setSearch] = useState('');

  const quizzes = [
    {
      title: 'Javascript (Quiz-4)',
      module: 'Modern Front-End Development',
      questions: 40,
      attempts: '2 / 3',
      attemptsWarn: true,
      percentage: 53,
      status: 'FAILED',
    },
    {
      title: 'Javascript (Quiz-3)',
      module: 'Modern Front-End Development',
      questions: 40,
      attempts: '1 / 3',
      attemptsWarn: false,
      percentage: 55,
      status: 'FAILED',
    },
    {
      title: 'Javascript (Quiz-2)',
      module: 'Modern Front-End Development',
      questions: 40,
      attempts: '1 / 3',
      attemptsWarn: false,
      percentage: 53,
      status: 'FAILED',
    },
    {
      title: 'Javascript (Quiz-1)',
      module: 'Modern Front-End Development',
      questions: 40,
      attempts: '1 / 3',
      attemptsWarn: false,
      percentage: 83,
      status: 'PASSED',
    },
    {
      title: 'CSS Quiz',
      module: 'Front-End Development',
      questions: 40,
      attempts: '2 / 3',
      attemptsWarn: true,
      percentage: 57,
      status: 'FAILED',
    },
    {
      title: 'HTML Quiz',
      module: 'Web Designing',
      questions: 40,
      attempts: '1 / 3',
      attemptsWarn: false,
      percentage: 88,
      status: 'PASSED',
    },
  ];

  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 mt-4">
      <ImportantInfoBanner />
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search quizzes..."
      />
      <QuizTable rows={filteredQuizzes} isWide={isWide} />
      <p className="text-center text-sm text-gray-400">
        Contact your instructor if you have any issues accessing your quizzes.
      </p>
    </div>
  );
}

const COURSE_TITLE = 'Modern Web Application Development';

function StudentDashboard({ onLogout }) {
  const isWide = useIsWide(640);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const trail =
    activeNav === 'Dashboard'
      ? ['Home', COURSE_TITLE]
      : ['Home', COURSE_TITLE, activeNav];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        active={activeNav}
        onSelect={setActiveNav}
        onLogout={onLogout}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isWide={isWide}
      />
      <div
        className="flex-1 min-w-0"
        style={{ padding: isWide ? '24px' : '16px' }}
      >
        <TopBar
          trail={trail}
          onMenuClick={() => setMobileSidebarOpen(true)}
          isWide={isWide}
        />

        {activeNav === 'Dashboard' && <DashboardHome isWide={isWide} />}
        {activeNav === 'Progress' && <ProgressPage isWide={isWide} />}
        {activeNav === 'Attendance' && <AttendancePage isWide={isWide} />}
        {activeNav === 'Assignment' && <AssignmentsPage isWide={isWide} />}
        {activeNav === 'Quiz' && <QuizPage isWide={isWide} />}
        {![
          'Dashboard',
          'Progress',
          'Attendance',
          'Assignment',
          'Quiz',
        ].includes(activeNav) && (
          <div className="mt-10 text-center text-gray-400 text-sm">
            {activeNav} page ka design abhi share nahi hua — jaise hi
            bhejenge, yahan bana denge.
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortalAuth() {
  const [screen, setScreen] = useState('select'); // 'select' | role key | 'dashboard'
  const [tab, setTab] = useState('login');
  const [loggedInRole, setLoggedInRole] = useState(null);

  const isAuthScreen = ['student', 'teacher', 'admin'].includes(screen);
  const role = isAuthScreen ? ROLES[screen] : null;

  const handleSelectRole = (key) => {
    setScreen(key);
    setTab('login');
  };

  const handleLoginSuccess = (roleKey) => {
    setLoggedInRole(roleKey);
    setScreen('dashboard');
  };

  const handleLogout = () => {
    setLoggedInRole(null);
    setScreen('select');
  };

  if (screen === 'dashboard' && loggedInRole === 'student') {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {screen === 'select' && <RoleSelect onSelect={handleSelectRole} />}

        {screen === 'dashboard' && loggedInRole && loggedInRole !== 'student' && (
          <Dashboard role={ROLES[loggedInRole]} onLogout={handleLogout} />
        )}

        {isAuthScreen && role && (
          <div>
            <Logo subtitle={role.portalName} />

            <button
              type="button"
              onClick={() => setScreen('select')}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to portal selection
            </button>

            <Tabs active={tab} onChange={setTab} />

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
              {tab === 'login' ? (
                <LoginForm
                  key={`${role.key}-login`}
                  role={role}
                  onSuccess={() => handleLoginSuccess(role.key)}
                />
              ) : (
                <SignupForm
                  key={`${role.key}-signup`}
                  role={role}
                  onSignupSuccess={() => setTab('login')}
                />
              )}
            </div>

            <RoleSwitcher current={role.key} onSwitch={handleSelectRole} />
          </div>
        )}
      </div>
    </div>
  );
}
