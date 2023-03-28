import {
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"
import { strings } from "../../../utils/localization"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

const EventCard = ({ post, time, childPost, search }) => {
  const navigate = useNavigate()

  const getTopicOrGroupText = () => {
    let topicsOrGroups =
      post.group.length > 0 ? strings.group.groups : strings.topic.topics

    if (topicsOrGroups === strings.group.groups) {
      post.group.forEach((element) => {
        topicsOrGroups += element
      })
    } else {
      post.topic.forEach((element) => {
        topicsOrGroups += element
      })
    }

    return topicsOrGroups
  }
  return (
    <>
      <Card
        sx={{
          background: "aliceblue",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ ml: "15px", mr: "15px", display: "flex", alignItems: "center" }}
        >
          <CalendarMonthIcon /> Event
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignSelf: "start",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <CardHeader title={post.name} subheader={getTopicOrGroupText()} />
            <Divider />
            <CardHeader
              avatar={<AccessTimeIcon />}
              title={strings.common.start + ":"}
              subheader={time}
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
        </Box>
      </Card>
      {search !== "" &&
        post.childPosts.length > 0 &&
        childPost(post.childPosts)}
    </>
  )
}

export default EventCard
