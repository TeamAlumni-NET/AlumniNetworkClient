import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { currentChildPosts, getCurrentPost } from "../../reducers/postsSlice"
import { Typography } from "@mui/material"
import { strings } from "../../utils/localization"
import CreatePostForm from "../pages/post/CreatePostForm"
import EditPostForm from "../pages/post/EditPostForm"
import CommentPost from "../templateSites/detailList/CommentPost"
import { Container } from "@mui/system"
import Thread from "./Thread"

/**
 * Renders page of the selected main post.and its childposts
 * @returns {JSX.Element} rendered post
 */
const Post = () => {
  const dispatch = useDispatch()
  const { post, childPosts } = useSelector((state) => state.postsList)
  const { id } = useSelector((state) => state.currentPage)
  const [openDialog, setOpenDialog] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [defaultdata, setDefaultdata] = useState({})
  const [editData, setEditData] = useState({
    id: null,
    content: null,
  })

  useEffect(() => {
    dispatch(getCurrentPost(id))
    dispatch(currentChildPosts(id))
  }, [dispatch])

  /**
   * Sets newData values and opens dialog for creating post
   * @param {number} targetUserId Selected user's id
   * @param {string} targetUserName Selected user's username
   * @returns {void}
   */
  const handleOpenDialog = ({ targetUserId, targetUserName }) => {
    const newData = {
      targetUserId: null,
      topicId: null,
      groupId: null,
      parentPostId: id,
      eventId: null,
      targetUserName: null,
    }
    if (targetUserId) {
      newData.targetUserId = targetUserId
      newData.targetUserName = targetUserName
    }
    if (post.groupId) newData.groupId = post.groupId
    else newData.topicId = post.topicId
    if (post.eventId) newData.eventId = post.eventId
    setDefaultdata(Object.assign(defaultdata, newData))
    setOpenDialog(true)
  }

  /**
   * Sets editData values and opens post edition
   * @param {{id: number, title: string, content: string}} dataToEdit Post data to edit
   * @returns {void}
   */
  const handleOpenEdit = (dataToEdit) => {
    setEditData({
      title: dataToEdit.title,
      content: dataToEdit.content,
      id: dataToEdit.id,
    })
    setOpenEdit(true)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: "50px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Object.keys(post).length === 0 ? (
          <Typography>{strings.postThread.wrongPostId}</Typography>
        ) : (
          <Thread
            post={post}
            handleOpenDialog={handleOpenDialog}
            handleOpenEdit={handleOpenEdit}
          />
        )}
      </div>
      {openDialog && (
        <CreatePostForm
          defaultdata={defaultdata}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      {openEdit && (
        <EditPostForm
          defaultdata={editData}
          openDialog={openEdit}
          setOpenDialog={setOpenEdit}
        />
      )}
      {childPosts.map((child, i) => (
        <CommentPost comment={child} key={i} thread={true} />
      ))}
    </Container>
  )
}
export default Post
