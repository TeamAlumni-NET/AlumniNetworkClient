import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { useEffect} from 'react'
import EditProfile from './EditProfile'
import { getCurrentUser, getProfileUser } from '../../reducers/userSlice'
import { useDispatch, useSelector } from "react-redux"



const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
})

function Profile () {
  const dispatch = useDispatch()
  const {user, profileUser}=useSelector(state => state.user)

  var usernameFromUrl = window.location.pathname.split("/")
  
  

   
  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getProfileUser(usernameFromUrl.slice(-1).toString())) 

  }, [dispatch])

  return (
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
      <Grid container spacing={2}>
        <Grid item sx={{ width: 128, height: 128 }}>
          <Img alt='complex' src={profileUser?.pictureUrl} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                {profileUser?.firstName} {profileUser?.lastName}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {profileUser?.status}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {(() => {
              if (user.id === profileUser?.id) {
                return (
                  <EditProfile/>
                )
              }
              return null
            })()}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item maxWidth={'25%'}>
          <Typography gutterBottom variant='body2' component='div'>
            {profileUser?.funFact}
          </Typography>
        </Grid>
        <Grid
          item
          xs
          container
          direction='column'
          spacing={2}
          sx={{ height: 600 }}
        >
          <Grid item xs>
            <Box sx={{ backgroundColor: 'lightgrey', height: 500 }}>
              <Typography variant='body2' gutterBottom>
                {profileUser?.bio}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Profile
