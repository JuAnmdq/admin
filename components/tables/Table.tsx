import React from 'react'

type TableColumnProps<T> = {
  render: (row: T) => React.ReactElement | string | number
  name?: string
  header?: boolean
  row?: T
}

const TableColumn = <T extends object>({
  render,
  name = '',
  header = false,
  row,
}: TableColumnProps<T>) => {
  if (header) {
    return <th className="px-6 py-4 text-xs font-medium text-gray-400">{name}</th>
  }

  return <td className="p-2 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{render(row as T)}</td>
}

export type Props<T> = {
  data: T[]
  children: React.ReactElement[]
}

const Table = <T extends object>({ data, children }: Props<T>) => (
  <div className="relative overflow-x-auto shadow-md rounded-t-lg border-gray-300">
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-gray-700 border-2 border-gray-100">
        <tr>
          {React.Children.map(children, child =>
            React.cloneElement(child, { header: true })
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row: unknown, index: number) => (
          <tr key={index} className="bg-white border-b hover:bg-gray-50">
            {React.Children.map(children, child =>
              React.cloneElement(child, { row })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

Table.Column = TableColumn

export default Table
