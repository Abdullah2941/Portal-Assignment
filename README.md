# SMIT Portal (React + Vite + Tailwind)

Student / Teacher / Admin portal — login, signup, and the student dashboard
pages (Dashboard, Progress, Attendance, Assignment, Quiz).

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — upload that folder to any static host (Vercel,
Netlify, GitHub Pages, your own server, etc.).

## Notes

- Signup accounts are stored in the browser's `localStorage`, keyed by role
  + CNIC/Email. This is a stand-in for a real backend — swap `saveAccount`
  and `getAccount` in `src/App.jsx` for real API calls when the backend is
  ready.
- Icons come from `lucide-react`, styling from Tailwind CSS.
- Everything lives in `src/App.jsx` for now (one file, many components) —
  ask to have it split into separate component files if the project grows.
