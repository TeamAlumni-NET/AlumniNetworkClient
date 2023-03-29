import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import {
  getUserEvents,
  getEventsAsList,
  getUserSuggestedEvents,
  postEvent,
  getTopicEvents,
  getGroupEvents,
  getEventById,
  getEventChildPosts,
} from "../services/event/eventService"
import { patchPost, postPost } from "../services/post/postService"

export const getEventsList = createAsyncThunk(
  "eventList/getUserEvents",
  async () => {
    const response = await getUserEvents()
    return response
  }
)

export const getTopicEventsList = createAsyncThunk(
  "eventList/getTopicEventsList",
  async (id) => {
    const response = await getTopicEvents(id)
    return response
  }
)

export const getGroupEventsList = createAsyncThunk(
  "eventList/getGroupEventsList",
  async (id) => {
    const response = await getGroupEvents(id)
    return response
  }
)

export const getTimelineEventsList = createAsyncThunk(
  "eventList/getTimelineEvents",
  async () => {
    const response = await getEventsAsList()
    return response
  }
)

export const getUserSuggestedEventsList = createAsyncThunk(
  "eventList/getUserSuggestedEvents",
  async () => {
    const response = await getUserSuggestedEvents()
    return response
  }
)

export const getCurrentEventById = createAsyncThunk(
  "eventList/getEventById",
  async (id) => {
    const response = await getEventById(id)
    return response
  }
)

export const postNewEvent = createAsyncThunk(
  "event/postEvent",
  async (data) => {
    const response = await postEvent(data)
    return response
  }
)

export const getCurrentEventChilds = createAsyncThunk(
  "eventList/getEventChildPosts",
  async (id) => {
    const response = await getEventChildPosts(id)
    return response
  }
)

export const commentOnEvent = createAsyncThunk(
  "event/commentOnEvent",
  async ({ data, targetUser }) => {
    let response = await postPost(data)
    if (targetUser !== undefined)
      response = Object.assign(response, { targetUser: targetUser })
    return response
  }
)

export const editComment = createAsyncThunk(
  "event/editComment",
  async (edit) => {
    const response = await patchPost(edit)
    return response
  }
)

export const eventListSlice = createSlice({
  name: "events",
  initialState: {
    userEvents: [],
    timelineEvents: [],
    userSuggestedEvents: [],
    topicEvents: [],
    groupEvents: [],
    currentEvent: {},
    eventChildPosts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventsList.fulfilled, (state, action) => {
      state.userEvents = action.payload
    }),
      builder.addCase(getTimelineEventsList.fulfilled, (state, action) => {
        state.timelineEvents = action.payload
      }),
      builder.addCase(getUserSuggestedEventsList.fulfilled, (state, action) => {
        state.userSuggestedEvents = action.payload
      }),
      builder.addCase(postNewEvent.fulfilled, (state, action) => {
        state.timelineEvents = [...state.timelineEvents, action.payload]
        state.post = action.payload
      }),
      builder.addCase(getTopicEventsList.fulfilled, (state, action) => {
        state.topicEvents = action.payload
      }),
      builder.addCase(getGroupEventsList.fulfilled, (state, action) => {
        state.groupEvents = action.payload
      }),
      builder.addCase(getCurrentEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload
      }),
      builder.addCase(getCurrentEventChilds.fulfilled, (state, action) => {
        state.eventChildPosts = action.payload
      }),
      builder.addCase(commentOnEvent.fulfilled, (state, action) => {
        state.eventChildPosts.push(action.payload)
      })
    builder.addCase(editComment.fulfilled, (state, action) => {
      const index = current(state.eventChildPosts).findIndex(
        (post) => post.id === action.payload.id
      )
      state.eventChildPosts[index].content = action.payload.content
    })
  },
})

export const {} = eventListSlice.actions
export default eventListSlice.reducer
