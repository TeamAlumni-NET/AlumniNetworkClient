import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentChildPosts, getCurrentPost } from '../../reducers/postSlice'
import { Button, Paper, Typography, Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import { strings } from '../../utils/localization'

const Post = () => {
  const dispatch = useDispatch()
  const { post, childPosts } = useSelector(state => state.post)
  const { id } = useSelector(state => state.currentPage)

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

  return (
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
          <Typography variant='subtitle1' fontWeight={'bold'}>
            {post?.title}
          </Typography>
          <Typography variant='body'>{post?.content}</Typography>
          <Typography>{timeFormat(post.timeStamp)}</Typography>
          <Button component={Link} to={`/profile/${post.user.replace(/\s/g, "_")}`}>
            {post.user}
          </Button>
        </Paper>
      )}
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

            <Button component={Link} to={`/profile/${child.username.replace(/\s/g, "_")}`}>
              {child.username}
            </Button>
          </Paper>
        ))
      )}
    </div>
  )
}
export default Post
