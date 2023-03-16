import { strings } from "../../utils/localization"
import GroupTopicList from "../templateSites/GroupTopicList"
import { useDispatch, useSelector } from "react-redux"
import { getGroupAsList } from "../../reducers/groupsSlice"
import { useEffect } from "react"

const GroupList = () => {
  const dispatch = useDispatch()
  const {groups} = useSelector(state => state.groupList)

  const stringList = {
    title: strings.groupList.title,
    member: strings.groupList.member,
    private: strings.groupList.private,
    createNew: strings.groupList.createNew,
  }
  useEffect(() => {
    dispatch(getGroupAsList())
  }, [dispatch])

  return (
    <>
      <GroupTopicList 
        stringList={stringList}
        data={groups}
      />
    </>
  )
}

export default GroupList