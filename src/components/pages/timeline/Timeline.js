import { getPostByTimeline } from "../../../Services/post/postService"
import DetailsList from "../../templateSites/detailList/DetailsList"
import { strings } from "../../../utils/localization"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getGroupAsList } from "../../../reducers/postsSlice"

const Timeline = () => {
  const dispatch = useDispatch()
  const stringList = {
    title: strings.timeline.title,
    createNew: strings.timeline.createNew,
    search: strings.timeline.search,
    group: strings.timeline.group,
    topic: strings.timeline.topic,
  }
  const {postsTimeline} = useSelector(state => state.postsList)

  useEffect(() => {
    dispatch(getGroupAsList())
  }, [dispatch])

  return (
    <>
      <DetailsList
        stringList={stringList}
        data={postsTimeline}
      />
    </>
  )
}

export default Timeline