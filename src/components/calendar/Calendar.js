import FullCalendar from "@fullcalendar/react"
import daygrid from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { useState } from "react"
import CalendarInfo from "./CalendarInfo"
import styled from "@emotion/styled"

/**
 * Renders Calendar-compponent
 * @param {Array.<Object>} events List of events to show in calendar.
 * @param {Number} height Heigh of the calendar
 * @returns {JSX.Element} Rendered Calendar
 */
const Calendar = ({ events, height = 800 }) => {
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState()

  const StyleWrapper = styled.div`
  .fc {
    font-family: 'Roboto', sans-serif;
  }
`

  return (
    <>
      <StyleWrapper>
        <FullCalendar
          plugins={[daygrid, timeGridPlugin]}
          initialView="dayGridMonth"
          height={height}
          events={events}
          firstDay={1}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={(e) => {
            setOpen(true)
            setEvent(e.event)
          }}
        />
      </StyleWrapper>
      <CalendarInfo open={open} setOpen={setOpen} event={event} />
    </>
  )
}

export default Calendar
