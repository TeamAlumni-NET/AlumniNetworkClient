import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getGroupPosts,
  getPostForTimeline,
  getTopicPosts,
  getUserDashboardPosts,
} from "../services/post/postService"

export const getPostsAsList = createAsyncThunk(
  "timelineList/getPostsByTimeline",
  async () => {
    const response = await getPostForTimeline()
    return response
  }
)
export const getGroupPostsList = createAsyncThunk(
  "postList/getGroupPostsList",
  async (id) => {
    const response = await getGroupPosts(id)
    return response
  }
)
export const getTopicPostsList = createAsyncThunk(
  "postTopicList/getTopicPostsList",
  async (id) => {
    const response = await getTopicPosts(id)
    return response
  }
)
export const getDashboardPostsList = createAsyncThunk(
  "postDashboardList/getDashboardPostsList",
  async () => {
    const response = await getUserDashboardPosts()
    return response
  }
)

export const postListSlice = createSlice({
  name: "posts",
  initialState: {
    postsTimeline: [],
    postsGroup: [],
    postsTopic: [],
    postsDashboard: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsAsList.fulfilled, (state, action) => {
      state.postsTimeline = action.payload
    }),
      builder.addCase(getGroupPostsList.fulfilled, (state, action) => {
        state.postsGroup = action.payload
      }),
      builder.addCase(getTopicPostsList.fulfilled, (state, action) => {
        state.postsTopic = action.payload
      }),
      builder.addCase(getDashboardPostsList.fulfilled, (state, action) => {
        state.postsDashboard = action.payload ? action.payload : []
      })
  },
})

export const {} = postListSlice.actions
export default postListSlice.reducer
