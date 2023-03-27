import axios from "axios"
import { config } from "../../utils/config"
import keycloak from "../../keycloak"

export const getGroupTopicList = async (target) => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      `${config.url}/api/${target}/?userId=${userId}`,
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
export const addUserToGroupTopic = async (target, id) => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.post(
      `${config.url}/api/${target}/${id}/join?userId=${userId}`,
      {},
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
export const RevomeUserToGroupTopic = async (target, id) => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.patch(
      `${config.url}/api/${target}/${id}/leave?userId=${userId}`,
      {},
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
