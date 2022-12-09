const Recommended = (props) => {
  if (!props.show || !props.user) {
    return null
  }

  if (props.books.loading) {
    return <div>loading...</div>
  }

  const books = props.books.data.allBooks
  const booksToShow = books.filter((book) =>
    book.genres.includes(props.user.data.me.favouriteGenre)
  )

  const booksView = () => {
    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2>recommendations for {props.user.data.me.username}</h2>
      <div>
        books in your favourite genre {props.user.data.me.favouriteGenre}
      </div>
      {booksToShow.length === 0 && <div>No recommendations</div>}
      {booksToShow.length > 0 && booksView()}
    </div>
  )
}

export default Recommended
