import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentChildPosts, getCurrentPost } from '../../reducers/postSlice'
import { Button, Paper, Typography, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import { strings } from '../../utils/localization'
function Post () {
  const dispatch = useDispatch()
  const { post, childPosts } = useSelector(state => state.post)


  var idFromUrl = window.location.pathname.split("/")

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
    //hardcoded
    dispatch(getCurrentPost(idFromUrl.slice(-1).toString()))
    dispatch(currentChildPosts(idFromUrl.slice(-1).toString()))
  }, [dispatch])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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
        <Typography variant='subtitle1' fontWeight={'bold'}>
          {post?.title}
        </Typography>
        <Typography variant='body'>{post?.content}</Typography>
        <Typography>{timeFormat(post.timeStamp)}</Typography>
        <Button component={Link} to={`/profile/${post.user}`}>
          {post.user}
        </Button>
      </Paper>
      {childPosts.childPosts === undefined ? (
        <p>No comments</p>
      ) : (
        childPosts.childPosts.map(child => (
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

            <Button component={Link} to={`/profile/${child.username}`}>
              {child.username}
            </Button>
          </Paper>
        ))
      )}
    </div>
  )
}
export default Post
