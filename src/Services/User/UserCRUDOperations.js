import axios from "axios"
import keycloak from "../../keycloak"
import { config } from "../../utils/config"

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
<<<<<<< HEAD
      userName: res.data.username,
=======
      userName: res.data.username
>>>>>>> 793241caf66942007df3a6ca254e6df53748b62d
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
