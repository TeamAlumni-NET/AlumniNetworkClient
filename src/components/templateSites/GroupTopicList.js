
import { Card, CardContent, Typography, Button, Container, Grid, CardHeader } from "@mui/material"

const GroupTopicList = ({stringList, data}) => {
  console.log(stringList, data)
  const list = () => { 
    if (data){
      return data.map(d => {
        return (
          <Card key={d.id} sx={{display: "flex", justifyContent: "space-between"}}>
            <CardContent>
              <Typography variant="body1">{d.name}</Typography>
              <Typography variant="body2">{d.description}</Typography>
            </CardContent>
            <CardContent>
              {d.isPrivate && <Typography>{stringList.private}</Typography>}
              {d.users && <Typography>{stringList.private}</Typography>}
            </CardContent>
          </Card>
        )
      })
    }
  }
  

  return (
    <Container sx={{width: "70vw"}}>
      <div className="header" style={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h2">
          {stringList.title}
        </Typography> 
        <Button>{stringList.createNew}</Button>
      </div>
      {list()}
    </Container>
  )
}
export default GroupTopicList

/*{data?.name}
      {data?.description}
      {data?.isPrivate}
      */