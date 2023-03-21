import FullCalendar from "@fullcalendar/react"
import daygrid from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import { useState } from "react"
import CalendarInfo from "./CalendarInfo"

const Calendar = ({ events }) => {
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState()

  return (
    <>
      <FullCalendar
        plugins={[daygrid, timeGridPlugin]}
        initialView="dayGridMonth"
        height={800}
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
      <CalendarInfo open={open} setOpen={setOpen} event={event} />
    </>
  )
}

export default Calendar
