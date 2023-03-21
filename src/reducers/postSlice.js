import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPost, getChildPosts } from "../Services/Post/PostService"

export const getCurrentPost = createAsyncThunk(
  "post/getPost",
  async(id) =>{
    const response = await getPost(id)
    return response
  }
)

export const currentChildPosts = createAsyncThunk(
  "post/getChildPosts",
  async(id)=>{
    const response = await getChildPosts(id)
    return response
  }
)


export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    childPosts: []
  },
  reducers:{},
  extraReducers: builder => {
    builder.addCase(getCurrentPost.fulfilled, (state, action) => {
      state.post = action.payload
    }),
    builder.addCase(currentChildPosts.fulfilled, (state, action) => {
      state.childPosts = action.payload
    })

  }
})
export const {} = postSlice.actions
export default postSlice.reducer