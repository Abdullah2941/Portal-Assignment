export default function ResponsiveTable({ columns, rows, keyField = 'id', emptyMessage = 'No records found.' }) {
  return (
    <>
      <div className="hidden xl:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              {columns.map((col) => (
                <th key={col.key} className="font-medium px-5 py-3">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[keyField]} className="border-b border-slate-50 last:border-0">
                {columns.map((col) => (
                  <td key={col.key} className={`px-5 py-3 align-top ${col.tdClassName ?? ''}`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-8 text-center text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="xl:hidden divide-y divide-slate-50">
        {rows.map((row) => (
          <div key={row[keyField]} className="px-4 py-4 flex flex-col gap-2">
            {columns.map((col) => (
              <div key={col.key} className="flex items-start justify-between gap-3">
                <span className="text-xs text-slate-400 pt-0.5 shrink-0">{col.label}</span>
                <span className="text-sm text-slate-700 text-right min-w-0">
                  {col.render ? col.render(row) : row[col.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
        {rows.length === 0 && (
          <div className="px-4 py-8 text-center text-slate-400 text-sm">{emptyMessage}</div>
        )}
      </div>
    </>
  )
}
