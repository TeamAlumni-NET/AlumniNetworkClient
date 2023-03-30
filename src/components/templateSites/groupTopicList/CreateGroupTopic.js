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
import { Container } from "@mui/system"
import { useState } from "react"
import { strings } from "../../../utils/localization"

/**
 *
 * @param {*} type
 * @param {*} showCreateNew
 * @param {*} setShowCreateNew
 * @param {*} createGroupTopic
 * @param {*} setCreateGroupTopic
 * @returns
 */
const CreateGroupTopic = ({
  type,
  showCreateNew,
  setShowCreateNew,
  createGroupTopic,
  setCreateGroupTopic,
}) => {
  let stringList = {}
  const [privacy, setPrivacy] = useState(false)
  const [newGroupTopic, setNewGroupTopic] = useState({
    name: "",
    description: "",
  })

  if (newGroupTopic.name === "" && createGroupTopic !== "") {
    setNewGroupTopic((newGroupTopic) => ({
      ...newGroupTopic,
      name: createGroupTopic,
    }))
  }

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

  const setStringList = () => {
    if (type === "group") {
      stringList = {
        new: strings.createGroup.newGroup,
        name: strings.createGroup.groupName,
        description: strings.createGroup.groupDescription,
        private: strings.createGroup.private,
        add: strings.createGroup.addGroup,
      }
    } else {
      stringList = {
        new: strings.createTopic.newTopic,
        name: strings.createTopic.topicName,
        description: strings.createTopic.topicDescription,
        add: strings.createTopic.addTopic,
      }
    }
  }

  setStringList()

  const handleClose = () => {
    setShowCreateNew(false)
  }

  const handleCheckBoxChange = (e) => {
    e.preventDefault()
    setPrivacy(e.target.checked)
  }

  const handleSubmit = () => {
    if (type === "topic") {
      setCreateGroupTopic({
        name: newGroupTopic.name,
        description: newGroupTopic.description,
      })
    } else {
      setCreateGroupTopic({
        name: newGroupTopic.name,
        description: newGroupTopic.description,
        isPrivate: privacy,
      })
    }
    handleClose()
  }

  return (
    <Container sx={{ maxWidth: "500px" }}>
      <Dialog open={showCreateNew} onClose={handleClose}>
        <Container
          sx={{ maxWidth: "500px", width: "100%", alignText: "center" }}
        >
          <DialogTitle id="modal-modal-title" variant="h6">
            {stringList.new}
          </DialogTitle>
          <div>
            <InputLabel variant="standard">{stringList.name}</InputLabel>
            <TextField
              required
              fullWidth
              id="outlined-required"
              defaultValue={newGroupTopic.name}
              onChange={(e) =>
                setNewGroupTopic((newGroupTopic) => ({
                  ...newGroupTopic,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <InputLabel variant="standard">{stringList.description}</InputLabel>
            <TextField
              required
              multiline
              fullWidth
              minRows={2}
              id="outlined-required"
              defaultValue=""
              onChange={(e) =>
                setNewGroupTopic((newGroupTopic) => ({
                  ...newGroupTopic,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {type === "group" && (
            <FormControlLabel
              label={stringList.private}
              control={
                <Checkbox checked={privacy} onChange={handleCheckBoxChange} />
              }
            />
          )}
          <Box
            sx={{
              p: "20px",
              display: "flex",
              gap: 1,
              justifyContent: "end",
            }}
          >
            <Button onClick={handleClose} variant="outlined">
              {strings.common.close}
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              {stringList.add}
            </Button>
          </Box>
        </Container>
      </Dialog>
    </Container>
  )
}

export default CreateGroupTopic
