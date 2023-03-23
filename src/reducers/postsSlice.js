import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getGroupPosts, getPostByTimeline } from "../services/post/postService"

export const getPostsAsList = createAsyncThunk(
  "timelineList/getPostsByTimeline",
  async () => {
    const response = await getPostByTimeline()
    return response
  }
)
export const getGroupPostsList = createAsyncThunk(
  "groupList/getGroupsList",
  async (id) => {
    const response = await getGroupPosts(id)
    return response
  }
)

export const postListSlice = createSlice({
  name: "posts",
  initialState: {
    postsTimeline: [],
    postsGroup: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsAsList.fulfilled, (state, action) => {
      state.postsTimeline = action.payload
    }),
    builder.addCase(getGroupPostsList.fulfilled, (state, action) => {
      state.postsGroup = action.payload
    })
  },
})

export const {} = postListSlice.actions
export default postListSlice.reducer
