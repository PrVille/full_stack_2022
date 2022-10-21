import React from 'react'

const Filter = ({ filterStr, handleFilterChange }) => {

    return (
        <div>
            <div>Find countries</div>
            <input value={filterStr} onChange={handleFilterChange} />
        </div>
    )
  }
  
  export default Filter