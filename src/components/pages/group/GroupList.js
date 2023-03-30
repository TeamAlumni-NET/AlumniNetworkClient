import { strings } from "../../../utils/localization"
import GroupTopicList from "../../templateSites/groupTopicList/GroupTopicList"
import { useDispatch, useSelector } from "react-redux"
import { createNewGroup, getGroupAsList } from "../../../reducers/groupsSlice"
import { useEffect, useState } from "react"

/**
 * Element to show page of groups, that current user can see
 * @returns {JSX.Element} Render GroupList-page
 */
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
      setCreateNewGroupTopic("")
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
