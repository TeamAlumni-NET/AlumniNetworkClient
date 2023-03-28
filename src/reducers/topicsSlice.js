import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getGroupTopicList,createGroupTopic } from "../services/group/groupsTopicsService"

export const getTopicAsList = createAsyncThunk(
  "topicList/getTopicsList",
  async () => {
    const response = await getGroupTopicList("topics")
    return response
  }
)
export const createNewTopic = createAsyncThunk("groupList/CreateNewTopic",
  async (data) => {
    const response = await createGroupTopic(data, "topics")
    return response
  }
)

export const topicListSlice = createSlice({
  name: "topicsAsList",
  initialState: {
    topics: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopicAsList.fulfilled, (state, action) => {
      state.topics = action.payload
    }),
    builder.addCase(createNewTopic.fulfilled, (state, action) => {
      state.topics = [...state.topics, action.payload]
    })
  },
})

export const {} = topicListSlice.actions
export default topicListSlice.reducer
