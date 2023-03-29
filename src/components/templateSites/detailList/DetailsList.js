import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  IconButton,
  CardHeader,
} from "@mui/material"
import { useEffect, useState } from "react"
import { strings } from "../../../utils/localization"
import CalendarDrawerView from "../../calendar/CalendarDrawerView"
import JoinOrLeave from "./JoinOrLeave"
import AddIcon from "@mui/icons-material/Add"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import GroupTopicCard from "./GroupTopicCard"
import CreatePostForm from "../../pages/post/CreatePostForm"
import EventCard from "./EventCard"
import { useSelector } from "react-redux"
import CommentPost from "./CommentPost"
import CreateEventPage from "../../pages/event/CreateEventPage"

const DetailsList = ({
  stringList,
  data,
  timeline,
  events,
  dashboard = false,
  defaultType,
}) => {
  const [defaultdata, setDefaultdata] = useState({})
  const [search, setSearch] = useState("")
  const [posts, setPosts] = useState(data)
  const [opencalendar, setOpenCalendar] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { url, id } = useSelector((state) => state.currentPage)
  const [openDialogEvent, setOpenDialogEvent] = useState(false)
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
                childPost.user.username?.toLowerCase().includes(search)
            ).length !== 0
        )
      )
    }
  }, [search, data])

  const handleOpenDialog = (e) => {
    e.preventDefault()
    if (defaultType !== undefined) {
      const newData = {
        nameForForm: url,
        groupId: null,
        topicId: null,
        targetGroup: null,
        targetTopic: null,
      }
      if (defaultType === "group") {
        newData.groupid = id
        newData.targetGroup = url
      } else {
        newData.topicId = id
        newData.targetTopic = url
      }
      setDefaultdata(Object.assign(defaultdata, newData))
    }
    setOpenDialog(true)
  }

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
        return <CommentPost comment={childPost} key={i} />
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
        if (post.startTime) {
          const rawTime = new Date(post.startTime)
          time = `${rawTime.getHours()}:${rawTime.getMinutes()} ${rawTime.getDate()}.${
            rawTime.getMonth() + 1
          }.${rawTime.getFullYear()}`
        }

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
                <IconButton
                  color="secondary"
                  onClick={() => setOpenCalendar(true)}
                >
                  <CalendarMonthIcon />
                </IconButton>
              )}
              <Button
                onClick={(e) => handleOpenDialog(e)}
                variant="contained"
                sx={{ mr: "5px", ml: "5px" }}
                size="small"
              >
                <AddIcon />
                {strings.timeline.createNew}
              </Button>

              <Button
                onClick={() => setOpenDialogEvent(true)}
                variant="contained"
                sx={{ mr: "5px", ml: "5px" }}
                size="small"
              >
                <AddIcon />
                {strings.createEvent.title}
              </Button>

              <TextField
                size="small"
                variant="outlined"
                label={stringList.search}
                onChange={handleChange}
              />
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
                open={opencalendar}
                setOpen={setOpenCalendar}
                title={stringList.title}
              />
            </Box>
            <Box sx={{ mt: "50px" }}>{list()}</Box>
          </>
        )}
      </Container>
      {openDialog && (
        <CreatePostForm
          defaultdata={defaultdata}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      {openDialogEvent && (
        <CreateEventPage
          openDialogEvent={openDialogEvent}
          setOpenDialogEvent={setOpenDialogEvent}
        />
      )}
    </>
  )
}
export default DetailsList
