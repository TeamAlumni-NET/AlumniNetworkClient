import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  IconButton,
  CardHeader
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { strings } from "../../../utils/localization"
import CalendarDrawerView from "../../calendar/CalendarDrawerView"
import JoinOrLeave from "./JoinOrLeave"
import AddIcon from "@mui/icons-material/Add"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import GroupTopicCard from "./GroupTopicCard"
import CreatePostForm from "../../pages/post/CreatePostForm"
import EventCard from "./EventCard"

const DetailsList = ({ stringList, data, timeline, events, dashboard = false, }) => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [posts, setPosts] = useState(data)
  const [opencalendar, setOpenCalendar] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    if (search === "") setPosts(data)
    else {
      setPosts(
        data.filter(
          (value) =>
            value.title?.toLowerCase().includes(search) ||
            value.name?.toLowerCase().includes(search) ||
            value.content?.toLowerCase().includes(search) ||
            value.user?.username?.toLowerCase().includes(search) ||
            value.childPosts?.filter(
              (childPost) =>
                childPost.content?.toLowerCase().includes(search) ||
                childPost.user?.toLowerCase().includes(search)
            ).length !== 0
        )
      )
    }
  }, [search, data])
  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const childPost = (currentPost) => {
    const listOfPosts = currentPost.filter(
      (p) =>
        p.content?.toLowerCase().includes(search) ||
        p.user?.username?.toLowerCase().includes(search)
    )

    const childPostList = (post) => {
      return post.map((childPost, i) => {
        return (
          <Card key={i}>
            <CardContent>{childPost.content}</CardContent>
            <CardHeader subheader={"@" + childPost.user} />
          </Card>
        )
      })
    }
    if (listOfPosts.length === 0) return <></>

    return childPostList(listOfPosts)
  }

  const list = () => {
    if (posts.length > 0) {
      if (!posts[0].group && !posts[0].topic) return <>Loading</>
      return posts.map((post, i) => {
        let time = ""
        let url = ""
        if (post.startTime) {
          const rawTime = new Date(post.startTime)
          time = `${rawTime.getHours()}:${rawTime.getMinutes()} ${rawTime.getDate()}.${
            rawTime.getMonth() + 1
          }.${rawTime.getFullYear()}`
        }
        if (post.group) url = `/group/${post.group}`
        else if (post.topic) url = `/topic/${post.topic}`

        return (
          <Container key={i} maxWidth="sm" sx={{ mt: "10px" }}>
            {post.title ? (
              <GroupTopicCard
                post={post}
                stringList={stringList}
                search={search}
                time={time}
                childPost={childPost}
              />
            ) : (
              <EventCard
                post={post}
                stringList={stringList}
                time={time}
                search={search}
                childPost={childPost}
              />
            )}
          </Container>
        )
      })
    } else {
      return <>No posts</>
    }
  }
  return (
    <>
      <Container sx={{ mt: "50px" }}>
        {!posts ? (
          <>Couldnt connect to the database</>
        ) : dashboard ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              variant="outlined"
              label={stringList.search}
              onChange={handleChange}
              fullWidth
              sx={{ maxWidth: "550px", mb: "20px" }}
            />
            {list()}
          </Box>
        ) : (
          <>
            <Box className="header" style={{ display: "flex" }}>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                {stringList.title}
              </Typography>
              {!timeline && (
                <IconButton color="secondary" onClick={() => setOpenCalendar(true)}>
                  <CalendarMonthIcon />
                </IconButton>
              )}
              <Button
                onClick={() => setOpenDialog(true)}
                variant="contained"
                sx={{ mr: "5px", ml: "5px" }}
                size="small"
              >
                <AddIcon />
                {strings.common.create}
              </Button>
              <TextField
                size="small"
                variant="outlined"
                label={stringList.search}
                onChange={handleChange}
              />
              {!timeline &&
              <JoinOrLeave
                type={
                  window.location.href.indexOf("group") > -1
                    ? "groups"
                    : "topics"
                }
              />
              }
              {!timeline && (
                <JoinOrLeave
                  type={
                    window.location.href.indexOf("group") > -1
                      ? "groups"
                      : "topics"
                  }
                />
              )}
              <CalendarDrawerView
                events={events}
                opencalendar={opencalendar}
                setOpenCalendar={setOpenCalendar}
                title={stringList.title}
              />
            </Box>
            {list()}
          </>
        )}
      </Container>
      {openDialog && 
      <CreatePostForm
        defaultdata={{}}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />}
    </>
  )
}
export default DetailsList
