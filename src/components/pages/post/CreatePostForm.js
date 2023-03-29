import { useEffect, useState } from "react"
import {
  Autocomplete,
  Button,
  InputLabel,
  TextField,
  createFilterOptions,
  Dialog,
  DialogActions,
  Drawer,
} from "@mui/material"
import { strings } from "../../../utils/localization"
import { Box } from "@mui/system"
import { getGroupAsList } from "../../../reducers/groupsSlice"
import { getTopicAsList } from "../../../reducers/topicsSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  getDashboardPostsList,
  getGroupPostsList,
  getPostsAsList,
  getTopicPostsList,
  postNewPost,
} from "../../../reducers/postsSlice"
//import snarkdown from 'snarkdown'
import CreateGroupTopic from "../../templateSites/groupTopicList/CreateGroupTopic"
import { createGroupTopic as createGroupTopicService } from "../../../services/group/groupsTopicsService"
import { getCurrentUser } from "../../../reducers/userSlice"

const initialState = {
  title: null,
  content: null,
  topicId: null,
  groupId: null,
  targetUserId: null,
  parentPostId: null,
  eventId: null,
  user: null,
}

const CreatePostForm = ({ defaultdata, openDialog, setOpenDialog }) => {
  const dispatch = useDispatch()
  const filter = createFilterOptions()
  const { groups } = useSelector((state) => state.groupList)
  const { topics } = useSelector((state) => state.topicList)
  const [showCreateNew, setShowCreateNew] = useState(false)
  const [type, setType] = useState("group")
  const [createNewGroupTopic, setCreateNewGroupTopic] = useState("")
  const [newPost, setNewPost] = useState(initialState)
  const { user } = useSelector((state) => state.user)
  const { id, url } = useSelector((state) => state.currentPage)

  useEffect(() => {
    for (const [key, value] of Object.entries(defaultdata)) {
      if (
        key.toString() !== "nameForForm" &&
        key.toString() !== "targetUserName" &&
        key.toString() !== "targetGroup" &&
        key.toString() !== "targetTopic"
      ) {
        setNewPost((newPost) => ({
          ...newPost,
          [key]: value,
        }))
      }
    }
  }, [])

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getCurrentUser())
    dispatch(getGroupAsList())
    dispatch(getTopicAsList())
  }, [dispatch])

  if (newPost.user === null && user?.username !== undefined) {
    setNewPost((newPost) => ({
      ...newPost,
      user: user,
    }))
  }

  const handleClose = () => {
    setOpenDialog(false)
    setCreateNewGroupTopic("")
    setNewPost(initialState)
  }

  const handleSubmit = async () => {
    if (createNewGroupTopic !== "") {
      const response = await createGroupTopicService(
        createNewGroupTopic,
        `${type}s`
      )
      if (type === "group") newPost.groupId = response.id
      else newPost.topicId = response.id
    }
    dispatch(
      postNewPost({
        data: newPost,
        targetUser: defaultdata.targetUserName,
        targetGroup: defaultdata.targetGroup,
        targetTopic: defaultdata.target,
      })
    )
    dispatch(getPostsAsList())
    dispatch(getDashboardPostsList())
    if (window.location.href.indexOf("group") > -1)
      dispatch(getGroupPostsList(id))
    else if (window.location.href.indexOf("topic") > -1)
      dispatch(getTopicPostsList(id))
    handleClose()
  }

  const autoCompleteRender = (completetype) => {
    const isDisabled = () => {
      if (completetype !== type) {
        if (createNewGroupTopic !== "") return true
        else if (completetype === "topic") {
          if (newPost.groupId !== null) return true
        } else {
          if (newPost.topicId !== null) return true
        }
        return false
      }
      return false
    }

    return (
      <Autocomplete
        disabled={isDisabled()}
        sx={{ width: 250 }}
        options={completetype === "group" ? groups : topics}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option
          if (option.inputValue) return option.inputValue
          if (option === null) return ""
          return option.name
        }}
        renderInput={(params) => <TextField {...params} label="" />}
        selectOnFocus
        clearOnBlur
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              setType(completetype)
              setShowCreateNew(true)
              setCreateNewGroupTopic(newValue)
            })
          } else if (newValue && newValue.inputValue) {
            setType(completetype)
            setShowCreateNew(true)
            setCreateNewGroupTopic(newValue.inputValue)
          } else if (newValue === null) {
            setCreateNewGroupTopic("")
            setNewPost((newPost) => ({
              ...newPost,
              topicId: null,
              groupId: null,
            }))
          } else {
            if (completetype === "group") {
              setNewPost((newPost) => ({
                ...newPost,
                groupId: newValue.id,
              }))
            } else {
              setType("topic")
              setNewPost((newPost) => ({
                ...newPost,
                topicId: newValue.id,
              }))
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `add ${params.inputValue}`,
            })
          }
          return filtered
        }}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
      />
    )
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
          {defaultdata?.parentPostId === undefined ? (
            <h1>{strings.createPostForm.title}</h1>
          ) : (
            <h1>{strings.createPostForm.titleAnswer}</h1>
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {defaultdata?.parentPostId === undefined && (
              <div>
                <InputLabel variant="standard">
                  {strings.createPostForm.postTitle}
                </InputLabel>
                <TextField
                  required
                  id="outlined-required"
                  defaultValue=""
                  sx={{ width: 300 }}
                  onChange={(e) =>
                    setNewPost((newPost) => ({
                      ...newPost,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
            )}
            {defaultdata?.nameForForm === undefined &&
              defaultdata?.parentPostId === undefined && (
                <>
                  <div>
                    <InputLabel id="group">
                      {strings.createPostForm.group}
                    </InputLabel>
                    {autoCompleteRender("group")}
                  </div>
                  <div>
                    <InputLabel id="topic">
                      {strings.createPostForm.topic}
                    </InputLabel>
                    {autoCompleteRender("topic")}
                  </div>
                </>
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
              defaultValue=""
              onChange={(e) =>
                setNewPost((newPost) => ({
                  ...newPost,
                  content: e.target.value,
                }))
              }
            />
          </div>
        </Box>

        {showCreateNew && (
          <CreateGroupTopic
            type={type}
            showCreateNew={showCreateNew}
            setShowCreateNew={setShowCreateNew}
            createGroupTopic={createNewGroupTopic}
            setCreateGroupTopic={setCreateNewGroupTopic}
          />
        )}
        <Button onClick={handleClose}>{strings.common.cancel}</Button>
        <Button onClick={handleSubmit}>{strings.createPostForm.post}</Button>
      </form>
    </Drawer>
  )
}

export default CreatePostForm
