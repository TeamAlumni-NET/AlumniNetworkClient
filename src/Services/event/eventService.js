import axios from "axios"
import { config } from "../../utils/config"
import keycloak from "../../keycloak"

export const getEventsAsList = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      `${config.url}/api/events?userId=${userId}&target=timeline`,
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getUserEvents = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      config.url + `/api/events?userId=${userId}&target=calendar`,
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (e) {
    console.log(e.message)
  }
}
export const getUserSuggestedEvents = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(
      config.url + `/api/events/suggested/${userId}`,
      {
        headers: { Authorization: `bearer ${keycloak.token}` },
      }
    )
    return res.data
  } catch (e) {
    console.log(e.message)
  }
}
