import { strings } from "../../utils/localization"
import GroupTopicList from "../templateSites/GroupTopicList"
import { useDispatch } from "react-redux"
import { getGroupAsList } from "../../reducers/groupsSlice"
import { useEffect } from "react"

const GroupList = () => {
  const dispatch = useDispatch()
  const stringList = {
    title: strings.groupList.title,
    create: strings.groupList.createNewGroup,
    member: strings.groupList.member,
    privateGroup: strings.groupList.private
  }

  useEffect(() => {
    dispatch(getGroupAsList())
  }, [dispatch])

  return (
    <>
      <GroupTopicList 
        stringList={stringList}
      />
    </>
  )
}

export default GroupList