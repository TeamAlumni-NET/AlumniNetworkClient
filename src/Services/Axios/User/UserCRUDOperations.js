import axios from "axios"
import keycloak from "../../../keycloak"

export const onSignInGetOrCreateUser = async (username, token) => {
  try {
    const res = await axios.get(
      "https://localhost:44378/api/users/user/" + username,
      {
        headers: { Authorization: `bearer ${token}` },
        username,
      }
    )
    return res.data
  } catch (e) {
    if (e.response.status === 404) {
      try {
        const res = await axios.post(
          "https://localhost:44378/api/users/",
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
        return await res.data
      } catch (e) {
        console.log(e.message)
      }
    } else console.log(e.message)
  }
}
