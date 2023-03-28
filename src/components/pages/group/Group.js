import { Container } from "@mui/system"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DetailsList from "../../templateSites/detailList/DetailsList"
import { getGroupPostsList } from "../../../reducers/postsSlice"
import { strings } from "../../../utils/localization"
import { getGroupEventsList } from "../../../reducers/eventsSlice"

const Group = () => {
  const dispatch = useDispatch()
  const { postsGroup } = useSelector((state) => state.postsList)
  const { groupEvents } = useSelector((state) => state.eventList)
  const { id } = useSelector(state => state.currentPage)
  let groups = [...postsGroup]

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

  console.log(groups);
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
