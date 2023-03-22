import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPostForTimeline } from "../services/post/postService"

export const getGroupAsList = createAsyncThunk(
  "timelineList/getPostsByTimeline",
  async () => {
    const response = await getPostForTimeline()
    return response
  }
)

export const groupListSlice = createSlice({
  name: "posts",
  initialState: {
    postsTimeline: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupAsList.fulfilled, (state, action) => {
      state.postsTimeline = action.payload
    })
  },
})

export const {} = groupListSlice.actions
export default groupListSlice.reducer
