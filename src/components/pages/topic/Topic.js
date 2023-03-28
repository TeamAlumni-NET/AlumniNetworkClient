import { Container } from "@mui/system"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DetailsList from "../../templateSites/detailList/DetailsList"
import { getTopicPostsList } from "../../../reducers/postsSlice"
import { useParams } from "react-router-dom"
import { strings } from "../../../utils/localization"
import { getTopicEventsList } from "../../../reducers/eventsSlice"

const Topic = () => {
  const { name, id } = useParams()
  const dispatch = useDispatch()
  const { postsTopic } = useSelector((state) => state.postsList)
  const { topicEvents } = useSelector((state) => state.eventList)
  let topics = [...postsTopic]

  const stringList = {
    title: strings.topic.title,
    createNew: strings.topic.createNew,
    search: strings.common.search,
    topic: strings.topic.group,
  }
  useEffect(() => {
    dispatch(getTopicPostsList(id))
    dispatch(getTopicEventsList(id))
  }, [dispatch])

  useEffect(() => {
    topics
      .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))
      .reverse()
  }, [postsTopic, stringList])

  return (
    <Container>
      <DetailsList
        stringList={stringList}
        data={postsTopic}
        timeline={false}
        events={topicEvents}
      />
    </Container>
  )
}

export default Topic
