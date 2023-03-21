import axios from 'axios'
import { config } from '../../utils/config'
import keycloak from '../../keycloak'

export const getPost = async id => {
  try {
    const res = await axios.get(`${config.url}/api/posts/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`
      }
    })
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getChildPosts = async id =>{
  try {
    const res = await axios.get(`${config.url}/api/posts/thread/${id}`, {
      headers: {
        Authorization: `bearer ${keycloak.token}`
      }
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
  }
}