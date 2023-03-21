import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentChildPosts, getCurrentPost } from '../../reducers/postSlice'
import { config } from '../../utils/config'
import keycloak from '../../keycloak'
import axios from 'axios'
import { Paper } from '@mui/material'
function Post () {
  const dispatch = useDispatch()
  const { post, childPosts } = useSelector(state => state.post)

  const content = childPosts.map(child => (
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
      <p>{child.timeStamp}</p>
    </Paper>
  ))

  useEffect(() => {
    dispatch(getCurrentPost(5))
    dispatch(currentChildPosts(5))
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
        <p>{post?.title}</p>
        <p>{post?.content}</p>
        <p>{post.timeStamp}</p>
        <p>Julkaisija</p>
      </Paper>
      {content}
    </div>
  )
}
export default Post
