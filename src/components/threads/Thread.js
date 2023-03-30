import React, { useEffect, useState } from "react"
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Typography,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../reducers/currentPageSlice"
import { format } from "date-fns"
import { strings } from "../../utils/localization"

/**
 * Renders card of the main post
 * @param {Object} post The main post
 * @param {Funktion} handleOpenDialog Sets newData values and opens dialog for creating post
 * @param {Funktion} handleOpenEdit Sets editData values and opens post edition
 * @returns  {JSX.Element} Rendered Thread
 */
const Thread = ({ post, handleOpenDialog, handleOpenEdit }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const time = post?.timeStamp
    ? format(new Date(post?.timeStamp), "HH:m d.MM.yyyy")
    : ""
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || ""
  )

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem("currentUser")))
  }, [localStorage.getItem("currentUser")])

  return (
    <>
      <Card
        sx={{
          width: "100%",
        }}
      >
        <Box>
          <CardHeader title={post?.title} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Container sx={{ flexGrow: "1" }}>
              <Divider />
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Typography>{post?.content}</Typography>
              </CardContent>
              <CardHeader
                avatar={
                  <Avatar
                    src={post?.user?.pictureUrl}
                    sx={{ boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.75)" }}
                  />
                }
                title={`${post?.user?.firstName} ${post?.user?.lastName}`}
                subheader={
                  <>
                    <p
                      style={{ padding: "0", margin: "0" }}
                    >{`@${post?.user?.username}`}</p>
                    <p style={{ padding: "0", margin: "0", fontSize: "11px" }}>
                      {time}
                    </p>
                  </>
                }
                onClick={() => {
                  dispatch(
                    dispatch(
                      saveNavigate({
                        url: post.user.username,
                        id: post.user.id,
                      })
                    )
                  )
                  navigate(
                    `/profile/${post?.user?.username.replace(/\s/g, "_")}`
                  )
                }}
              />
            </Container>
            <Box sx={{ alignItems: "end", display: "flex" }}>
              {post.userId !==
              JSON.parse(localStorage.getItem("currentUser")).id ? (
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={() => handleOpenDialog({})}
                  >
                    {strings.postThread.answer}
                    <SendIcon sx={{ ml: 1 }} />
                  </Button>
                ) : (
                  <Button onClick={() => handleOpenEdit(post)}>
                    {strings.postThread.edit}
                    <SendIcon sx={{ ml: 1 }} />
                  </Button>
                )}
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default Thread
