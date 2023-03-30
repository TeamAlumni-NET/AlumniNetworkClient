import axios from 'axios'
import { config } from '../../utils/config'
import keycloak from '../../keycloak'
import { errorHandler } from '../../utils/simpleErrorHandler'

/**
 * Gets current user data from api
 * @returns {Object} response from api
 */
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

/**
 * Patch new user data to api
 * @param {object} body 
 * @returns {Object} response from api
 */
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

/**
 * Gets selected user's data by it's username from api
 * @param {string} username selected user
 * @returns {Object} response from api
 */
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