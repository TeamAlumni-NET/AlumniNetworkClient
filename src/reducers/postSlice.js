import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPost, getChildPosts, getPostUser } from "../services/post/postService"

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


export const getcurrentPostUser = createAsyncThunk(
  "post/getPostuser",
  async(id)=>{
    const response = await getPostUser(id)
    return response
  }
)




export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    childPosts: [],
    postUser: [],
  },
  reducers:{},
  extraReducers: builder => {
    builder.addCase(getCurrentPost.fulfilled, (state, action) => {
      state.post = action.payload
    }),
    builder.addCase(currentChildPosts.fulfilled, (state, action) => {
      state.childPosts = action.payload
    }),
    builder.addCase(getcurrentPostUser.fulfilled, (state, action) =>{
      state.postUser = action.payload
    })

  }
})
export const {} = postSlice.actions
export default postSlice.reducer