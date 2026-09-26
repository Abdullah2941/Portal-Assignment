const FIRST_NAMES = [
  'Sana', 'Bilal', 'Ayesha', 'Hamza', 'Fatima', 'Junaid', 'Noor', 'Omar',
  'Rabia', 'Salman', 'Iqra', 'Danish',
]
const LAST_NAMES = [
  'Khan', 'Ahmed', 'Siddiqui', 'Raza', 'Sheikh', 'Farooq', 'Baig', 'Iqbal',
  'Malik', 'Hashmi',
]
const SUBJECTS = [
  'Web Designing', 'Front-End Development', 'Modern Front-End Development',
  'Back-End Development', 'JavaScript', 'React.js', 'UI/UX Design', 'Database Systems',
]

// Placeholder roster — invented sample records for the Admin overview.
export const TEACHERS = Array.from({ length: 42 }, (_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length]
  const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]
  return {
    id: i + 1,
    name: `${first} ${last}`,
    employeeId: `SMIT-T-${String(i + 1).padStart(3, '0')}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i + 1}@smit.edu.pk`,
    subject: SUBJECTS[i % SUBJECTS.length],
    status: 'ACTIVE',
  }
})
