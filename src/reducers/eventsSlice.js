import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getUserEvents } from "../Services/event/eventService"

export const getEventsList = createAsyncThunk(
  "eventList/getUserEvents",
  async () => {
    const response = await getUserEvents()
    return response
  }
)

export const eventListSlice = createSlice({
  name: "events",
  initialState: {
    userEvents: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventsList.fulfilled, (state, action) => {
      state.userEvents = action.payload
    })
  },
})

export const {} = eventListSlice.actions
export default eventListSlice.reducer
