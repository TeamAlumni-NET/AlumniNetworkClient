import { Card, CardContent, Typography, Button, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import CreateGroupTopic from "./CreateGroupTopic"
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../../reducers/currentPageSlice"

/**
 * Returns rendered list of groups or topics
 * @param {Array.<string[]>} stringList strings from localization
 * @param {Array.<Object>} data Groups or Topics as a list
 * @param {String} type group or topic
 * @param {String} createGroupTopic Starting name for new topic / group
 * @param {ReferenceState} setCreateGroupTopic Sets new values to createGroupTopic
 * @returns {JSX.Element} rendered GroupTopicList
 */
const GroupTopicList = ({ stringList, data, type, createNewGroupTopic, setCreateNewGroupTopic }) => {
  const [showCreateNew, setShowCreateNew] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /**
   * Renders data as list of groups/topics
   * @returns {JSX.Element} rendered list
   */
  const list = () => {
    if (data) {
      return data.map((d) => {
        return (
          <Card
            key={d.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
            onClick={() => {
              dispatch(saveNavigate({url: d.name, id: d.id}))
              navigate(`/${type}/${d.name.replace(/\s/g, "_")}`)
            }}
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
