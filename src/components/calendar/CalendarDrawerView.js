import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import Calendar from "./Calendar"

/**
 * Renders CalendarDrawerView-component
 * @param {Boolean} opencalendar Defines if this component is shown.
 * @param {ReferenceState} setOpenCalendar For closing this component.
 * @param {Array.<Object>} events (topicEvents/groupEvents). Events to show in calendar.
 * @param {String} title Title of CalendarDrawerView
 * @returns {JSX.Element} Rendered CalendarDrawerView
 */
const CalendarDrawerView = ({
  opencalendar,
  setOpenCalendar,
  events,
  title,
}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  /**
   * Closes CalendarDrawerView
   * @returns {void}
   */
  const handleClose = () => {
    setOpenCalendar(false)
  }

  return (
    <Dialog fullScreen={fullScreen} open={opencalendar} onClose={handleClose}>
      <DialogTitle id={title}>{title}</DialogTitle>
      <DialogContent>
        <Calendar events={events} />
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <Button size="small" variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CalendarDrawerView
