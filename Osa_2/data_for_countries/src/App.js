import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterStr, setNewFilterStr] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  const hook = () => {
    axios
      .get(`https://restcountries.com/v2/all?fields=name,capital,region,languages,flags,area,alpha3Code,latlng`)
      .then(response => {
        setCountries(response.data);
      })
  }
  
  useEffect(hook, [])
  //console.log(countries);
  

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilterStr(event.target.value)
  }

  const filteredCountries = countries.filter(country => country.name.includes(filterStr) || country.name.toLowerCase().includes(filterStr))
  
  return (
    <div>
      <Filter filterStr={filterStr} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} filterStr={filterStr} api_key={api_key} />
    </div>
  )
}

export default App