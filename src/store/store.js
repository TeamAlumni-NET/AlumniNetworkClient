import { configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../reducers/authenticationSlice"
import groupListReducer from "../reducers/groupsSlice"
import topicListReducer from "../reducers/topicsSlice"
<<<<<<< HEAD
import postReducer from "../reducers/postSlice"

=======
import postListReducer from "../reducers/postsSlice"
import eventListReducer from "../reducers/eventsSlice"
import userReducer from "../reducers/userSlice"
>>>>>>> main
/**
 * Storage for reducers
 */
export default configureStore({
  reducer: {
    username: authenticationReducer,
    groupList: groupListReducer,
    topicList: topicListReducer,
<<<<<<< HEAD
    postForm: postReducer
=======
    postsList: postListReducer,
    eventList: eventListReducer,
    user: userReducer
>>>>>>> main
  }
})
