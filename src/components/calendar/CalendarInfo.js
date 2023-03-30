import { format } from "date-fns"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import EastIcon from "@mui/icons-material/East"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../reducers/currentPageSlice"
import { strings } from "../../utils/localization"

/**
 * Shows info of an element and renders it as dialog.
 * @param {Boolean} open Defines if this component is shown.
 * @param {ReferenceState} setOpen For closing this component.
 * @param {Object} event Selected event
 * @returns {JSX.Element} Rendered CalendarInfo
 */
const CalendarInfo = ({ open, setOpen, event }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()

  /**
   * Closes CalendarInfo
   * @returns {void}
   */
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby={event?.title}
    >
      <DialogTitle id={event?.title}>{event?.title}</DialogTitle>
      <DialogContent dividers={true} sx={{ m: 2 }}>
        <DialogContentText sx={{ m: 1 }}>
          {event?.extendedProps.description}
          <Box
            sx={{
              m: 1,
              maxWidth: "200px",
            }}
          >
            <List
              sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <ListItem>
                <ListItemText
                  primary={
                    event && format(event?._instance.range.start, "dd.M.yyyy")
                  }
                  secondary={
                    event && format(event?._instance.range.start, "HH:mm:ss")
                  }
                />
              </ListItem>
              <EastIcon />
              <ListItem>
                <ListItemText
                  primary={
                    event && format(event?._instance.range.end, "dd.M.yyyy")
                  }
                  secondary={
                    event && format(event?._instance.range.end, "HH:mm:ss")
                  }
                />
              </ListItem>
            </List>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ paddingTop: 0 }}>
        <Button size="small" variant="outlined" onClick={handleClose}>
          {strings.common.close}
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            navigate(`/event/${event?.title.replace(/\s/g, "_")}`)
            dispatch(saveNavigate({ url: event?.title, id: event?.id }))
          }}
        >
          {strings.common.viewEvent}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CalendarInfo
