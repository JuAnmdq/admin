import { User } from '@/types/User'
import Table from '../Table'

type Props = {
  users: User[]
}

const UserTable: React.FC<Props> = ({ users }) => (
  <Table data={users}>
    <Table.Column name="Name" render={(row: User) => row.name} />
    <Table.Column name="Email" render={(row: User) => row.email} />
    <Table.Column name="Username" render={(row: User) => row.username} />
  </Table>
)

export default UserTable
