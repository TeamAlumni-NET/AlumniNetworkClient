import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getGroups } from "../Services/Axios/group/groupsService"

export const getGroupAsList = createAsyncThunk(
  'grouplist/getGroups',
  async () => {
    const response = await getGroups()
    console.log(response)
  }
)

export const groupListSlice = createSlice({
  name: 'groupsAsList',
  initialState:{
    groups: []
  },
  reducers: {
  },
  extraReducers: {
    [getGroups.fulfilled]: (state, action) => {
      console.log(action.payload)
    }
  }
})

export const {} = groupListSlice.actions
export default groupListSlice.reducer