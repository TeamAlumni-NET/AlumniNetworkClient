import axios from 'axios'
import { config } from '../../utils/config'
import keycloak from '../../keycloak'

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
    console.log(error.message)
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
    console.log(error.message)
  }
}
