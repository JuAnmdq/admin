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
    return <th>{name}</th>
  }

  return <td className="p-2 text-center">{render(row as T)}</td>
}

export type Props<T> = {
  data: T[]
  children: React.ReactElement[]
}

const Table = <T extends object>({ data, children }: Props<T>) => (
  <table>
    <thead>
      <tr>
        {React.Children.map(children, child =>
          React.cloneElement(child, { header: true })
        )}
      </tr>
    </thead>
    <tbody>
      {data.map((row: unknown, index: number) => (
        <tr key={index}>
          {React.Children.map(children, child =>
            React.cloneElement(child, { row })
          )}
        </tr>
      ))}
    </tbody>
  </table>
)

Table.Column = TableColumn

export default Table
