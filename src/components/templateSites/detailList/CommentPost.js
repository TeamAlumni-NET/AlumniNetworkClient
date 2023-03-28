import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, getProfileUser } from "../../../reducers/userSlice"
import { getUser } from "../../../services/user/UserService"
import EditPostForm from "../../pages/post/EditPostForm"
import EditIcon from "@mui/icons-material/Edit"

const CommentPost = ({ comment, thread = false }) => {
  const { profileUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    id: null,
    title: null,
    content: null,
  })

  const handleOpenEdit = (dataToEdit) => {
    setEditData({
      title: dataToEdit.title,
      content: dataToEdit.content,
      id: dataToEdit.id,
    })
    setOpenEdit(true)
  }

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getProfileUser(thread ? comment.user.username : comment.user))
  }, [dispatch])

  return (
    <Container sx={{ width: "80%" }}>
      <Card sx={{ borderRadius: 0 }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ alignSelf: "center" }}>
            {comment.content}
          </Typography>
          <IconButton onClick={() => handleOpenEdit(comment)}>
            <EditIcon />
          </IconButton>
        </CardContent>

        <CardHeader
          avatar={
            <Avatar
              src={profileUser?.pictureUrl}
              sx={{ boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.75)" }}
            />
          }
          title={`${profileUser?.firstName} ${profileUser?.lastName}`}
          subheader={`@${profileUser?.username}`}
        />
      </Card>
      <EditPostForm
        defaultdata={editData}
        openDialog={openEdit}
        setOpenDialog={setOpenEdit}
      />
    </Container>
  )
}

export default CommentPost
