import { Container, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserSuggestedEventsList } from "../../../reducers/eventsSlice"
import Calendar from "../../calendar/Calendar"
import { strings } from "../../../utils/localization"

/**
 * Renders CalendarPage element
 * @returns {ReferenceState} Rendered CalendarPage
 */
const CalendarPage = () => {
  const dispatch = useDispatch()
  const { userSuggestedEvents } = useSelector((state) => state.eventList)

  useEffect(() => {
    dispatch(getUserSuggestedEventsList())
  }, [dispatch])

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ margin: "30px" }}>
        {strings.common.calendar}
      </Typography>
      <Typography sx={{ margin: "10px" }}>{strings.calendar.text}</Typography>
      <Calendar events={userSuggestedEvents} height={700} />
    </Container>
  )
}

export default CalendarPage
