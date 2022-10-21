import React from 'react'
import { useState } from 'react'
import Weather from './Weather'

const ShowButton = ({ handleClick, buttonText }) => {
    
  return (
      <button onClick={handleClick}>
        {buttonText}
      </button>
    )
}

const CountryDetails = ({ country, api_key}) => {  
  //console.log("DETAILS", country);
  


  return (
    <div>
      
      <h2> {country.name} </h2>
      <div> Capital: {country.capital} </div>
      <div> Region: {country.region} </div>
      <div> Area: {country.area} </div>
      <h4> languages: </h4>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_2}> {lang.name}</li>)}
      </ul>
      <img src={country.flags.png} alt="Flag"/>
      <Weather city={country.capital} apiKey={api_key}/>
    </div>  
  )
}

const Country = ({ country, api_key}) => {  
  //console.log(country);
  const [state, setState] = useState(false)
  
  const handleClick = () => {
    setState(!state)
  }

  const buttonText = !state ? "Show" : "Hide"

  return (
    <div>
      {country.name} <ShowButton handleClick={handleClick} buttonText={buttonText} />
      {state && <CountryDetails country={country} api_key={api_key}/>}
    </div>
  )
}

const Countries = ({ countries, filterStr, api_key }) => {
  //console.log(countries.length);
  
  if (!filterStr) {
    return ("")
  } else if (countries.length > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map(country => <Country key={country.alpha3Code} country={country} api_key={api_key} />)}
      </>
    )
  } else if (countries.length === 1) {
    return (
      <>
        <CountryDetails country={countries[0]} api_key={api_key}/>
      </>
    )
  } 
  
  return (
    <>
      No countries found with specified filter
    </>
  )
}

export default Countries