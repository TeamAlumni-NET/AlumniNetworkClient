import { Box, Button, InputLabel, Modal, TextField, Typography } from "@mui/material";

import { useState } from "react"
import { strings } from "../../../utils/localization"


const CreateTopic = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
    }

    const stringList = {
        newTopic: strings.createTopic.newTopic,
        topicName: strings.createTopic.topicName,
        topicDescription: strings.createTopic.topicDescription,
        addTopic: strings.createTopic.addTopic
    }

    return (
        <>
            <Button size="small" onClick={handleOpen}>{stringList.newTopic}</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {stringList.newTopic}
                    </Typography>
                    <form>

                        <div>
                            <InputLabel variant='standard'>{stringList.topicName}</InputLabel>
                            <TextField
                                required
                                id='outlined-required'
                                defaultValue=""
                            //onChange={}
                            />
                        </div>
                        <div>
                            <InputLabel variant='standard'>{stringList.topicDescription}</InputLabel>
                            <TextField
                                required
                                id='outlined-required'
                                defaultValue=""
                            //onChange={}
                            />
                        </div>

                    </form>
                    <Button onClick={handleClose}>{stringList.addTopic}</Button>
                </Box>
            </Modal>
        </>
    )

}

export default CreateTopic