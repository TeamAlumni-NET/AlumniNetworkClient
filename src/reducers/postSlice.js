import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { getPost, getChildPosts, postPost} from "../services/post/postService"

export const getCurrentPost = createAsyncThunk(
  "post/getPost",
  async(id) =>{
    console.log(id);
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

export const postNewPost = createAsyncThunk(
  "post/postPost",
  async(data)=>{
    const response = await postPost(data)
    return response
  }
)

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    post: {},
    childPosts: [],
  },
  reducers:{},
  extraReducers: builder => {
    builder.addCase(getCurrentPost.fulfilled, (state, action) => {
      state.post = action.payload
    }),
    builder.addCase(currentChildPosts.fulfilled, (state, action) => {
      state.childPosts = action.payload
    }),
    builder.addCase(postNewPost.fulfilled), (state, action) => {
      state.post = action.payload
  }
  }

})
export const {} = postSlice.actions
export default postSlice.reducer