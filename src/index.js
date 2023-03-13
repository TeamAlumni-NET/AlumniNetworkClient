import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./store/store"
import { Provider } from "react-redux"
import { initialize } from "./keycloak"
import keycloak from "./keycloak"

const root = ReactDOM.createRoot(document.getElementById("root"))

// Initialize Keycloak
initialize()
  .then(() => {
    // If No Keycloak Error occurred - Display the App
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    )
  })
  .catch(() => {
    root.render(
      <React.StrictMode>
        <p>Could Not Connect To Keycloak.</p>
      </React.StrictMode>
    )
  })
