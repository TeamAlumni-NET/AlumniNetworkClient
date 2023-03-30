import { useState } from "react"
import { Button, InputLabel, TextField, Drawer } from "@mui/material"
import { strings } from "../../../utils/localization"
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux'
import { editPost } from '../../../reducers/postsSlice'
import { editComment } from '../../../reducers/eventsSlice'

/**
 * Renders a drawer for creating editing posts
 * @param {{id: number, title: string,content: string}} defaultdata For setting defaul values for the post. All are optional.
 * @param {Boolean} openDialog Defines if this component is shown.
 * @param {ReferenceState} setOpenDialog For closing this component.
 * @returns {JSX.Element} Rendered EditPostForm
 */
const EditPostForm = ({ defaultdata, openDialog, setOpenDialog }) => {
  const dispatch = useDispatch()
  const [edit, setEditPost] = useState(defaultdata)

  /**
   * Closes this component and sets parameters to default
   * @returns {void}
   */
  const handleClose = () => {
    setOpenDialog(false)
  }

  /**
   * Submints edited post
   * @returns {void}
   */
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
