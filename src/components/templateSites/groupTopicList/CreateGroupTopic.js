import {Button, Dialog, Typography} from "@mui/material"

const CreateGroupTopic = ({type,showCreateNew, setShowCreateNew}) => {

  const handleClose = () => {
    setShowCreateNew(false)
  }

  return (
    <Dialog onClose={handleClose} open={showCreateNew}>
      <Typography>{type}</Typography>
      <Button onClick={() => setShowCreateNew(false)}>sulje</Button>
    </Dialog>
  )
}

export default CreateGroupTopic