
const GroupTopicList = (stringList) => {
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