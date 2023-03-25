import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import {
  addUserToGroupTopic,
  RevomeUserToGroupTopic,
} from "../../../services/group/groupsTopicsService";
import { strings } from "../../../utils/localization";
import { useDispatch, useSelector } from "react-redux";
import { getGroupAsList } from "../../../reducers/groupsSlice";
import { useParams } from "react-router-dom";

/**
 * A component to render
 * the join or leave button
 * based on current user membership.
 * @param {string} param0 group/topic based on url
 * @returns {JSX-element}
 */
const JoinOrLeave = ({ type }) => {
  const { groups } = useSelector((state) => state.groupList);
  const dispatch = useDispatch();
  const { name, id } = useParams();
  const currGroup = groups.filter((g) => g.id === Number(id))[0];

  useEffect(() => {
    dispatch(getGroupAsList());
  }, [dispatch]);

  /**
   * Handles join/leave buttons.
   * Adds/Removes user to/from
   * current group.
   */
  const handleClick = () => {
    if (!currGroup?.isMember) {
      addUserToGroupTopic(type, currGroup.id).then(() =>
        dispatch(getGroupAsList())
      );
    }
    RevomeUserToGroupTopic(type, currGroup.id).then(() =>
      dispatch(getGroupAsList())
    );
  };

  return (
    <Box>
      {currGroup?.isMember ? (
        <Button onClick={() => handleClick()}>{strings.common.leave}</Button>
      ) : (
        <Button onClick={() => handleClick()}>{strings.common.join}</Button>
      )}
    </Box>
  );
};
export default JoinOrLeave;
