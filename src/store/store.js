
import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../reducers/authenticationSlice"

/**
 * Storage for reducers
 */
export default configureStore({
  reducer: {
    username: authenticationReducer
  }
})