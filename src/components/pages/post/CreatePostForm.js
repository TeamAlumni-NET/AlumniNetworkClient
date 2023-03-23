import { useEffect, useState } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField} from "@mui/material"
import { strings } from "../../../utils/localization"
import { Box } from '@mui/system'
import { getGroupAsList } from '../../../reducers/groupsSlice'
import { getTopicAsList } from '../../../reducers/topicsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { postNewPost } from '../../../reducers/postSlice'
import CreateGroup from '../group/CreateGroup'
import CreateTopic from '../topic/CreateTopic'
import snarkdown from 'snarkdown'
import CreateGroupTopic from '../../templateSites/groupTopicList/CreateGroupTopic'


const CreatePostForm = (target, id) => {
  const dispatch = useDispatch()
  const {groups} = useSelector(state => state.groupList)
  const {topics} = useSelector(state => state.topicList)
  const [showCreateNew, setShowCreateNew] = useState(false)
  const [type, setType] = useState("group")

  
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
    post: strings.createPostForm.post
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

  /*test snarkdown
  let md = '_this_ is **easy** to `use`.';
  let html = snarkdown(md);
  console.log(html);
  */

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
            }}>
              <Button size="small" onClick={() => {setShowCreateNew(true); setType("group")}}>{strings.createGroup.newGroup}</Button>
            </Box>
            
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
              <Button size="small" onClick={() => {setShowCreateNew(true); setType("topic")}}>{strings.createTopic.newTopic}</Button>
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

        {showCreateNew &&
          <CreateGroupTopic
            type={type}
             showCreateNew={showCreateNew}
            setShowCreateNew={setShowCreateNew}
        />}

        <Button type="submit">{stringList.post}</Button>

    </form>        
    </>
  )
}

export default CreatePostForm  