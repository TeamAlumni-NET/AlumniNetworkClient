import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  TextField,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DetailsList = ({ stringList, data, timeline }) => {
  const [showCreateNew, setShowCreateNew] = useState(false)
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  // const listData = () => {
  //   return data.map((value) => value)
  // }

  // listData()

  const list = () => {
    if (data) {
      return data.map((d) => {
        if (!d.group && !d.topic) return <>Loading</>
        let time = ""
        let type = "topic"
        if (d.startTime) {
          const rawTime = new Date(d.startTime)
          time = `${rawTime.getHours()}:${rawTime.getMinutes()} ${rawTime.getDate()}.${
            rawTime.getMonth() + 1
          }.${rawTime.getFullYear()}`
        }
        if (d.group) type = "group"
        return (
          <>
            {d.title ? (
              <Card
                key={d.id + d.title}
                sx={{ width: "100%" }}
                onClick={() =>
                  navigate(`/${type}/${d.title.replace(/\s/g, "_")}`)
                }
              >
                <CardContent>
                  <Typography variant="body2">{d.user}</Typography>
                  <Typography variant="body1" sx={{ marginLeft: "20%" }}>
                    {d.title}
                  </Typography>
                  {d.group ? (
                    <Typography variant="body2">
                      {stringList.group}
                      {d.group}
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {stringList.topic}
                      {d.topic}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card
                key={d.id + d.name}
                sx={{ width: "100%", background: "aliceblue" }}
                onClick={() => navigate(`/event/${d.name.replace(/\s/g, "_")}`)}
              >
                <CardContent>
                  {d.group.length !== 0 ? (
                    <Typography variant="body2">
                      {stringList.group}
                      {d.group}
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {stringList.topic}
                      {d.topic}
                    </Typography>
                  )}
                  <Typography variant="body1" sx={{ marginLeft: "20%" }}>
                    {d.name}
                  </Typography>
                  <Typography variant="body2">
                    {stringList.startingAt}
                  </Typography>
                  <Typography variant="body2">{time}</Typography>
                </CardContent>
              </Card>
            )}
          </>
        )
      })
    }
  }

  return (
    <>
      <Container sx={{ width: "70vw" }}>
        <div
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h2">{stringList.title}</Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField variant="outlined" label={stringList.search} />
            <div>
              {!timeline && (
                <Button
                  onClick={() => setShowCreateNew(true)}
                  color="secondary"
                >
                  {stringList.calendar}
                </Button>
              )}
              <Button onClick={() => setShowCreateNew(true)}>
                {stringList.createNew}
              </Button>
              {!timeline && (
                <Button onClick={() => setShowCreateNew(true)}>
                  {stringList.join}
                </Button>
              )}
              {!timeline && (
                <Button onClick={() => setShowCreateNew(true)}>
                  {stringList.invite}
                </Button>
              )}
            </div>
          </div>
        </div>
        {list()}
      </Container>
      {showCreateNew && <>Create new post link</>}
    </>
  )
}
export default DetailsList
