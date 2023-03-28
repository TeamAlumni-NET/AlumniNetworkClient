import {
 Paper,
 Typography,
 Avatar,
 Button,
} from "@mui/material"
import { strings } from "../../utils/localization"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentEventById, getCurrentEventChilds } from '../../reducers/eventsSlice'
import { Link } from 'react-router-dom'



const EventDetails = () => {
  const dispatch = useDispatch()
  const {currentEvent} = useSelector(state => state.eventList)

  useEffect(() => {
    dispatch(getCurrentEventById(2))
    dispatch(getCurrentEventChilds(2))
  }, [dispatch])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {currentEvent === undefined ? (
        <Typography>{strings.postThread.wrongPostId}</Typography>
      ) : (
        <Paper
          sx={{
            p: 2,
            width: '75%',
            flexGrow: 1,
            backgroundColor: "lightblue"
          }}
        >

          <Typography variant='subtitle1' align="center" fontWeight={'bold'}>
            {currentEvent?.name}
          </Typography>
          <Typography variant='body' align="center" >{currentEvent?.description}</Typography>
          <Typography>{currentEvent.startTime}</Typography>
          <Button component={Link} to={`/profile`}>
            {currentEvent.name}
          </Button>
        </Paper>
      )}
    </div>
  )
}
export default EventDetails
