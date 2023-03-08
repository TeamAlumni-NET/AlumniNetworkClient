import { strings } from "../../utils/localization";


const GroupTopicList = (stringList) => {
  console.log(stringList, stringList.stringList.title);
  return (
    <>
      {stringList.stringList.title}
      {stringList.stringList.create}
      {stringList.stringList.member}
      {stringList.stringList.privateGroup}
    </>
  )
}
export default GroupTopicList