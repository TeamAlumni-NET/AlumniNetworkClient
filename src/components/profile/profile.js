import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import keycloak from '../../keycloak'
import { config } from '../../utils/config'
import EditProfile from './EditProfile'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
})

function Profile () {
  const [show, setShow] = useState(false)
  function toggleShow () {
    setShow(!show)
  }

  const data = localStorage.getItem('currentUser')
  const parsedData = JSON.parse(data)
  const username = parsedData.userName
  console.log(username)

  const apiUrl = config.url
  const endpoint = '/api/users/user/' + username
  const token = keycloak.token
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    const headers = {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json'
    }
    fetch(apiUrl + endpoint, { headers })
      .then(response => response.json())
      .then(data => setUserDetails(data))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <Img alt='complex' src={userDetails?.pictureUrl} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                {userDetails?.firstName} {userDetails?.lastName}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {userDetails?.status}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {(() => {
              if (username === userDetails?.userName) {
                return (
                  <EditProfile
                    show={show}
                    toggleShow={toggleShow}
                    editData={userDetails}
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
            {userDetails?.funFact}
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
                {userDetails?.bio}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default Profile
