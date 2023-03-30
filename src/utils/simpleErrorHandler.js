import keycloak from "../keycloak"
import { onSignInGetOrCreateUser } from "../services/user/UserCRUDOperations"

/**
 * Displays error messages into console.log
 * @param {error} error error message
 * @returns {void}
 */
export const errorHandler = (error) =>{
  console.log(error.message);
  if (error.response.status === 401) {
    /**
     * Displays error message
     * @returns {void}
     */
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