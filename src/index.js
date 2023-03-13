import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./store/store"
import { Provider } from "react-redux"
import { initialize } from "./keycloak"
import keycloak from "./keycloak"
import { ReactKeycloakProvider } from "@react-keycloak/web"

const root = ReactDOM.createRoot(document.getElementById("root"))

try {
  initialize()
  root.render(
    <ReactKeycloakProvider authClient={keycloak}>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </ReactKeycloakProvider>
  )
} catch (error) {
  root.render(
    <React.StrictMode>
      <p>hups</p>
    </React.StrictMode>
  )
}
