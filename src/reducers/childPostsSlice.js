// import { create } from "@mui/material/styles/createTransitions";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getChildPosts } from "../Services/Post/PostService";

// export const currentChildPosts = createAsyncThunk(
//   "childPosts/getChildPosts",
//   async(id)=>{
//     const response = await getChildPosts(id)
//     return response
//   }
// )

// export const childPostsSlice = createSlice({
//   name: "posts",
//   initialState:{
//     childPosts:[]
//   },
//   reducers:{},
//   extraReducers: builder => {
//     builder.addCase(currentChildPosts.fulfilled, (state, action) => {
//       state.childPosts = action.payload
//     })
//   }
// })
// export const {} = childPostsSlice.actions
// export default childPostsSlice.reducer