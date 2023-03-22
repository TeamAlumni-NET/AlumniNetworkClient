import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { postPost } from "../Services/post/postService"

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
        post: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(postNewPost.fulfilled), (state, action) => {
            state.post = action.payload
        }
    }
})
export const {} = postSlice.actions
export default postSlice.reducer