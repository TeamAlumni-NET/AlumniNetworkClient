import { Card, CardContent, Typography, Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DetailsList = ({stringList, data}) => {
  const [showCreateNew, setShowCreateNew] = useState(false)
  const navigate = useNavigate()
  const type = "topic"
  console.log(data)

  const list = () => { 
    if (data){
      return data.map(d => {
        let time = ""
        if (d.startTime) {
          const rawTime = new Date(d.startTime)
          time = `${rawTime.getHours()}:${rawTime.getMinutes()} ${rawTime.getDate()}.${rawTime.getMonth()+1}.${rawTime.getFullYear()}`
        }
        return (
          <>
            {d.title ? <Card key={d.id+d.title} sx={{width: "100%"}} onClick={() => navigate(`/${type}/${d.name.replace(/\s/g, '_')}`)}>
              <CardContent>
                <Typography variant="body2">{d.user}</Typography>
                <Typography variant="body1" sx={{marginLeft: "20%"}}>{d.title}</Typography>
                {d.group ? <Typography variant="body2">{stringList.group}{d.group}</Typography>
                  :<Typography variant="body2">{stringList.topic}{d.topic}</Typography>}
              </CardContent>
            </Card>
              : <Card key={d.id+d.name} sx={{width: "100%", background:"aliceblue"}} onClick={() => navigate(`/${type}/${d.name.replace(/\s/g, '_')}`)}>
                <CardContent>
                  {d.group.length !== 0 ? <Typography variant="body2">{stringList.group}{d.group}</Typography>
                    :<Typography variant="body2">{stringList.topic}{d.topic}</Typography>}
                  <Typography variant="body1" sx={{marginLeft: "20%"}}>{d.name}</Typography>
                  <Typography variant="body2">{stringList.startingAt}</Typography>
                  <Typography variant="body2">{time}</Typography>
                </CardContent>
              </Card>}
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