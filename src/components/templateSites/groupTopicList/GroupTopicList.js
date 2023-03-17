
import { Card, CardContent, Typography, Button, Container, Grid, CardHeader } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import CreateGroupTopic from "./CreateGroupTopic" 

const GroupTopicList = ({stringList, data, type}) => {
  const [showCreateNew, setShowCreateNew] = useState(false)
  const navigate = useNavigate()

  const list = () => { 
    if (data){
      return data.map(d => {
        return (
          <Card key={d.id} sx={{display: "flex", justifyContent: "space-between"}} onClick={() => navigate(`/${type}/${d.name}`)}>
            <CardContent>
              <Typography variant="body1">{d.name}</Typography>
              <Typography variant="body2">{d.description}</Typography>
            </CardContent>
            <CardContent>
              {d.isPrivate && <Typography>{stringList.private}</Typography>}
              {d.isMember && <Typography>{stringList.member}</Typography>}
            </CardContent>
          </Card>
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
          <Button onClick={() => setShowCreateNew(true)}>{stringList.createNew}</Button>
        </div>
        {list()}
      </Container>
      {showCreateNew && 
      <CreateGroupTopic 
        type={type}
        showCreateNew={showCreateNew} 
        setShowCreateNew={setShowCreateNew}
      />}
    </>
  )
}
export default GroupTopicList