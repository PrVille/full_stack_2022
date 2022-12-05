import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = ({ users }) => {

  return (
    <div>
      <Table striped>
        <tbody>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
