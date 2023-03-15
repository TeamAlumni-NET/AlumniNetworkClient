import axios from "axios"
import keycloak from "../../../keycloak"
import { config } from "../../../utils/config"

export const onSignInGetOrCreateUser = async (username, token) => {
  try {
    const res = await axios.get(config.url + "users/user/" + username, {
      headers: { Authorization: `bearer ${token}` },
      username,
    })
    localStorage.setItem("currentUser", JSON.stringify(res.data.username))
    return res.data
  } catch (e) {
    if (e.response.status === 404) {
      try {
        const res = await axios.post(
          config.url + "users/",
          {
            username: keycloak.tokenParsed.preferred_username,
            firstName: keycloak.tokenParsed.given_name,
            lastName: keycloak.tokenParsed.family_name,
          },
          {
            headers: { Authorization: `bearer ${token}` },
            username,
          }
        )
        localStorage.setItem("currentUser", JSON.stringify(res.data.username))
        return await res.data
      } catch (e) {
        console.log(e.message)
      }
    } else console.log(e.message)
  }
}
