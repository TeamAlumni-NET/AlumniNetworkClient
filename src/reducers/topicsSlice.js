import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getGroupTopicList } from "../services/group/groupsTopicsService"

export const getTopicAsList = createAsyncThunk(
  'topicList/getGroupsList',
  async () => {
    const response = await getGroupTopicList('topics')
    return response
  }
)

export const topicListSlice = createSlice({
  name: 'topicsAsList',
  initialState:{
    topics: []
  },
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(getTopicAsList.fulfilled, (state, action) => {
      state.topics = action.payload
    })
  }
})

export const {} = topicListSlice.actions
export default topicListSlice.reducer