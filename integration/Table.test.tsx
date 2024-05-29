import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react'
import Table, { Props } from '@/components/tables/Table'

type MockData = {
  title: string
  description: string
  date: string
}

const props: Props<MockData> = {
  data: [
    {
      title: 'Rounded Tree',
      description: 'A tiny hidden tree',
      date: '12/20/2018',
    },
    {
      title: 'Free Soda',
      description: `It couldn't be sold`,
      date: '08/14/2013',
    },
    {
      title: 'Full Shopping',
      description: `A waste of money as well`,
      date: '02/03/2015',
    },
  ],
  children: [
    <Table.Column key="test-0" name="Title" render={(row: MockData) => row.title} />,
    <Table.Column key="test-1" name="Description" render={(row: MockData) => row.description} />,
    <Table.Column key="test-2" name="Date" render={(row: MockData) => <small>{row.date}</small>} />,
  ],
}

test('Table shows the expected table headers and rows values', () => {
  render(<Table {...props} />)

  expect(screen.getByText(/Title/)).toBeInTheDocument()
  expect(screen.getByText(/Description/)).toBeInTheDocument()
  expect(screen.getByText(/Date/)).toBeInTheDocument()

  props.data.forEach(data => {
    expect(screen.getByText(data.title)).toBeInTheDocument()
  })
})
