
import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../reducers/authenticationSlice"
import groupListReducer from "../reducers/groupsSlice"

/**
 * Storage for reducers
 */
export default configureStore({
  reducer: {
    username: authenticationReducer,
    groupList: groupListReducer
  }
})