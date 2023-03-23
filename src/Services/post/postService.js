import axios from "axios"
import {config} from "../../utils/config"
import keycloak from "../../keycloak"

export const getPostForTimeline = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(`${config.url}/api/posts?userId=${userId}&target=timeline`, {
      headers: {Authorization: `bearer ${keycloak.token}`}
    })
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
export const postPost = async(data) => {
    try {
        const res = await axios.post(`${config.url}/api/posts`, data, {
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