import { Box, Button, FormControlLabel, InputLabel, Modal, TextField, Typography, Checkbox} from "@mui/material"
import { useState } from "react"
import { strings } from "../../../utils/localization"



const CreateGroupTopic = ({type, showCreateNew, setShowCreateNew}) => {

  let stringList = {}

  const [privacy, setPrivacy] = useState(false)

  const [newGroupTopic, setNewGroupTopic] = useState({
    name: "",
    description: ""    
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setShowCreateNew(false)
  }

  const handleCheckBoxChange = e => {
    setPrivacy(e.target.checked)
  }

  const setStringList = () => {
    if (type === "group") {
      stringList = {
        new: strings.createGroup.newGroup,
        name: strings.createGroup.groupName,
        description: strings.createGroup.groupDescription,
        private: strings.createGroup.private,
        add: strings.createGroup.addGroup
      } 
    } else {
      stringList = {
        new: strings.createTopic.newTopic,
        name: strings.createTopic.topicName,
        description: strings.createTopic.topicDescription,
        add: strings.createTopic.addTopic
      }
    }

  }

  setStringList()
  return (
    <>
    
        <Modal
            open={showCreateNew}
            onClose={handleClose}   
        >

        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             {stringList.new}
            </Typography>
             <form>
                    
                <div>
                    <InputLabel variant='standard'>{stringList.name}</InputLabel>
                    <TextField
                    required
                    id='outlined-required'
                    defaultValue=""
                    onChange={e => setNewGroupTopic(newGroupTopic=> ({
                        ...newGroupTopic,
                        name: e.target.value,
                      }))}
                    />
                </div>
                
                <div>
                    <InputLabel variant='standard'>{stringList.description}</InputLabel>
                    <TextField
                    required
                    multiline
                    fullWidth
                    minRows={2}
                    id='outlined-required'
                    defaultValue=""
                    onChange={e => setNewGroupTopic(newGroupTopic=> ({
                        ...newGroupTopic,
                        description: e.target.value,
                      }))}
                    />
                </div>

                {
                  type === "group" && 
                  <div>
                  <FormControlLabel label={stringList.private} control={
                  <Checkbox checked={privacy} onChange={handleCheckBoxChange}/> 
                  }
                  />
                  </div>
                }

            </form>
            <Button onClick={handleClose}>{stringList.add}</Button>
            <Button onClick={handleClose}>{strings.common.close}</Button>
        </Box>
        </Modal>
        </>
  )
}

export default CreateGroupTopic