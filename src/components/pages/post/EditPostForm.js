import { useState } from "react"
import { Button, InputLabel, TextField, Drawer } from "@mui/material"
import { strings } from "../../../utils/localization"
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { editPost } from '../../../reducers/postsSlice'
import { editComment } from '../../../reducers/eventsSlice'

/**
 *
 * @param {*} defaultdata: nameForForm, eventId, groupId, topicId, targetUserId, parentPostId, targetUserName
 * @returns
 */
const EditPostForm = ({ defaultdata, openDialog, setOpenDialog }) => {
  const dispatch = useDispatch()
  const [edit, setEditPost] = useState(defaultdata)
  const handleClose = () => {
    setOpenDialog(false)
  }

  const handleSubmit = async () => {
    if (defaultdata.eventId !== undefined) dispatch(editComment(edit))
    else dispatch(editPost(edit))
    handleClose()
  }

  return (
    <Drawer anchor="bottom" open={openDialog} onClose={handleClose}>
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1>{strings.editPost.editTitle}</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {defaultdata?.title !== undefined && (
              <div>
                <InputLabel variant="standard">
                  {strings.createPostForm.postTitle}
                </InputLabel>
                <TextField
                  required
                  id="outlined-required"
                  defaultValue={defaultdata.title}
                  sx={{ width: 300 }}
                  onChange={(e) =>
                    setEditPost({
                      ...defaultdata,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>
          <div>
            <InputLabel variant="standard">
              {strings.createPostForm.content}
            </InputLabel>
            <TextField
              required
              fullWidth
              multiline
              minRows={5}
              id="outlined-required"
              defaultValue={defaultdata.content}
              onChange={(e) =>
                setEditPost({
                  ...defaultdata,
                  content: e.target.value,
                })
              }
            />
          </div>
        </Box>
        <Button onClick={handleClose}>{strings.common.cancel}</Button>
        <Button onClick={handleSubmit}>{strings.createPostForm.post}</Button>
      </form>
    </Drawer>
  )
}

export default EditPostForm
