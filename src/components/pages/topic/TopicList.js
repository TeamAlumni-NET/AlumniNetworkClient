import { strings } from "../../../utils/localization"
import GroupTopicList from "../../templateSites/groupTopicList/GroupTopicList"
import { useDispatch, useSelector } from "react-redux"
import { createNewTopic, getTopicAsList } from "../../../reducers/topicsSlice" 
import { useEffect, useState } from "react"

const TopicList = () => {
  const dispatch = useDispatch()
  const {topics} = useSelector(state => state.topicList)
  const [createNewGroupTopic, setCreateNewGroupTopic] = useState("")

  const stringList = {
    title: strings.topicList.title,
    create: strings.topicList.createNewTopic,
    member: strings.topicList.member,
    createNew: strings.topicList.createNew,
  }
  useEffect(() => {
    dispatch(getTopicAsList())
  }, [dispatch])

  useEffect(() => {
    if (createNewGroupTopic !== "") {
      dispatch(createNewTopic(createNewGroupTopic))
    }
  },[createNewGroupTopic])

  return (
    <>
      <GroupTopicList 
        stringList={stringList}
        data={topics}
        type="topic"
        createNewGroupTopic={createNewGroupTopic}
        setCreateNewGroupTopic={setCreateNewGroupTopic}
      />
    </>
  )
}

export default TopicList