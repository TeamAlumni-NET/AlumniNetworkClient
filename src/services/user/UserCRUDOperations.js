import axios from "axios"
import keycloak from "../../keycloak"
import { config } from "../../utils/config"

/**
 * Gets logged user's data in or posts new user to api
 * @param {rString} username username
 * @param {String} token token
 * @returns {Object} response from api
 */
export const onSignInGetOrCreateUser = async (username, token) => {
  const endpoint = "/api/users/user/" + username
  const createEndpoint = "/api/users/"
  try {
    const res = await axios.get(config.url + endpoint, {
      headers: { Authorization: `bearer ${token}` },
      username,
    })
    const currentUser = {
      id: res.data.id,
      userName: res.data.username,
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    return res.data
  } catch (e) {
    if (e.response.status === 404) {
      try {
        const res = await axios.post(
          config.url + createEndpoint,
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
        const currentUser = {
          id: res.data.id,
          userName: res.data.username,
        }

        localStorage.setItem("currentUser", JSON.stringify(currentUser))
        return await res.data
      } catch (e) {
        console.log(e.message)
      }
    } else console.log(e.message)
  }
}
