import { Card, CardContent, Typography, Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import CreateGroupTopic from "./CreateGroupTopic"

const GroupTopicList = ({ stringList, data, type, createNewGroupTopic, setCreateNewGroupTopic }) => {
  const [showCreateNew, setShowCreateNew] = useState(false)
  const navigate = useNavigate()

  const list = () => {
    if (data) {
      return data.map((d) => {
        return (
          <Card
            key={d.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
            onClick={() =>
              navigate(`/${type}/${d.name.replace(/\s/g, "_")}/${d.id}`)
            }
          >
            <CardContent>
              <Typography variant="body1">{d.name}</Typography>
              <Typography variant="body2">{d.description}</Typography>
            </CardContent>
            <CardContent>
              {d.isPrivate ? (
                <Typography>{stringList.private}</Typography>
              ) : (
                d.isMember && <Typography>{stringList.member}</Typography>
              )}
            </CardContent>
          </Card>
        )
      })
    }
  }

  console.log('setplapal: ', setCreateNewGroupTopic)
  return (
    <>
      <Container sx={{ width: "70vw" }}>
        <div
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h2">{stringList.title}</Typography>
          <Button onClick={() => setShowCreateNew(true)}>
            {stringList.createNew}
          </Button>
        </div>
        {list()}
      </Container>
      {showCreateNew && (
        <CreateGroupTopic
          type={type}
          showCreateNew={showCreateNew}
          setShowCreateNew={setShowCreateNew}
          createGroupTopic={createNewGroupTopic}
          setCreateGroupTopic={setCreateNewGroupTopic}
        />
      )}
    </>
  )
}
export default GroupTopicList
