import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUser, patchUser } from "../Services/Axios/User/UserService"

export const getCurrentUser = createAsyncThunk(
  "user/getUser",
  async() =>{
    const response = await getUser()
    return response 
  }
)
export const patchCurrentUser = createAsyncThunk(
  "user/patchUser",
  async(data)=>{
    const response = await patchUser(data)
    return response
  }
)


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentUser.fulfilled, (state, action)=>{
      state.user = action.payload
    }),
    builder.addCase(patchCurrentUser.fulfilled), (state, action)=>{
      state.user = action.payload
    }
  }
})
export const {} = userSlice.actions
export default userSlice.reducer