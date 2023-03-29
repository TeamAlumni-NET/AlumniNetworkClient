import keycloak from "../keycloak"
import { onSignInGetOrCreateUser } from "../services/user/UserCRUDOperations"

export const errorHandler = (error) =>{
  if (error.response.status === 401) {
    const get = async () => {
      console.log("Trying to get keycloak connegtion again...")
      await onSignInGetOrCreateUser(
        keycloak.tokenParsed.preferred_username,
        keycloak.token
      )
    }
    get()
    console.log("Connection to keycloak failed. \nTry to reload page.")
  }
  console.log(error.message)
}