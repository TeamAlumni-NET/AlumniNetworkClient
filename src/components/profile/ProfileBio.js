import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%'
})

function ProfileBio () {
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
          <Img alt='complex' src='/static/images/grid/complex.jpg' />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                Username
              </Typography>
              <Typography variant='body2' gutterBottom>
                Status
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Grid item>
            <ButtonBase sx={{ width: 80, height: 50 }}>
              <Typography variant='subtitle1' component='div'>
                edit
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default ProfileBio