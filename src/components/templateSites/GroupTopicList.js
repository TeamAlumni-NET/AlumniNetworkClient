
import { Card, CardContent, Typography, Button, Container } from "@mui/material"

const GroupTopicList = (stringList) => {
  return (
    <Container sx={{width: "70vw"}}>
      <div>
        <Typography variant="h2">
          {stringList.stringList.title}
        </Typography> 
        <Button>{stringList.stringList.createNewGroup}</Button>
      </div>
      <Card className="cardSize">
        <CardContent>
          <Typography>jee</Typography>
        </CardContent>
      </Card>
      
      {stringList.stringList.create}
      {stringList.stringList.member}
      {stringList.stringList.privateGroup}
    </Container>
  )
}
export default GroupTopicList