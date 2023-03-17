import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import keycloak from '../../keycloak'
import { config } from '../../utils/config'
import EditProfile from './EditProfile'
import { getCurrentUser } from '../../reducers/userSlice'
import { useDispatch, useSelector } from "react-redux"


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
})

function Profile () {
  const dispatch = useDispatch()
  const {user}=useSelector(state => state.user) 
  const [show, setShow] = useState(false)
  function toggleShow () {
    setShow(!show)
  }

  
  useEffect(() => {
    dispatch(getCurrentUser()) 

  }, [dispatch])
  
  console.log(user)

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
          <Img alt='complex' src={user?.pictureUrl} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {user?.status}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {(() => {
              if (JSON.parse(localStorage.getItem('currentUser')).id === user?.id) {
                return (
                  <EditProfile
                    show={show}
                    toggleShow={toggleShow}
                    editData={user}
                    //onDataUpdate={setUserDetails}
                  />
                )
              }

              return null
            })()}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Typography gutterBottom variant='body2' component='div'>
            {user?.funFact}
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
                {user?.bio}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Profile
