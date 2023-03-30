import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import EditPostForm from "../../pages/post/EditPostForm"
import EditIcon from "@mui/icons-material/Edit"
import { format } from "date-fns"
import { saveNavigate } from "../../../reducers/currentPageSlice"
import { useNavigate } from "react-router-dom"

const CommentPost = ({ comment, thread = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openEdit, setOpenEdit] = useState(false)
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || ""
  )
  const time = comment?.timeStamp
    ? format(new Date(comment?.timeStamp), "HH:m d.MM.yyyy")
    : ""
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
    setLocalUser(JSON.parse(localStorage.getItem("currentUser")))
  }, [localStorage.getItem("currentUser")])
  return (
    <Container sx={{ width: "90%" }}>
      <Card sx={{ borderRadius: 0 }}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ alignSelf: "center" }}>
            {comment.content}
          </Typography>
          {thread && localUser.id === comment.user.id && (
            <IconButton onClick={() => handleOpenEdit(comment)}>
              <EditIcon />
            </IconButton>
          )}
        </CardContent>

        <CardHeader
          avatar={
            <Avatar
              src={comment?.user.pictureUrl}
              sx={{ boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.75)" }}
            />
          }
          title={`${comment?.user.firstName} ${comment?.user.lastName}`}
          subheader={
            <>
              <p
                style={{ padding: "0", margin: "0" }}
              >{`@${comment?.user.username}`}</p>
              <p style={{ padding: "0", margin: "0", fontSize: "11px" }}>
                {time}
              </p>
            </>
          }
          onClick={() => {
            dispatch(
              dispatch(saveNavigate({ url: comment.username, id: comment.id }))
            )
            navigate(`/profile/${comment.user.username.replace(/\s/g, "_")}`)
          }}
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
