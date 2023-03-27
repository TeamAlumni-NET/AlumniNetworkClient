import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Container, display } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupTopicCard = ({ post, url }) => {
  const navigate = useNavigate();
  return (
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
      <Box mr={"10px"}>
        <IconButton
          onClick={() => navigate(`${url}/${post.title.replace(/\s/g, "_")}`)}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default GroupTopicCard;
