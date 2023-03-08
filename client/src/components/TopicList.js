import { strings } from "../utils/localization"
import GroupTopicList from "./templateSites/GroupTopicList"

const TopicList = () => {
  const stringList = {
    title: strings.topicList.title,
    create: strings.topicList.createNewTopic,
    member: strings.topicList.member,
  }

  return (
    <>
      <GroupTopicList 
        stringList={stringList}
      />
    </>
  )
}

export default TopicList