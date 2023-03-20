import React, { useEffect, useState } from 'react'
import { Button, InputLabel, MenuItem, Select, TextField, Container, Alert } from "@mui/material"
import { strings } from "../../utils/localization"
import keycloak from '../../keycloak'
import { Box } from '@mui/system'






const CreatePostForm = () => {
    const [postTitle, setPostTitle] = useState('')
    const [content, setContent] = useState('')

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

   
    const submitPost = {
        postTitle: postTitle,
        content: content,
        userId: JSON.parse(localStorage.getItem("currentUser")).id,
        topicId: topicId,
        groupId: groupId
        //timeStamp: Date(), hoidetaan backissa
        //targetUserId:
        //parentPostId:
        //eventId:
    }

    const data = JSON.stringify(submitPost)

   
    function handleSubmit(event) {
        event.preventDefault()
        console.log(submitPost)
    }
        

   

   

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
        
        <form onSubmit={handleSubmit}>
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
                <InputLabel id="group">{stringList.group}</InputLabel>
                <Select
                    required
                    labelId="group"
                    id="group"
                    value={groupId}
                    label="Group"
                    autoWidth
                    style={{ minWidth: '200px' }}
                    onChange={e => setGroupId(e.target.value)}
                >   
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {groups.map(group =>
                        <MenuItem key={group.id} value={group.id}>{group.id} {group.name}</MenuItem>
                    )}
                </Select>
            </div>

            <div>
                <InputLabel id="topic">{stringList.topic}</InputLabel>
                <Select
                    
                    labelId="topic"
                    id="topic"
                    value={topicId}
                    label="Topic"
                    autoWidth
                    style={{ minWidth: '200px' }}
                    onChange={e => setTopicId(e.target.value)}
                >   
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {topics.map(topic =>
                        <MenuItem key={topic.id} value={topic.id}>{topic.id} {topic.name}</MenuItem>
                    )}
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
            <Button type="submit">{stringList.post}</Button>
        </Box>

        </form>
        
    </Container>
  )
}
export default CreatePostForm  