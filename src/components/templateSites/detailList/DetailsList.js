import { Card, CardContent, Typography, Button, Container, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const DetailsList = ({stringList, data, timeline}) => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [posts, setPosts] = useState(data)

  useEffect(() => {
    if (search === "") setPosts(data)
    else {
      setPosts(data.filter(value => value.title?.toLowerCase().includes(search)
    || value.name?.toLowerCase().includes(search)
    || value.content?.toLowerCase().includes(search)
    || value.user?.toLowerCase().includes(search)
    || value.childPosts?.filter(childPost => 
      childPost.content?.toLowerCase().includes(search) 
      ||  childPost.user?.toLowerCase().includes(search)).length !== 0))
    }
  }, [search, data])

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase())
  }

  const childPost = (currentPost) => {
    const listOfPosts = currentPost.filter(p => 
      p.content?.toLowerCase().includes(search) 
      ||  p.user?.toLowerCase().includes(search))
    
    const childPostList = (post) =>{
      return post.map(childPost=> {
        return <>
          <Typography variant="body2">{childPost.user}: {childPost.content}</Typography>
        </>
      })
    }
    if (listOfPosts.length === 0) return <></>

    return (
      <CardContent>
        {childPostList(listOfPosts)}
      </CardContent>
    )
  }

  const list = () => { 
    if (posts){
      return posts.map(post => {
        let time = ""
        let url = ""
        if (post.startTime) {
          const rawTime = new Date(post.startTime)
          time = `${rawTime.getHours()}:${rawTime.getMinutes()} ${rawTime.getDate()}.${rawTime.getMonth()+1}.${rawTime.getFullYear()}`
        }
        if (post.group) url = `/group/${post.group}`
        else if (post.topic) url = `/topic/${post.topic}`
        

        return (
          <>
            {post.title ? <Card key={post.id+post.title} sx={{width: "100%"}} >
              <CardContent>
                <Typography variant="body2" onClick={() => navigate(`/profile/${post.user}`)}>{post.user}</Typography>
                <Button
                  variant="body1"
                  sx={{marginLeft: "20%"}}
                  onClick={() => navigate(`${url}/${post.title.replace(/\s/g, '_')}`)}
                >{post.title}</Button>
                {post.group ? <Typography variant="body2">{stringList.group}{post.group}</Typography>
                  :<Typography variant="body2">{stringList.topic}{post.topic}</Typography>}
              </CardContent>
              {search !== "" && post.childPosts.length > 0 && childPost(post.childPosts)}
            </Card>
              : <Card key={post.id+post.name} sx={{width: "100%", background:"aliceblue"}} >
                <CardContent>
                  {post.group.length !== 0 ? <Typography variant="body2">{stringList.group}{post.group}</Typography>
                    :<Typography variant="body2">{stringList.topic}{post.topic}</Typography>}
                  <Button
                    variant="body1"
                    sx={{marginLeft: "20%"}}
                    onClick={() => navigate(`/event/${post.name.replace(/\s/g, '_')}${post.id}`)}
                  >{post.name}</Button>
                  <Typography variant="body2">{stringList.startingAt}</Typography>
                  <Typography variant="body2">{time}</Typography>
                </CardContent>
                {search !== "" && post.childPosts.length > 0 && childPost(post.childPosts)}
              </Card>
            }
          </>
        )
      })
    }
  }

  return (
    <>
      <Container sx={{width: "70vw"}}>
        <div className="header" style={{display: "flex", justifyContent: "space-between"}}>
          <Typography variant="h2">
            {stringList.title}
          </Typography> 
          <div style={{display: "flex", flexDirection: "column"}}>
            <TextField variant="outlined" label={stringList.search} onChange={handleChange}/>
            <div>
              {!timeline && <Button color="secondary">{stringList.calendar}</Button>}
              <Button onClick={() => navigate(`/createPostForm`)}>{stringList.createNew}</Button>
              {!timeline && <Button>{stringList.join}</Button>}
              {!timeline && <Button>{stringList.invite}</Button>}
            </div>
          </div>
          
        </div>
        {list()}
      </Container>
    </>
  )
}
export default DetailsList