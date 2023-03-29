import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Paper, Typography, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { strings } from '../../utils/localization'
import { saveNavigate } from '../../reducers/currentPageSlice'
import { getCurrentEventById, getCurrentEventChilds } from '../../reducers/eventsSlice'
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import CreatePostForm from '../pages/post/CreatePostForm'
import EditPostForm from '../pages/post/EditPostForm'

const EventDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {post} = useSelector(state =>state.postsList)
  const { id } = useSelector(state => state.currentPage)
  const {currentEvent, eventChildPosts} = useSelector(state => state.eventList)
  const [openDialog, setOpenDialog] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [defaultdata, setDefaultdata] = useState({})
  const [editData, setEditData] = useState({
    id: null,
    content: null
  })

  
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

  const handleOpenDialog = ({targetUserId, targetUserName}) => {
    const newData = {
      targetUserId: null,
      eventId: id,
      targetUserName:null
    }
    if (targetUserId) {
      newData.targetUserId = targetUserId
      newData.targetUserName = targetUserName
    }
    setDefaultdata(Object.assign(defaultdata, newData))
    setOpenDialog(true)
  }

  const handleOpenEdit = (dataToEdit) => {
    setEditData({
      content: dataToEdit.content,
      id: dataToEdit.id,
      eventId: id
    })
    setOpenEdit(true)
  }

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {currentEvent === undefined? (
          <Typography>{strings.eventThread.wrongId}</Typography>
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
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <Button onClick={() => {
                dispatch(saveNavigate({url: post.user, id: post.userId}))
                navigate(`/profile/${post.user.replace(/\s/g, "_")}`)
              }}>
                {post.user}
              </Button>
              {post.userId !== JSON.parse(localStorage.getItem("currentUser")).id 
                ? <Button onClick={() => handleOpenDialog({})}>{strings.postThread.answer}</Button>
                : <Button onClick={() => handleOpenEdit(post)}>{strings.postThread.edit}</Button>
              }
            </div>
          </Paper>
        )}
        {eventChildPosts === undefined ? (
          <p>{strings.eventThread.noChilds}</p>
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
              <div style={{display:"flex", justifyContent:"space-between"}}>
                <Button onClick={() => {
                  dispatch(saveNavigate({url: child.user.username, id: null}))
                  navigate(`/profile/${child.user.username.replace(/\s/g, "_")}`)
                }}>
                  {child.user.username}
                </Button>
                {child.user.id !== JSON.parse(localStorage.getItem("currentUser")).id 
                  ? <Button onClick={() => handleOpenDialog({targetUserId: child.user.id, targetUserName: child.user.username})}>{strings.postThread.answer}</Button>
                  : <Button onClick={() => handleOpenEdit(child)}>{strings.postThread.edit}</Button>
                }
              </div>
            </Paper>
          ))
        )}
      </div>
      {openDialog && 
      <CreatePostForm
        defaultdata={defaultdata}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />}
      {openEdit &&
        <EditPostForm 
          defaultdata={editData}
          openDialog={openEdit}
          setOpenDialog={setOpenEdit}
        />}
    </>
  )
}
export default EventDetails