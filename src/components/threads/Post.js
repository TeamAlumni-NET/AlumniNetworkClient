import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentChildPosts, getCurrentPost } from '../../reducers/postsSlice'
import { Button, Paper, Typography, Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { strings } from '../../utils/localization'
import { saveNavigate } from '../../reducers/currentPageSlice'
import CreatePostForm from '../pages/post/CreatePostForm'

const Post = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { post, childPosts } = useSelector(state => state.postsList)
  const { id, url } = useSelector(state => state.currentPage)
  const [openDialog, setOpenDialog] = useState(false)
  const [defaultdata, setDefaultdata] = useState({})

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
    dispatch(getCurrentPost(id))
    dispatch(currentChildPosts(id))
  }, [dispatch])

  const handleOpenDialog = ({targetUserId, targetUserName}) => {
    const newData = {
      targetUserId: null,
      topicId: null,
      groupId: null,
      parentPostId: id,
      eventId: null,
      targetUserName:null
    }
    if (targetUserId) {
      newData.targetUserId = targetUserId
      newData.targetUserName = targetUserName
    }
    if (post.groupId) newData.groupId = post.groupId
    else newData.topicId = post.topicId
    if(post.eventId) newData.eventId = post.eventId
    setDefaultdata(Object.assign(defaultdata, newData))
    setOpenDialog(true)
  }
  
  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {Object.keys(post).length === 0 ? (
          <Typography>{strings.postThread.wrongPostId}</Typography>
        ) : (
          <Paper
            sx={{
              p: 2,
              width: '75%',
              flexGrow: 1,
              backgroundColor: theme =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
            }}
          >
            <Avatar alt='User' src={post.picture} />
            <Typography variant='h6' fontWeight={'bold'}>
              {post?.title}
            </Typography>
            <Typography variant='body'>{post?.content}</Typography>
            <Typography>{timeFormat(post.timeStamp)}</Typography>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <Button onClick={() => {
                dispatch(saveNavigate({url: post.user, id: post.userId}))
                navigate(`/profile/${post.user.replace(/\s/g, "_")}`)
              }}>
                {post.user}
              </Button>
              <Button onClick={() => handleOpenDialog({})}>{strings.postThread.answer}</Button>
            </div>
            
          </Paper>
        )}
        {childPosts.length === 0 ? (
          <p>No comments</p>
        ) : (
          childPosts.map(child => (
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
              <Avatar alt='User' src={child.pictureUrl} />
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
                <Button onClick={() => handleOpenDialog({targetUserId: child.user.id, targetUserName: child.user.username})}>{strings.postThread.answer}</Button>
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
    </>
  )
}
export default Post
