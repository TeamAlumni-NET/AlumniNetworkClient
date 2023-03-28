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

const CalendarDrawerView = ({ open, setOpen, events, title }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
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
