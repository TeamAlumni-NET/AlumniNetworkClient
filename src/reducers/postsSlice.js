import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getGroupPosts,
  getPostForTimeline,
  getTopicPosts,
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

export const postListSlice = createSlice({
  name: "posts",
  initialState: {
    postsTimeline: [],
    postsGroup: [],
    postsTopic: [],
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
      })
  },
})

export const {} = postListSlice.actions
export default postListSlice.reducer
