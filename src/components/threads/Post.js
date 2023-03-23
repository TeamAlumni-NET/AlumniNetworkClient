import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  currentChildPosts,
  getCurrentPost,
  getcurrentPostUser
} from '../../reducers/postSlice'
import { Button, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
function Post () {
  const dispatch = useDispatch()
  const { post, childPosts, postUser } = useSelector(state => state.post)
 
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
    dispatch(getCurrentPost(5))
    dispatch(currentChildPosts(5))
    dispatch(getcurrentPostUser(1))
  }, [dispatch])

  return (
    <div>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: '75%',
          flexGrow: 1,
          backgroundColor: theme =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
        }}
      >
        <Typography variant='subtitle1' fontWeight={'bold'} >{post?.title}</Typography>
        <Typography variant='body'>{post?.content}</Typography>
        <Typography>{timeFormat(post.timeStamp)}</Typography>
        <Button component={Link} to={`/profile/${postUser.username}`}>
          {postUser.username}
        </Button>
      </Paper>
      {childPosts.childPosts === undefined ? (
        <p>Something went wrong</p>
      ) : (
        childPosts.childPosts.map(child => (
          <Paper
            key={child.id}
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: '75%',
              flexGrow: 1,
              backgroundColor: theme =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
            }}
          >
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
