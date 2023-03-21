import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserEvents, getEventsAsList } from "../Services/event/eventService"

export const getEventsList = createAsyncThunk(
  "eventList/getUserEvents",
  async () => {
    const response = await getUserEvents()
    return response
  }
)

export const getTimelineEventsList = createAsyncThunk("eventList/getTimelineEvents",
  async () => {
    const response = await getEventsAsList()
    return response
  }
)

export const eventListSlice = createSlice({
  name: "events",
  initialState: {
    userEvents: [],
    timelineEvents: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventsList.fulfilled, (state, action) => {
      state.userEvents = action.payload
    }),
    builder.addCase(getTimelineEventsList.fulfilled, (state, action) => {
      state.timelineEvents = action.payload
    })
  },
})

export const {} = eventListSlice.actions
export default eventListSlice.reducer
