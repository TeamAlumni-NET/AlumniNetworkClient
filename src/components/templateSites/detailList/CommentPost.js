import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser, getProfileUser } from "../../../reducers/userSlice"
import { getUser } from "../../../services/user/UserService"

const CommentPost = ({ comment }) => {
  const { profileUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  console.log(profileUser, comment)

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getProfileUser(comment.user))
  }, [dispatch])

  return (
    <Card>
      <CardContent>
        <Typography>{comment.content}</Typography>
      </CardContent>
      <CardHeader
        avatar={<Avatar src={profileUser?.url} />}
        title={`${profileUser?.firstName} ${profileUser?.lastName}`}
        subheader={`@${profileUser?.username}`}
      />
    </Card>
  )
}

export default CommentPost
