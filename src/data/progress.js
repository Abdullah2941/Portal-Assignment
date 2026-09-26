import { STUDENTS } from './students.js'

export const SELF_ID = 'self'

const BASE_MODULES = [
  { id: 'web-design', name: 'Web Designing', total: 20, done: 20 },
  { id: 'frontend', name: 'Front-End Development', total: 31, done: 26 },
  { id: 'modern-frontend', name: 'Modern Front-End Development', total: 14, done: 10 },
  { id: 'backend', name: 'Back-End Development', total: 16, done: 0 },
]

function buildModules(scaleFn) {
  return BASE_MODULES.map((m) => {
    const done = scaleFn ? scaleFn(m) : m.done
    const percent = Math.round((done / m.total) * 100)
    return { ...m, done, percent, complete: done === m.total }
  })
}

const SELF_MODULES = buildModules()
const selfTopicsDone = SELF_MODULES.reduce((s, m) => s + m.done, 0)
const selfTopicsTotal = SELF_MODULES.reduce((s, m) => s + m.total, 0)

const SCHEDULE = ['Mon 01:00 PM - 03:00 PM', 'Wed 01:00 PM - 03:00 PM', 'Fri 01:00 PM - 03:00 PM']

export const SELF_PROGRESS = {
  id: SELF_ID,
  name: 'S Muzammil Javed',
  campus: 'Zaitoon Ashraf IT Park',
  batch: 20,
  schedule: SCHEDULE,
  topicsDone: selfTopicsDone,
  topicsTotal: selfTopicsTotal,
  overall: Math.round((selfTopicsDone / selfTopicsTotal) * 100),
  modules: SELF_MODULES,
}

// Returns SELF_PROGRESS for "Only My Progress", or a deterministic
// pseudo-progress record for any other student id, so the teacher's
// "Compare Progress" dropdown has something plausible to show per student.
export function progressForId(id) {
  if (id === SELF_ID) return SELF_PROGRESS

  const student = STUDENTS.find((s) => s.id === Number(id))
  if (!student) return SELF_PROGRESS

  const pct = 35 + ((student.id * 47) % 60) // spreads roughly 35–94%
  const modules = buildModules((m) => Math.min(m.total, Math.round((m.total * pct) / 100)))
  const topicsDone = modules.reduce((s, m) => s + m.done, 0)
  const topicsTotal = modules.reduce((s, m) => s + m.total, 0)

  return {
    id: student.id,
    name: student.name,
    campus: 'Zaitoon Ashraf IT Park',
    batch: 20,
    schedule: SCHEDULE,
    topicsDone,
    topicsTotal,
    overall: Math.round((topicsDone / topicsTotal) * 100),
    modules,
  }
}
