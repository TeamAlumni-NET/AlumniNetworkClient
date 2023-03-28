import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Paper, Typography, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { strings } from '../../utils/localization'
import { saveNavigate } from '../../reducers/currentPageSlice'
import { getCurrentEventById, getCurrentEventChilds } from '../../reducers/eventsSlice'
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

const EventDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {post} = useSelector(state =>state.post)
  const { id } = useSelector(state => state.currentPage)
  const {currentEvent, eventChildPosts} = useSelector(state => state.eventList)

  
  const timeFormat = timeStamp => {
    const formatTime = new Date(timeStamp).toLocaleString('en-Fi', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    return formatTime
  }

  useEffect(() => {
    dispatch(getCurrentEventById(id))
    dispatch(getCurrentEventChilds(id))
  }, [dispatch])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {currentEvent === undefined? (
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
          <Typography variant='subtitle1' align='center' fontWeight={'bold'}>
            {currentEvent?.name}
          </Typography>
          <Typography align='center' variant='body'>{currentEvent?.description}</Typography>
          <CalendarMonthIcon/>
          <Typography>{timeFormat(currentEvent.startTime)}</Typography>
          <Typography>{timeFormat(currentEvent.endTime)}</Typography>
          <Button onClick={() => {
            dispatch(saveNavigate({url: post.user, id: post.userId}))
            navigate(`/profile/${post.user.replace(/\s/g, "_")}`)
          }}>
            {post.user}
          </Button>
        </Paper>
      )}
      {eventChildPosts === undefined ? (
        <p>No comments</p>
      ) : (
        eventChildPosts.map(child => (
          <Paper
            key={child.id}
            sx={{
              p: 2,
              marginTop: '2%',
              width: '75%',
              flexGrow: 1,
              backgroundColor: theme =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
            }}
          >
            <Avatar alt='User' src={child.user.pictureUrl} />
            {child.targetUser !== null ? (
              <Typography variant='subtitle1' fontWeight={'bold'}>
                {strings.postThread.reply} {child.targetUser}
              </Typography>
            ) : (
              ''
            )}
            <p>{child.content}</p>
            <p>{timeFormat(child.timeStamp)}</p>

            <Button onClick={() => {
              dispatch(saveNavigate({url: child.user.username, id: null}))
              navigate(`/profile/${child.user.username.replace(/\s/g, "_")}`)
            }}>
              {child.user.username}
            </Button>
          </Paper>
        ))
      )}
    </div>
  )
}
export default EventDetails