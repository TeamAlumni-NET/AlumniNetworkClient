import { Container } from "@mui/system"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DetailsList from "../../templateSites/detailList/DetailsList"
import { getGroupPostsList } from "../../../reducers/postsSlice"
import { strings } from "../../../utils/localization"
import { getGroupEventsList } from "../../../reducers/eventsSlice"

/**
 * Element to show page of selected Group and its posts and events
 * @returns {JSX.Element} Render Group-page with details.
 */
const Group = () => {
  const dispatch = useDispatch()
  const { postsGroup } = useSelector((state) => state.postsList)
  const { groupEvents } = useSelector((state) => state.eventList)
  const { id } = useSelector(state => state.currentPage)
  const groups = [...postsGroup]

  const stringList = {
    title: " " + strings.group.title,
    createNew: strings.group.createNew,
    search: strings.common.search,
    group: strings.group.group,
  }
  useEffect(() => {
    dispatch(getGroupPostsList(id))
    dispatch(getGroupEventsList(id))
  }, [dispatch])

  useEffect(() => {
    groups
      .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))
      .reverse()
  }, [postsGroup, stringList])

  return (
    <Container>
      <DetailsList
        stringList={stringList}
        data={groups}
        timeline={false}
        events={groupEvents}
        defaultType={"group"}
      />
    </Container>
  )
}

export default Group
