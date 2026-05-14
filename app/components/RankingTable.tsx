type Row = {
  nombre: string
  sub?: string
  correctas: number
  total: number
  highlight?: boolean
}

export default function RankingTable({ rows, emptyMessage = 'Sin datos todavía.' }: {
  rows: Row[]
  emptyMessage?: string
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-gray-400">{emptyMessage}</p>
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-100">
          <th className="text-left py-2 text-gray-400 font-medium w-10">#</th>
          <th className="text-left py-2 text-gray-400 font-medium">Nombre</th>
          <th className="text-right py-2 text-gray-400 font-medium">Correctas</th>
          <th className="text-right py-2 text-gray-400 font-medium">Total</th>
          <th className="text-right py-2 text-gray-400 font-medium">Precisión</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const precision = row.total > 0 ? Math.round((row.correctas / row.total) * 100) : 0
          return (
            <tr
              key={i}
              className={`border-b border-gray-50 last:border-0 ${row.highlight ? 'bg-red-50' : ''}`}
            >
              <td className="py-3 text-gray-400 font-medium">{i + 1}</td>
              <td className="py-3">
                <p className={`font-medium ${row.highlight ? 'text-red-700' : 'text-gray-900'}`}>
                  {row.nombre}
                </p>
                {row.sub && <p className="text-xs text-gray-400 mt-0.5">{row.sub}</p>}
              </td>
              <td className="py-3 text-right text-green-600 font-semibold">{row.correctas}</td>
              <td className="py-3 text-right text-gray-500">{row.total}</td>
              <td className="py-3 text-right text-gray-700 font-medium">{precision}%</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
