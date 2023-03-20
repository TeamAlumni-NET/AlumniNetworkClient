import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../reducers/authenticationSlice"
import groupListReducer from "../reducers/groupsSlice"
import topicListReducer from "../reducers/topicsSlice"
import eventListReducer from "../reducers/eventsSlice"
/**
 * Storage for reducers
 */
export default configureStore({
  reducer: {
    username: authenticationReducer,
    groupList: groupListReducer,
    topicList: topicListReducer,
    eventList: eventListReducer,
  },
})
