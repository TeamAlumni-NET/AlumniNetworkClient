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

  const stringList = {
    title: strings.group.title,
    createNew: strings.group.createNew,
    search: strings.common.search,
    group: strings.group.group,
  }
  useEffect(() => {
    dispatch(getTopicPostsList(id))
    dispatch(getTopicEventsList(id))
  }, [dispatch])
  // useEffect(() => {}, [dispatch])

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
