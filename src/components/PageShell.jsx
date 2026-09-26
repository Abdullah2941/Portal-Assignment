import TopBar from './TopBar.jsx'

export default function PageShell({ crumbs, children }) {
  return (
    <>
      <TopBar crumbs={crumbs} />
      <div className="p-4 sm:p-6">{children}</div>
    </>
  )
}
