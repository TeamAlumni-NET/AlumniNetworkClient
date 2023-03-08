import { strings } from "../utils/localization"
import GroupTopicList from "./templateSites/GroupTopicList"

const GroupList = () => {
  const stringList = {
    title: strings.groupList.title,
    create: strings.groupList.createNewGroup,
    member: strings.groupList.member,
    privateGroup: strings.groupList.private
  }
  console.log(stringList.privateGroup);

  return (
    <>
      <GroupTopicList 
        stringList={stringList}
      />
    </>
  )
}

export default GroupList