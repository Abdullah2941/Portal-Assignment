# SMIT Portal

React project for the SMIT (Saylani Mass IT Training) Student / Teacher / Admin
portal — the "Select Portal" screen plus a shared Login / Create Password page
for all three roles.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## How it's built

- **React Router** (`react-router-dom`) handles navigation between the portal
  selection screen, each role's auth page, and the post-login dashboard.
- **`src/hooks/useLocalStorage.js`** — a generic hook that keeps a piece of
  state in sync with `localStorage`.
- **`src/hooks/useAuth.jsx`** — a context + hook built on top of
  `useLocalStorage`. It stores registered users (`smit_users`) and the current
  session (`smit_session`) in `localStorage`, and exposes `register`, `login`,
  and `logout`.
- **`src/components/`** — reusable pieces: `Logo`, `PortalOptionCard`,
  `FormField` (labeled input with a show/hide toggle for passwords), `Tabs`.
- **`src/pages/`**
  - `PortalSelect.jsx` — the "Select Portal" screen (Student / Teacher / Admin).
  - `AuthPage.jsx` — **one** component reused for all three roles (just pass
    `role="student"` / `"teacher"` / `"admin"`), with Login and Create
    Password tabs, matching the screenshots.
  - `Dashboard.jsx` — placeholder screen shown after a successful login, one
    per role, ready to be swapped for the real dashboard designs.

## Try it

1. Open the Student Portal → **Create Password** tab → enter any CNIC, DOB and
   password → Submit.
2. Switch to the **Login** tab → enter the same CNIC and password → Login.
3. You'll land on the placeholder Student dashboard. Logout returns you to
   portal selection.

Teacher and Admin work the same way — each role's accounts are kept separate
in `localStorage`.

## Note on passwords

Accounts are stored in the browser's `localStorage` as plain JSON for this
demo/training project, so there's no real backend yet. Do **not** reuse this
pattern for a production app — passwords should be hashed and handled by a
real server before this becomes anything other than a demo.

## Next steps

The dashboard, Progress, Attendance, Assignment, and Quiz pages already
discussed can be added under `src/pages/` and linked from a sidebar
component, reusing `Dashboard.jsx` as the entry point per role.
