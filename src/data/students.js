const FIRST_NAMES = [
  'Ahmed', 'Ayesha', 'Bilal', 'Sana', 'Danish', 'Fatima', 'Hamza', 'Iqra',
  'Junaid', 'Kiran', 'Moiz', 'Noor', 'Omar', 'Rabia', 'Salman',
]
const LAST_NAMES = [
  'Khan', 'Ali', 'Siddiqui', 'Raza', 'Sheikh', 'Farooq', 'Baig', 'Iqbal',
  'Abbasi', 'Malik', 'Hashmi', 'Qureshi', 'Chaudhry', 'Rizvi',
]

// Placeholder roster — the screenshots' real names/roll numbers/emails were
// covered by an annotation, so these are invented sample records shared by
// every teacher-facing tab that needs a student list.
export const STUDENTS = Array.from({ length: 201 }, (_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length]
  const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]
  return {
    id: i + 1,
    name: `${first} ${last}`,
    roll: `SMIT-WD-${String(i + 1).padStart(4, '0')}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i + 1}@smit.edu.pk`,
    status: 'ENROLLED',
  }
})

export function initials(name) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}
