import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = ({ users }) => {

  return (
    <div>
      <br/>
      <h3>Users</h3>
      <br/>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
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
