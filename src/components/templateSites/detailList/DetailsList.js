import { Card, CardContent, Typography, Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DetailsList = ({stringList, data}) => {
  const [showCreateNew, setShowCreateNew] = useState(false)
  const navigate = useNavigate()
  const type = "topic"

  const list = () => { 
    if (data){
      return data.map(d => {
        return (
          <Card key={d.id} sx={{width: "100%"}} onClick={() => navigate(`/${type}/${d.name.replace(/\s/g, '_')}`)}>
            <CardContent>
              <Typography variant="body2">{d.user}</Typography>
              <Typography variant="body1" sx={{marginLeft: "20%"}}>{d.title}</Typography>
              {d.group ? <Typography variant="body2">{stringList.group}{d.group}</Typography>
                :<Typography variant="body2">{stringList.topic}{d.topic}</Typography>}
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
      <>Create new post link</>}
    </>
  )
}
export default DetailsList