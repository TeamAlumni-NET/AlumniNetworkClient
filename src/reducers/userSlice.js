import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUser, patchUser, getUserByUsername} from "../Services/User/UserService"

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
export const getProfileUser = createAsyncThunk(
  "user/getUserByUsername",
  async (username)=>{
    const response = await getUserByUsername(username)
    return response
  }
)


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    profileUser: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCurrentUser.fulfilled, (state, action)=>{
      state.user = action.payload
    }),
    builder.addCase(patchCurrentUser.fulfilled, (state, action)=>{
      state.user = action.payload
    }),
    builder.addCase(getProfileUser.fulfilled, (state, action)=>{
      state.profileUser = action.payload
    })
  }
})
export const {} = userSlice.actions
export default userSlice.reducer