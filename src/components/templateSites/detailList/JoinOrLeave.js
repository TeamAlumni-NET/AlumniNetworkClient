import { Button } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { addUserToGroupTopic } from "../../../services/group/groupsTopicsService"
import { strings } from "../../../utils/localization"
import { useDispatch } from "react-redux"
import { getGroupAsList } from "../../../reducers/groupsSlice"

const JoinOrLeave = ({ group, type }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    if (!group.isMember) {
      addUserToGroupTopic(type, group.id)
      group.isMember = true
    }
  }

  return (
    <Box>
      {group.isMember ? (
        <Button>{strings.common.leave}</Button>
      ) : (
        <Button onClick={() => handleClick()}>{strings.common.join}</Button>
      )}
    </Box>
  )
}

export default JoinOrLeave
