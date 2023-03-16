import { strings } from "../../utils/localization"
import GroupTopicList from "../templateSites/GroupTopicList"
import { useDispatch, useSelector } from "react-redux"
import { getTopicAsList } from "../../reducers/topicsSlice" 
import { useEffect } from "react"

const TopicList = () => {
  const dispatch = useDispatch()
  const {topics} = useSelector(state => state.topicList)
  const stringList = {
    title: strings.topicList.title,
    create: strings.topicList.createNewTopic,
    member: strings.topicList.member,
    createNew: strings.topicList.createNew,
  }
  useEffect(() => {
    dispatch(getTopicAsList())
  }, [dispatch])

  return (
    <>
      <GroupTopicList 
        stringList={stringList}
        data={topics}
      />
    </>
  )
}

export default TopicList