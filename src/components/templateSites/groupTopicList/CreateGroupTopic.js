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
 * Returns dialog for creating ne topic or group
 * @param {String} type type of selected create, group or topic
 * @param {Boolean} showCreateNew Defines if this component is shown.
 * @param {ReferenceState } setShowCreateNew For closing this component.
 * @param {String} createGroupTopic Starting name for new topic / group
 * @param {ReferenceState} setCreateGroupTopic Sets new values to createGroupTopic
 * @returns {JSX.Element} Rendered CreateGroupTopic
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

  /**
   * Sets stringlist depending on type-parameter
   * @returns {void}
   */
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

  /**
   * Closes this component
   * @returns {void}
   */
  const handleClose = () => {
    setShowCreateNew(false)
  }

  /**
   * Sets checkbox to true or false
   * @param {Event} e default event
   * @returns {void}
   */
  const handleCheckBoxChange = (e) => {
    e.preventDefault()
    setPrivacy(e.target.checked)
  }

  /**
   * Sets createGroupTopic as a object on closes this component
   * @returns {void}
   */
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
