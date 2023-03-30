import { Container } from "@mui/system"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DetailsList from "../../templateSites/detailList/DetailsList"
import { getTopicPostsList } from "../../../reducers/postsSlice"
import { strings } from "../../../utils/localization"
import { getTopicEventsList } from "../../../reducers/eventsSlice"

/**
 * Element to show page of selected Topic and its posts and events
 * @returns {JSX.Element} Render Topic-page with details.
 */
const Topic = () => {
  const dispatch = useDispatch()
  const { postsTopic } = useSelector((state) => state.postsList)
  const { topicEvents } = useSelector((state) => state.eventList)
  const { id } = useSelector(state => state.currentPage)
  const topics = [...postsTopic]

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
        data={topics}
        timeline={false}
        events={topicEvents}
        defaultType={"topic"}
      />
    </Container>
  )
}

export default Topic
