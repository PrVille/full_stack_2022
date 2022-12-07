import SetYear from './SetYear.js'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  if (props.authors.loading ) {
    return <div>loading...</div>
  }

  const authors = props.authors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetYear authors={authors} setError={props.setError}/>

    </div>
  )
}

export default Authors
