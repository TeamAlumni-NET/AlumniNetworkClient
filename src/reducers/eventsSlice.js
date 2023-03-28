import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getUserEvents,
  getEventsAsList,
  getUserSuggestedEvents,
  getTopicEvents,
  getGroupEvents,
} from "../services/event/eventService"

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

export const eventListSlice = createSlice({
  name: "events",
  initialState: {
    userEvents: [],
    timelineEvents: [],
    userSuggestedEvents: [],
    topicEvents: [],
    groupEvents: [],
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
    builder.addCase(getTopicEventsList.fulfilled, (state, action) => {
      state.topicEvents = action.payload
    }),
    builder.addCase(getGroupEventsList.fulfilled, (state, action) => {
      state.groupEvents = action.payload
    })
  },
})

export const {} = eventListSlice.actions
export default eventListSlice.reducer
