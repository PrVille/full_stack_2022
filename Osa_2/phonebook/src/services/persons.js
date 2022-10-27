import axios from "axios"

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  const res = request.then(response => response.data)
  //console.log(res);
  
  return res
}

const removePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  //console.log(res);
  
  return request
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default { getAll, create, removePerson, update }