import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../../reducers/currentPageSlice"

/**
 * Renders selected main post and it's childposts as card.
 * @param {Object} post Current post data
 * @param {Function} childPost Function for rendering childposts  as list
 * @param {string} search user input for rendering child posts
 * @returns  {JSX.Element} Rendered GroupTopicCard
 */
const GroupTopicCard = ({ post, childPost, search }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
          <CardContent>
            <Typography>{post.content}</Typography>
          </CardContent>
          <CardHeader
            avatar={
              <Avatar
                src={post.user.pictureUrl}
                sx={{ boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.75)" }}
              />
            }
            title={`${post.user.firstName} ${post.user.lastName}`}
            subheader={`@${post.user.username}`}
            onClick={() => {
              dispatch(
                dispatch(
                  saveNavigate({ url: post.user.username, id: post.user.id })
                )
              )
              navigate(`/profile/${post.user.username.replace(/\s/g, "_")}`)
            }}
          ></CardHeader>
        </Box>
        <CardActions mr={"10px"}>
          <IconButton
            onClick={() => {
              dispatch(dispatch(saveNavigate({ url: post.title, id: post.id })))
              navigate(`../post/${post.title.replace(/\s/g, "_")}`, {
                replace: true,
              })
            }}
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
