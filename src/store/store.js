import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../reducers/authenticationSlice"
import groupListReducer from "../reducers/groupsSlice"
import topicListReducer from "../reducers/topicsSlice"
import postListReducer from "../reducers/postsSlice"
import eventListReducer from "../reducers/eventsSlice"
import userReducer from "../reducers/userSlice"
import currentPageReducer from "../reducers/currentPageSlice"
/**
 * Storage for reducers
 */
export default configureStore({
  reducer: {
    username: authenticationReducer,
    groupList: groupListReducer,
    topicList: topicListReducer,
    user: userReducer,
    postsList: postListReducer,
    eventList: eventListReducer,
    currentPage: currentPageReducer,
  }
})
