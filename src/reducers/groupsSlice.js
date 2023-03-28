import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getGroupTopicList, createGroupTopic} from "../services/group/groupsTopicsService"

export const getGroupAsList = createAsyncThunk(
  "groupList/getGroupsList",
  async () => {
    const response = await getGroupTopicList("groups")
    return response
  }
)

export const createNewGroup = createAsyncThunk("groupList/CreateNewGroup",
  async (data) => {
    const response = await createGroupTopic(data, "groups")
    return response
  }
)

export const groupListSlice = createSlice({
  name: "groupsAsList",
  initialState: {
    groups: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupAsList.fulfilled, (state, action) => {
      state.groups = action.payload
    }),
    builder.addCase(createNewGroup.fulfilled, (state, action) => {
      state.groups = [...state.groups, action.payload]
    })
  },
})




export const {} = groupListSlice.actions
export default groupListSlice.reducer
