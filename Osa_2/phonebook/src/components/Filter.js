import React from 'react'

const Filter = ({ filterStr, handleFilterChange }) => {

    return (
        <div>
            filter shown with
            <br></br>
            <input value={filterStr} onChange={handleFilterChange} />
        </div>
    )
  }
  
  export default Filter