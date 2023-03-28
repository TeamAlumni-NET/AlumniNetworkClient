import { strings } from "../../../utils/localization"
import GroupTopicList from "../../templateSites/groupTopicList/GroupTopicList"
import { useDispatch, useSelector } from "react-redux"
import { createNewGroup, getGroupAsList } from "../../../reducers/groupsSlice"
import { useEffect, useState } from "react"

const GroupList = () => {
  const dispatch = useDispatch()
  const { groups } = useSelector((state) => state.groupList)
  const [createNewGroupTopic, setCreateNewGroupTopic] = useState("")

  const stringList = {
    title: strings.groupList.title,
    member: strings.groupList.member,
    private: strings.groupList.private,
    createNew: strings.groupList.createNew,
  }
  useEffect(() => {
    dispatch(getGroupAsList())
  }, [dispatch])
  
  useEffect(() => {
    if (createNewGroupTopic !== "") {
      dispatch(createNewGroup(createNewGroupTopic))
    }
  },[createNewGroupTopic])

  return (
    <>
      <GroupTopicList
        stringList={stringList}
        data={groups}
        type="group"
        createNewGroupTopic={createNewGroupTopic}
        setCreateNewGroupTopic={setCreateNewGroupTopic}/>
    </>
  )
}

export default GroupList
