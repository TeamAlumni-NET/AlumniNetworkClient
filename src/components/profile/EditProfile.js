import { useState } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { strings } from "../../utils/localization"
import { TextareaAutosize } from "@mui/base"
import { useDispatch, useSelector } from "react-redux"
import {
  patchCurrentUser,
  getCurrentUser,
  getProfileUser,
} from "../../reducers/userSlice"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import { Container } from "@mui/system"

const EditProfile = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [editFirstName, setFirstName] = useState(user.firstName)
  const [editLastName, setLastName] = useState(user.lastName)
  const [editStatus, setStatus] = useState(user.status)
  const [editFunFact, setFunFact] = useState(user.funFact)
  const [editPictureUrl, setPictureUrl] = useState(user.pictureUrl)
  const [editBio, setBio] = useState(user.bio)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  console.log(user);
  const submit = async (e) => {
    const dataToBackend = {
      id: user.id,
      userName: user.username,
      firstName: editFirstName,
      lastName: editLastName,
      status: editStatus,
      bio: editBio,
      funFact: editFunFact,
      pictureUrl: editPictureUrl,
    }
    console.log(dataToBackend, JSON.stringify(dataToBackend));
    try {
      dispatch(patchCurrentUser(dataToBackend))
    } catch (e) {
      handleClose()
      alert(strings.profilePage.errorMessage)
      return
    }

    handleClose()
    alert(strings.profilePage.success)
    dispatch(getCurrentUser())
    dispatch(getProfileUser(user.username))
  }
  

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container sx={{ maxWidth: "500px" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        sx={{ textAlign: "center" }}
      >
        <DialogTitle>{user.username}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              sx={{ mt: "10px" }}
              fullWidth
              required
              label={strings.profilePage.firstName}
              defaultValue={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label={strings.profilePage.lastName}
              defaultValue={user.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              outlined
              label={strings.profilePage.userStatus}
              defaultValue={user.status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <TextField
              fullWidth
              outlined
              label={strings.profilePage.funFact}
              defaultValue={user.funFact}
              onChange={(e) => setFunFact(e.target.value)}
            />
            <TextField
              fullWidth
              outlined
              label={strings.profilePage.pictureUrl}
              defaultValue={user.pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
            />

            <TextField
              label={strings.profilePage.bio}
              fullWidth
              multiline
              minRows={4}
              defaultValue={user.bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Box sx={{ display: "flex", justifyContent: "end", gap: 1 }}>
              <Button variant="outlined" onClick={handleClose}>
                {strings.common.close}
              </Button>
              <Button onClick={() => submit()} variant="contained">
                {strings.common.save}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default EditProfile
