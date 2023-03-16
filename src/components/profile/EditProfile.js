import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { strings } from '../../utils/localization'
import { TextareaAutosize } from '@mui/base'
import keycloak from '../../keycloak'
import { config } from '../../utils/config'
import axios from 'axios'


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

const EditProfile = props => {
  const [editFirstName, setFirstName] = useState(props.editData.firstName)
  const [editLastName, setLastName] = useState(props.editData.lastName)
  const [editStatus, setStatus] = useState(props.editData.status)
  const [editFunFact, setFunFact] = useState(props.editData.funFact)
  const [editPictureUrl, setPictureUrl] = useState(props.editData.pictureUrl)
  const [editBio, setBio] = useState(props.editData.bio)

  async function submit (e) {
    e.preventDefault()

    const dataToBackend = {
      id: 4,
      userName: props.editData.userName,
      firstName: editFirstName,
      lastName: editLastName,
      status: editStatus,
      bio: editBio,
      funFact: editFunFact,
      pictureUrl: editPictureUrl
    }
    const apiUrl = config.url
    const endpoint = '/api/users/' + props.editData.userName
    const token = keycloak.token
    const body = JSON.stringify(dataToBackend)

    try {
      await axios.patch(apiUrl + endpoint, body, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    } catch (e) {
      handleClose()
      alert('Something went wrong')
      return
    }

    handleClose()
    alert('Profile updated')
    props.onDataUpdate(dataToBackend)
    
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
            <h2>{props.editData.userName}</h2>
            <div>
              <TextField
                required
                id='outlined-required'
                label={strings.profilePage.firstName}
                defaultValue={props.editData.firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                required
                id='outlined-required'
                label={strings.profilePage.lastName}
                defaultValue={props.editData.lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div>
              <TextField
                outlined
                id='outlined-required'
                label={strings.profilePage.userStatus}
                defaultValue={props.editData.status}
                onChange={e => setStatus(e.target.value)}
              />
            </div>
            <div>
              <TextField
                outlined
                id='outlined-required'
                label={strings.profilePage.funFact}
                defaultValue={props.editData.funFact}
                onChange={e => setFunFact(e.target.value)}
              />
            </div>
            <div>
              <TextField
                outlined
                id='outlined-required'
                label={strings.profilePage.pictureUrl}
                defaultValue={props.editData.pictureUrl}
                onChange={e => setPictureUrl(e.target.value)}
              />
            </div>
            <label>{strings.profilePage.bio}</label>
            <div>
              <TextareaAutosize
                required
                minRows={4}
                id='outlined-required'
                label='Required'
                defaultValue={props.editData.bio}
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
