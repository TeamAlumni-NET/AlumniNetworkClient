
import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../reducers/authenticationSlice"
import userReducer from "../reducers/userSlice"
/**
 * Storage for reducers
 */
export default configureStore({
  reducer: {
    username: authenticationReducer,
    user: userReducer
  }
})
