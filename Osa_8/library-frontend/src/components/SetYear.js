import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries.js'

const SetYear = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [setBirthyear, result] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [result.data]) // eslint-disable-line 

  const submit = (e) => {
    e.preventDefault()

    setBirthyear({ variables: { name, year: Number(year) } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {props.authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetYear
