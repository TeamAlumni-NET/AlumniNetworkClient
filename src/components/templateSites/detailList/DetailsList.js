import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
  Box,
  IconButton,
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

const DetailsList = ({ stringList, data, timeline, events, group }) => {
  const navigate = useNavigate()
  const defaultData = {}
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
    console.log(e.target.value)
    setSearch(e.target.value.toLowerCase())
  }

  // const childPost = (currentPost) => {
  //   const listOfPosts = currentPost.filter(
  //     (p) =>
  //       p.content?.toLowerCase().includes(search) ||
  //       p.user?.username?.toLowerCase().includes(search)
  //   )

  //   const childPostList = (post) => {
  //     return post.map((childPost) => {
  //       return (
  //         <>
  //           <Typography variant="body2">
  //             {childPost.user}: {childPost.content}
  //           </Typography>
  //         </>
  //       )
  //     })
  //   }
  //   if (listOfPosts.length === 0) return <></>

  //   return <CardContent>{childPostList(listOfPosts)}</CardContent>
  // }
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
          <Container key={i} maxWidth="sm" sx={{ mt: "40px" }}>
            {post.title ? (
              // <Card
              //   key={post.id + post.title}
              //   sx={{ maxWidth: "600px", mt: "20px" }}
              // >
              //   <CardContent>
              //     <Typography
              //       variant="body2"
              //       onClick={() => navigate(`/profile/${post.user}`)}
              //     >
              //       {post.user}
              //     </Typography>
              //     <Button
              //       variant="body1"
              //       sx={{ marginLeft: "20%" }}
              //       onClick={() => {
              //         navigate(`${url}/${post.title.replace(/\s/g, "_")}`)
              //       }}
              //     >
              //       {post.title}
              //     </Button>
              //     {post.group ? (
              //       <Typography variant="body2">
              //         {stringList.group}
              //         {post.group}
              //       </Typography>
              //     ) : (
              //       <Typography variant="body2">
              //         {stringList.topic}
              //         {post.topic}
              //       </Typography>
              //     )}
              //   </CardContent>
              //   {search !== "" &&
              //     post.childPosts.length > 0 &&
              //     childPost(post.childPosts)}
              // </Card>
              <GroupTopicCard
                post={post}
                stringList={stringList}
                search={search}
                time={time}
              />
            ) : (
              <Card
                key={post.id + post.name}
                sx={{ width: "100%", background: "aliceblue" }}
              >
                <CardContent>
                  {post.group.length !== 0 ? (
                    <Typography variant="body2">
                      {stringList.group}
                      {post.group}
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {stringList.topic}
                      {post.topic}
                    </Typography>
                  )}
                  <Button
                    variant="body1"
                    sx={{ marginLeft: "20%" }}
                    onClick={() =>
                      navigate(
                        `/event/${post.name.replace(/\s/g, "_")}${post.id}`
                      )
                    }
                  >
                    {post.name}
                  </Button>
                  <Typography variant="body2">
                    {stringList.startingAt}
                  </Typography>
                  <Typography variant="body2">{time}</Typography>
                </CardContent>
                {/* {search !== "" &&
                  post.childPosts.length > 0 &&
                  childPost(post.childPosts)} */}
              </Card>
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
        ) : (
          <>
            <Box className="header" style={{ display: "flex" }}>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                {stringList.title}
              </Typography>
              {/* {!timeline && (
                  <Button color="secondary" onClick={() => setOpenCalendar(true)}>
                    {strings.common.calendar}
                  </Button>
                )}
                <Button onClick={() => navigate(`/createPostForm`)}>
                  {stringList.createNew}
                </Button> */}
              {!timeline && (
                <IconButton color="secondary" onClick={() => setOpenCalendar(true)}>
                  <CalendarMonthIcon />
                </IconButton>
              )}
              <IconButton onClick={() => setOpenDialog(true)}>
                <AddIcon />
              </IconButton>
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
        defaultdata={defaultData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />}
    </>
  )
}
export default DetailsList
