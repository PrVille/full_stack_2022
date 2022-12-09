import { useState } from 'react'

const Books = (props) => {
  const [filter, setFilter] = useState('all genres')

  if (!props.show) {
    return null
  }

  if (props.books.loading) {
    return <div>loading...</div>
  }

  const books = props.books.data.allBooks
  let genres = []
  books.forEach((book) => {
    genres.push(...book.genres)
  })
  genres = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>
      <div>in genre {filter}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            if (a.genres.includes(filter) || filter === 'all genres') {
              return (
                <tr key={a.id}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ) 
            } else return null
          })}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter('all genres')}>all genres</button>
    </div>
  )
}

export default Books
