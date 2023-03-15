import * as React from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { strings } from "../../utils/localization"




const CreatePostForm = () => {
    const [group, setGroup] = React.useState('')
    const [topic, setTopic] = React.useState('')

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
    <>
        <div style={{margin: 20}}>
        <div>
            <h1>{stringList.title}</h1>
            <InputLabel variant='standard'>{stringList.postTitle}</InputLabel>
            <TextField 
            id="outlined-required" 
            variant="outlined"
            />
        </div>
      
        <div>
            <InputLabel variant='standard'>{stringList.group}</InputLabel>
            <Select
                value={group}
                displayEmpty
            >
                <MenuItem value="">
                    <em>{stringList.none}</em>
                </MenuItem>
                <MenuItem value={10}>test1</MenuItem>
                <MenuItem value={20}>test2</MenuItem>
            </Select>
        </div>

        <div>
            <InputLabel variant='standard'>{stringList.topic}</InputLabel>
            <Select
                value={topic}
                displayEmpty
            >
                <MenuItem value="">
                    <em>{stringList.none}</em>
                </MenuItem>
                <MenuItem value={10}>test1</MenuItem>
                <MenuItem value={20}>test2</MenuItem>
            </Select>
        </div>
   
        <div>
            <InputLabel variant='standard'>{stringList.content}</InputLabel>
            <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                rows={4}
                defaultValue="..."
            />
        </div>
        <Button>{stringList.post}</Button>
      </div>
    </>
  )
}
export default CreatePostForm  