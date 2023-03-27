import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const GroupTopicCard = ({ post, url, childPost, search }) => {
  const navigate = useNavigate()
  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <CardHeader title={post.title} />
          <Divider />
          <CardContent>{post.content} </CardContent>
          <CardHeader
            avatar={<Avatar src={post.user.pictureUrl} />}
            title={`${post.user.firstName} ${post.user.lastName}`}
            subheader={`@${post.user.username}`}
            onClick={() => navigate(`/profile/${post.user.id}`)}
          ></CardHeader>
        </Box>
        <CardActions mr={"10px"}>
          <IconButton
            onClick={() => navigate(`../post/${post.id}`, { replace: true })}
          >
            <NavigateNextIcon />
          </IconButton>
        </CardActions>
      </Card>
      {search !== "" &&
        post.childPosts.length > 0 &&
        childPost(post.childPosts)}
    </>
  )
}

export default GroupTopicCard
