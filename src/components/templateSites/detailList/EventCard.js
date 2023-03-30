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
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../../reducers/currentPageSlice"

/**
 * Renders selected event information and its childposts.
 * @param {Object} post Current event data
 * @param {String} time Post's timestamp as string
 * @param {Function} childPost Function for rendering childposts  as list
 * @param {string} search user input for rendering child posts
 * @returns {JSX.Element} rendered EventCard
 */
const EventCard = ({ post, time, childPost, search }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  /**
   * Checks what kind of header Eventcard needs.
   * @returns {String} Header of eventcard
   */
  const getTopicOrGroupText = () => {
    let topicsOrGroups =
      post.group?.length > 0
        ? strings.group.groups
        : post.topics?.length > 0
          ? strings.topic.topics
          : ""

    if (topicsOrGroups === strings.group.groups) {
      post.group?.forEach((element) => {
        topicsOrGroups += element
      })
    } else {
      post.topic?.forEach((element) => {
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
          sx={{
            ml: "15px",
            mr: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CalendarMonthIcon /> <>{strings.calendar.event}</>
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
            <CardHeader title={post?.name} subheader={getTopicOrGroupText()} />
            <Divider />
            <CardHeader
              avatar={<AccessTimeIcon />}
              title={strings.common.start + ":"}
              subheader={time}
            />
          </Box>
          <CardActions mr={"10px"}>
            <IconButton
              onClick={() => {
                dispatch(saveNavigate({ url: post?.name, id: post?.id }))
                navigate(`../event/${post.name?.replace(/\s/g, "_")}`, {
                  replace: true,
                })
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
      {search !== "" &&
        post.childPosts?.length > 0 &&
        childPost(post.childPosts)}
    </>
  )
}

export default EventCard
