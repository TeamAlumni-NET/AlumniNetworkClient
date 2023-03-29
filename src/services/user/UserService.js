import axios from 'axios'
import { config } from '../../utils/config'
import keycloak from '../../keycloak'
import { errorHandler } from '../../utils/simpleErrorHandler'

export const getUser = async () => {
  try {
    const id = JSON.parse(localStorage.getItem('currentUser')).id
    const res = await axios.get(`${config.url}/api/users/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`
      }
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }

}

export const patchUser = async(body) => {
  try {
    const id = JSON.parse(localStorage.getItem('currentUser')).id
    const res = await axios.patch(`${config.url}/api/users/${id}`, body, {
      headers: {
        Authorization: `bearer ${keycloak.token}`,
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}

export const getUserByUsername = async (username) =>{
  try {
    const res = await axios.get(`${config.url}/api/users/user/${username}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`
      }
    })
    return res.data
  } catch (error) {
    errorHandler(error)
  }
}