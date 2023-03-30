import {
  Box,
  Button,
  FormControlLabel,
  InputLabel,
  Modal,
  TextField,
  Typography,
  Checkbox,
  Dialog,
  DialogTitle,
} from "@mui/material"

import { useState } from "react"
import { strings } from "../../../utils/localization"

const CreateGroup = () => {
  const [newGroup, setNewGroup] = useState({
    groupName: "",
    groupDescription: "",
    private: false,
  })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  const stringList = {
    newGroup: strings.createGroup.newGroup,
    groupName: strings.createGroup.groupName,
    groupDescription: strings.createGroup.groupDescription,
    privacy: strings.createGroup.privacy,
    public: strings.createGroup.public,
    private: strings.createGroup.private,
    addGroup: strings.createGroup.addGroup,
  }

  const handleCheckBoxChange = (e) => {
    setNewGroup((newGroup) => ({
      ...newGroup,
      private: e.target.checked,
    }))
  }
  console.log("test")
  return (
    <>
      <Button size="small" onClick={handleOpen}>
        {stringList.newGroup}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle id="modal-modal-title" variant="h6" component="h2">
          {stringList.newGroup}
        </DialogTitle> */}
        <InputLabel variant="standard">{stringList.groupName}</InputLabel>
        <TextField
          required
          id="outlined-required"
          defaultValue=""
          onChange={(e) =>
            setNewGroup((newGroup) => ({
              ...newGroup,
              groupName: e.target.value,
            }))
          }
        />
        <InputLabel variant="standard">
          {stringList.groupDescription}
        </InputLabel>
        <TextField
          required
          multiline
          fullWidth
          minRows={2}
          id="outlined-required"
          defaultValue=""
          onChange={(e) =>
            setNewGroup((newGroup) => ({
              ...newGroup,
              groupDescription: e.target.value,
            }))
          }
        />
        <FormControlLabel
          label={stringList.privacy}
          control={
            <Checkbox
              checked={newGroup.private}
              onChange={handleCheckBoxChange}
            />
          }
        />
        <Button onClick={handleClose}>{stringList.addGroup}</Button>
      </Dialog>
    </>
  )
}

export default CreateGroup
