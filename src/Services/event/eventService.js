import axios from "axios"
import keycloak from "../../keycloak"
import { config } from "../../utils/config"

export const getUserEvents = async () => {
  try {
    const id = JSON.parse(localStorage.getItem("currentUser")).id
    const res = await axios.get(config.url + "/api/events/user/" + id, {
      headers: { Authorization: `bearer ${keycloak.token}` },
    })
    return res.data
  } catch (e) {
    console.log(e.message)
  }
}
