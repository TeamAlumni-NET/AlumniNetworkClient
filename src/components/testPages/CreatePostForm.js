import { useEffect, useState } from 'react'
import { Button, FormControlLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography} from "@mui/material"
import { strings } from "../../utils/localization"
import { Box } from '@mui/system'
import { getGroupAsList } from '../../reducers/groupsSlice'
import { getTopicAsList } from '../../reducers/topicsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { postNewPost } from '../../reducers/postSlice'


const CreatePostForm = (target, id) => {
  const dispatch = useDispatch()
  const {groups} = useSelector(state => state.groupList)
  const {topics} = useSelector(state => state.topicList)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    topicId: null,
    groupId: null,
    targetUserId: null,
    parentPostId: null,
    eventId: null,
    userId: JSON.parse(localStorage.getItem("currentUser")).id
  })

  const stringList = {
    title: strings.createPostForm.title,
    postTitle: strings.createPostForm.postTitle,
    group: strings.createPostForm.group,
    topic: strings.createPostForm.topic,
    content: strings.createPostForm.content,
    none: strings.createPostForm.none,
    post: strings.createPostForm.post,
    newGroup: strings.createPostForm.newGroup,
    newTopic: strings.createPostForm.newTopic
  }

  //Check if works... 
  if (target == "event"){
    setNewPost.eventId = id
  } else if (target == "group"){
    setNewPost.groupId = id
  } else if (target == "topic"){
    setNewPost.topicId = id
  } else if (target == "targetUser"){
    setNewPost.targetUserId = id
  } else if (target == "parentPost"){
    setNewPost.parentPostId = id
  }

  useEffect(() => {
    dispatch(getGroupAsList())
    dispatch(getTopicAsList())
  }, [dispatch])

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(postNewPost(newPost))
    console.log(newPost)
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{padding: 20}}>
        <Box sx={{  
          display: 'flex',
          flexDirection: 'column',
        }} >

          <h1>{stringList.title}</h1>
          <div>
            <InputLabel variant='standard'>{stringList.postTitle}</InputLabel>
            <TextField
              required
              id='outlined-required'
              defaultValue=""
              onChange={e => setNewPost(newPost => ({
                ...newPost,
                title: e.target.value,
              }))}
            />
          </div>

          <InputLabel id="group">{stringList.group}</InputLabel>
          <Box sx={{  
            display: 'flex',
            flexDirection: 'row',
          }}>
            
            <Select
              style={{ minWidth: '200px' }}
              required
              autoWidth
              disabled = {newPost.topicId !== null}
              labelId="group"
              value={newPost.groupId || ""}
              defaultValue=""
              onChange={e => setNewPost(newPost => ({
                ...newPost,
                groupId: e.target.value,
              }))}
            >   
              {groups.map(group =>
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              )}
            </Select>

          <Box sx={{  
            display: 'flex',
            flexDirection: 'row',
            pl:5,
            }}></Box>
            <Button size="small" onClick={handleOpen}>{stringList.newGroup}</Button>
          </Box>

          <InputLabel id="topic">{stringList.topic}</InputLabel>
        <Box sx={{  
            display: 'flex',
            flexDirection: 'row',
            }}>
            
            <Select
              style={{ minWidth: '200px' }}
              required
              autoWidth
              disabled = {newPost.groupId !== null}
              labelId="topic"
              value={newPost.topicId || ""}
              defaultValue=""
              onChange={e => setNewPost(newPost => ({
                    ...newPost,
                    topicId: e.target.value,
              }))}
            >   
              {topics.map(topic =>
                <MenuItem key={topic.id} value={topic.id}>{topic.name}</MenuItem>
              )}
            </Select>

            <Box sx={{  
                display: 'flex',
                flexDirection: 'row',
                pl:5,
                }}>
                
                <Button size="small">{stringList.newTopic}</Button>
            </Box>
        </Box>

        <div>
        <InputLabel variant='standard'>{stringList.content}</InputLabel>
            <TextField
              required
              fullWidth
              multiline
              minRows={5}
              id='outlined-required'
              defaultValue=""
              onChange={e => setNewPost(newPost => ({
                ...newPost,
                content: e.target.value,
              }))}
            />
        </div>

        </Box>
        <Button type="submit">{stringList.post}</Button>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             {stringList.newGroup}
            </Typography>
             <form>
                    
                <div>
                    <InputLabel variant='standard'>Group name</InputLabel>
                    <TextField
                    required
                    id='outlined-required'
                    defaultValue=""
                    //onChange={}
                    />
                </div>
                <div>
                    <InputLabel variant='standard'>Group description</InputLabel>
                    <TextField
                    required
                    id='outlined-required'
                    defaultValue=""
                    //onChange={}
                    />
                </div>
                <div>
                <InputLabel variant='standard'>Privacy</InputLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                </RadioGroup>
                </div>

            </form>
            <Button onClick={handleClose}>Add group</Button>
        </Box>
        </Modal>

    </form>        
    </>
  )
}

export default CreatePostForm  