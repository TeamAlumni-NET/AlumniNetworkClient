import { createSlice } from "@reduxjs/toolkit"

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: {
    url: "",
    id: null
  },
  reducers: {
    saveNavigate(state, action) {
      sessionStorage.setItem("CurrentPage", `{"url": "${action.payload.url}", "id": ${action.payload.id}}`)
      state.url = action.payload.url
      state.id = action.payload.id
    }
  },
})

export const {saveNavigate} = currentPageSlice.actions
export default currentPageSlice.reducer