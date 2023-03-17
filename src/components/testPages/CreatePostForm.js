import React, { useEffect, useState } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField, Container, Alert } from "@mui/material"
import { strings } from "../../utils/localization"
import keycloak from '../../keycloak'
import { Box } from '@mui/system'




const CreatePostForm = () => {
    const [date, setDate] = useState('')

    const [postTitle, setPostTitle] = useState('')
    const [content, setContent] = useState('')

    const [userId, setUserId] = useState('')
    const [topicId, setTopicId] = useState('')
    const [groupId, setGroupId] = useState('')
    const [targetUserId, setTargetUserId] = useState('')
    const [parentPostId, setParentPostId] = useState('')
    const [eventId, setEventId] = useState('')


    const [groups, setGroups] = useState([])
    const [topics, setTopics] = useState([])
    
    useEffect (() => {
        const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + keycloak.token
            }
        fetch(process.env.REACT_APP_API_URL + `/api/groups`, {headers})
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => { 
                Alert.alert('Error', error);
            });
    }, [])

    useEffect (() => {
        const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + keycloak.token
            }
        fetch(process.env.REACT_APP_API_URL + `/api/topics`, {headers})
            .then(response => response.json())
            .then(data => setTopics(data))
            .catch(error => { 
                Alert.alert('Error', error);
            });
    }, [])

    //console.log(groups)
    //console.log(topics)

 

  const stringList = {
    title: strings.createPostForm.title,
    postTitle: strings.createPostForm.postTitle,
    group: strings.createPostForm.group,
    topic: strings.createPostForm.topic,
    content: strings.createPostForm.content,
    none: strings.createPostForm.none,
    post: strings.createPostForm.post
  }

  return (
    <Container>
        
        <form>
        <Box>
            <h1>{stringList.title}</h1>
            <div>
            <InputLabel variant='standard'>{stringList.postTitle}</InputLabel>
              <TextField
                required
                id='outlined-required'
                label={stringList.postTitle}
                defaultValue=""
                onChange={e => setPostTitle(e.target.value)}
              />
            </div>

            <div>
                <InputLabel variant='standard'>{stringList.group}</InputLabel>
                <Select
                    value={groups}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>{stringList.none}</em>
                    </MenuItem>
                </Select>
            </div>

            <div>
                <InputLabel variant='standard'>{stringList.topic}</InputLabel>
                <Select
                    value={topics}
                    displayEmpty
                >
                <MenuItem value="">
                        <em>{stringList.none}</em>
                    </MenuItem>

                </Select>
            </div>

            <div>
            <InputLabel variant='standard'>{stringList.content}</InputLabel>
              <TextField
                required
                minRows={4}
                fullWidth
                multiline
                id='outlined-required'
                label={stringList.content}
                defaultValue=""
                onChange={e => setContent(e.target.value)}
              />
            </div>
            <Button>{stringList.post}</Button>
        </Box>

        </form>

        
    </Container>
  )
}
export default CreatePostForm  