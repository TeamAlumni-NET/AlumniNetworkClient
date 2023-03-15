import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { strings } from '../../utils/localization'
import { TextareaAutosize } from '@mui/base'

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

const EditProfile = (props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={handleOpen}>{strings.profilePage.edit}</Button>
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
              label='Required'
              defaultValue={props.editData.firstName}
            />
          </div>
          <div>
            <TextField
              required
              id='outlined-required'
              label='Required'
              defaultValue={props.editData.lastName}
            />
          </div>
          <div>
            <TextField
              required
              id='outlined-required'
              label='Required'
              defaultValue={props.editData.status}
            />
          </div>
          <div>
            <TextField
              required
              id='outlined-required'
              label='Required'
              defaultValue={props.editData.funFact}
            />
          </div>
          <div>
            <TextField
              required
              id='outlined-required'
              label='Required'
              defaultValue={props.editData.pictureUrl}
            />
          </div>
          <div>
            <TextareaAutosize
              required
              minRows={4}
              id='outlined-required'
              label='Required'
              defaultValue={props.editData.bio}
            />
          </div>
          
        </Box>
      </Modal>
    </>
  )
}

export default EditProfile
