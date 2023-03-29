import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  InputLabel,
  TextField,
} from "@mui/material"
import { useEffect, useState } from "react"
import EditProfile from "./EditProfile"
import { getCurrentUser, getProfileUser } from "../../reducers/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { strings } from "../../utils/localization"
import { useTheme } from "@emotion/react"
import { borderRadius, Container } from "@mui/system"
import { useParams } from "react-router-dom"

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
})

function Profile() {
  const dispatch = useDispatch()
  const { user, profileUser } = useSelector((state) => state.user)
  const { id, url } = useSelector((state) => state.currentPage)
  const { username } = useParams()
  const [openEdit, setOpenEdit] = useState(false)
  const handleOpen = () => {
    setOpenEdit(true)
  }

  const labelStyle = { marginLeft: "10px", marginTop: "15px" }

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getProfileUser(url))
  }, [dispatch, username])

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: "50px" }}>
      <Card
        sx={{
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <CardContent
          style={{
            maxHeight: "300px",
            display: "flex",
            justifyContent: "center",
            background:
              "linear-gradient(0deg, rgba(92,5,67,0) 0%, rgba(139,5,237,0.5886555305716037) 50%, rgba(130,81,157,1) 100%)",
          }}
        >
          <img
            src={profileUser?.pictureUrl}
            alt="Profile picture"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              objectFit: "cover",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            }}
          />
        </CardContent>
        <CardHeader
          title={`${profileUser?.firstName} ${profileUser?.lastName}`}
          subheader={`@${profileUser?.username}`}
          sx={{ textAlign: "center" }}
        />
        <CardContent fullWidth>
          <InputLabel style={labelStyle}>
            {strings.profilePage.userStatus}
          </InputLabel>
          <TextField disabled value={profileUser?.status} fullWidth />
          <InputLabel style={labelStyle}>
            {strings.profilePage.funFact}
          </InputLabel>
          <TextField
            disabled
            value={profileUser?.funFact}
            fullWidth
            rows={4}
            multiline
          />
          <InputLabel style={labelStyle}>{strings.profilePage.bio}</InputLabel>
          <TextField
            disabled
            multiline
            rows={6}
            value={profileUser?.bio}
            fullWidth
          />
        </CardContent>
        <CardActions>
          {user.id === profileUser?.id && (
            <Button
              onClick={handleOpen}
              variant="contained"
              fullWidth
              sx={{ pr: "20px", pl: "20px" }}
            >
              {strings.common.edit}
            </Button>
          )}
        </CardActions>
        <EditProfile open={openEdit} setOpen={setOpenEdit} />
      </Card>
    </Container>
  )
}
export default Profile
