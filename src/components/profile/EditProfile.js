import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { strings } from '../../utils/localization'
import { TextareaAutosize } from '@mui/base'
import { useDispatch, useSelector } from "react-redux"
import { patchCurrentUser, getCurrentUser } from '../../reducers/userSlice'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4
}

const EditProfile = () => {
  const {user}=useSelector(state => state.user)
  const dispatch = useDispatch()

  const [editFirstName, setFirstName] = useState(user.firstName)
  const [editLastName, setLastName] = useState(user.lastName)
  const [editStatus, setStatus] = useState(user.status)
  const [editFunFact, setFunFact] = useState(user.funFact)
  const [editPictureUrl, setPictureUrl] = useState(user.pictureUrl)
  const [editBio, setBio] = useState(user.bio)

  async function submit (e) {
    e.preventDefault()

    const dataToBackend = {
      id: user.id,
      userName: user.userName,
      firstName: editFirstName,
      lastName: editLastName,
      status: editStatus,
      bio: editBio,
      funFact: editFunFact,
      pictureUrl: editPictureUrl
    }
   

    try {
      dispatch(patchCurrentUser(JSON.stringify(dataToBackend)))
      
      
    } catch (e) {
      handleClose()
      alert('Something went wrong')
      return
    }

    handleClose()
    alert('Profile updated')
    dispatch(getCurrentUser())
    
    
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

 


  return (
    <>
      <Button onClick={handleOpen}>{strings.common.edit}</Button>
      <form onSubmit={submit}>
        <Modal open={open} onClose={handleClose}>
          <Box
            component='form'
            sx={{
              ...style,
              width: 400,
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
          >
            <h2>{user.userName}</h2>
            <div>
              <TextField
                required
                id='outlined-required'
                label={strings.profilePage.firstName}
                defaultValue={user.firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                required
                id='outlined-required'
                label={strings.profilePage.lastName}
                defaultValue={user.lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                outlined
                id='outlined-required'
                label={strings.profilePage.userStatus}
                defaultValue={user.status}
                onChange={e => setStatus(e.target.value)}
              />
            </div>
            <div>
              <TextField
                outlined
                id='outlined-required'
                label={strings.profilePage.funFact}
                defaultValue={user.funFact}
                onChange={e => setFunFact(e.target.value)}
              />
            </div>
            <div>
              <TextField
                outlined
                id='outlined-required'
                label={strings.profilePage.pictureUrl}
                defaultValue={user.pictureUrl}
                onChange={e => setPictureUrl(e.target.value)}
              />
            </div>
            <label>{strings.profilePage.bio}</label>
            <div>
              <TextareaAutosize
                
                minRows={4}
                id='outlined-required'
                
                defaultValue={user.bio}
                onChange={e => setBio(e.target.value)}
              />
            </div>
            <Button type='submit' variant='primary'>
              {strings.common.save}
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              {strings.common.close}
            </Button>
          </Box>
        </Modal>
      </form>
    </>
  )
}

export default EditProfile
