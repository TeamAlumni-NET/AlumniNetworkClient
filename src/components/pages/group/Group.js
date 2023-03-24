import { Container } from "@mui/system"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DetailsList from "../../templateSites/detailList/DetailsList"
import { useParams } from "react-router-dom"
import { getGroupPostsList } from "../../../reducers/postsSlice"
import { strings } from "../../../utils/localization"
import { getGroupEventsList } from "../../../reducers/eventsSlice"
import { getGroupAsList } from "../../../reducers/groupsSlice"

const Group = () => {
  const { name, id } = useParams()
  const dispatch = useDispatch()
  const { postsGroup } = useSelector((state) => state.postsList)
  const { groupEvents } = useSelector((state) => state.eventList)
  const { groups } = useSelector((state) => state.groupList)

  const stringList = {
    title: " " + strings.group.title,
    createNew: strings.group.createNew,
    search: strings.common.search,
    group: strings.group.group,
  }
  useEffect(() => {
    dispatch(getGroupPostsList(id))
    dispatch(getGroupEventsList(id))
    dispatch(getGroupAsList())
  }, [dispatch])

  const currGroup =
    groups.length > 0 && groups.filter((g) => g.id === Number(id))[0]
  return (
    <Container>
      <DetailsList
        stringList={stringList}
        data={postsGroup}
        timeline={false}
        events={groupEvents}
        group={currGroup}
      />
    </Container>
  )
}

export default Group
