import React, { useState } from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import { Navigate, useNavigate } from "react-router-dom"

const CalendarInfo = ({ open, setOpen, event }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()

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
      <DialogContent>
        <DialogContentText>
          {event?.extendedProps.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => navigate(`/event/${event?.title.replace(/\s/g, "_")}`)}
        >
          View event!
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CalendarInfo
