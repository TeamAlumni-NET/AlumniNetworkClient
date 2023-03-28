import Keycloak from "keycloak-js"

let keycloak 

//eslint-disable-next-line
if(process.env.NODE_ENV === "production"){
  keycloak = new Keycloak("/keycloakproduct.json")
}else{
// NB! Leave the / or the relative path will use the Router path
  keycloak = new Keycloak("/keycloak.json")
}
/**
 * Initialize Keycloak and silently checking for an existing login.
 * @description Should be called before render() of app.
 * @returns { Promise<void> } Promise
 */
export const initialize = () => {
  const config = {
    checkLoginIframe: false,
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  }
  return keycloak.init(config)
}

/** @type { Keycloak } keycloak */
export default keycloak
