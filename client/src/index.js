import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./store/store"
import { Provider } from "react-redux"
import { initialize } from './keycloak'

const root = ReactDOM.createRoot(document.getElementById('root'))

try {
  initialize()
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
  
} catch (error) {
  root.render(
    <React.StrictMode>
      <p>hups</p>
    </React.StrictMode>
  )
}
