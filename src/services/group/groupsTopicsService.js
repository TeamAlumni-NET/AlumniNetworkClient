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

//Tarkista
export const createGroupTopic = async(data, target) => {
  console.log(data, target);
  const userId = JSON.parse(localStorage.getItem("currentUser")).id
  try {
    const res = await axios.post(`${config.url}/api/${target}?userId=${userId}`, data, {
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

