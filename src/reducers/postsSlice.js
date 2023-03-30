import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import {
  getGroupPosts,
  getPostForTimeline,
  getTopicPosts,
  getUserDashboardPosts,
  getPost,
  getChildPosts,
  postPost,
  patchPost,
} from "../services/post/postService"

export const getPostsAsList = createAsyncThunk(
  "timelineList/getPostsByTimeline",
  async () => {
    const response = await getPostForTimeline()
    return response
  }
)
export const getGroupPostsList = createAsyncThunk(
  "postList/getGroupPostsList",
  async (id) => {
    const response = await getGroupPosts(id)
    return response
  }
)
export const getTopicPostsList = createAsyncThunk(
  "postTopicList/getTopicPostsList",
  async (id) => {
    const response = await getTopicPosts(id)
    return response
  }
)
export const getDashboardPostsList = createAsyncThunk(
  "postDashboardList/getDashboardPostsList",
  async (id) => {
    const response = await getUserDashboardPosts(id)
    return response
  }
)

export const getCurrentPost = createAsyncThunk("post/getPost", async (id) => {
  const response = await getPost(id)
  return response
})

export const currentChildPosts = createAsyncThunk(
  "post/getChildPosts",
  async (id) => {
    const response = await getChildPosts(id)
    return response
  }
)

export const postNewPost = createAsyncThunk(
  "post/postPost",
  async ({ data, targetUser, targetGroup, targetTopic }) => {
    let response = await postPost(data)
    if (targetUser !== undefined)
      response = Object.assign(response, { targetUser: targetUser })
    if (targetGroup !== undefined)
      response = Object.assign(response, { group: targetGroup })
    if (targetTopic !== undefined)
      response = Object.assign(response, { topic: targetTopic })
    return response
  }
)

export const editPost = createAsyncThunk("post/editPost", async (edit) => {
  const response = await patchPost(edit)
  return response
})

export const postListSlice = createSlice({
  name: "posts",
  initialState: {
    post: {},
    childPosts: [],
    postsTimeline: [],
    postsGroup: [],
    postsTopic: [],
    postsDashboard: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentPost.fulfilled, (state, action) => {
      state.post = action.payload
    }),
      builder.addCase(currentChildPosts.fulfilled, (state, action) => {
        state.childPosts = action.payload
      }),
      builder.addCase(postNewPost.fulfilled, (state, action) => {
        if (!action.payload.title) {
          state.childPosts = [...state.childPosts, action.payload]
        } else {
          if (action.payload.group !== null) {
            state.postsGroup.push(action.payload)
            state.postsTimeline.push(action.payload)
          }
          if (action.payload.topic !== null) {
            state.postsTopic.push(action.payload)
            state.postsTimeline.push(action.payload)
          }
        }
      })
    builder.addCase(getPostsAsList.fulfilled, (state, action) => {
      state.postsTimeline = action.payload
    }),
      builder.addCase(getGroupPostsList.fulfilled, (state, action) => {
        state.postsGroup = action.payload
      }),
      builder.addCase(getTopicPostsList.fulfilled, (state, action) => {
        state.postsTopic = action.payload
      }),
      builder.addCase(getDashboardPostsList.fulfilled, (state, action) => {
        state.postsDashboard = action.payload ? action.payload : []
      })
    builder.addCase(editPost.fulfilled, (state, action) => {
      if (state.post.id === action.payload.id) {
        state.post.title = action.payload.title
        state.post.content = action.payload.content
      }
      if (state.childPosts.length > 0) {
        const index = current(state.childPosts).findIndex(
          (post) => post.id === action.payload.id
        )
        if (state.childPosts[index] !== undefined)
          state.childPosts[index].content = action.payload.content
      }
    })
  },
})

export const {} = postListSlice.actions
export default postListSlice.reducer
