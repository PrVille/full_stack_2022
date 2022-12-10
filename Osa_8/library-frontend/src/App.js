import { useState } from 'react'
import {
  useQuery,
  useSubscription,
  useApolloClient,
} from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm.js'
import Recommended from './components/Recommended.js'
import { ALL_BOOKS, ALL_AUTHORS, USER, BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  const user = useQuery(USER)
  const client = useApolloClient() 

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  const loginView = () => {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} setPage={setPage} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Notify errorMessage={errorMessage} />

      {page === 'login' && loginView()}

      <Authors
        show={page === 'authors'}
        authors={authors}
        token={token}
        setError={notify}
      />

      <Books show={page === 'books'} books={books} />

      <Recommended show={page === 'recommend'} books={books} user={user} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  )
}

export default App
