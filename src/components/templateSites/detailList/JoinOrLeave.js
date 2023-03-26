import { Button, IconButton } from "@mui/material";
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
import { getTopicAsList } from "../../../reducers/topicsSlice";

import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

/**
 * A component to render
 * the join or leave button
 * based on current user membership.
 * @param {string} param0 group/topic based on url
 * @returns {JSX-element}
 */
const JoinOrLeave = ({ type }) => {
  const { groups } = useSelector((state) => state.groupList);
  const { topics } = useSelector((state) => state.topicList);
  const dispatch = useDispatch();
  const { name, id } = useParams();
  const [currGroup, currTopic] = [
    groups?.filter((g) => g.id === Number(id))[0],
    topics?.filter((t) => t.id === Number(id))[0],
  ];

  const currResource = type === "groups" ? currGroup : currTopic; //Current topic/group

  /**
   * fetches data based on type
   * @param {string} currType //Group or Topic based on url
   */
  const currResourceFetch = (currType) => {
    if (currType === "groups") dispatch(getGroupAsList());
    else dispatch(getTopicAsList());
  };

  useEffect(() => {
    currResourceFetch(type);
  }, [dispatch]);

  /**
   * Handles join/leave buttons.
   * Adds/Removes user to/from
   * current group/topic.
   */
  const handleClick = () => {
    if (!currResource?.isMember) {
      addUserToGroupTopic(type, id).then(() => {
        currResourceFetch(type);
      });
    }
    RevomeUserToGroupTopic(type, id).then(() => {
      currResourceFetch(type);
    });
  };

  return (
    <Box sx={{ width: "auto" }}>
      {/* {currResource?.isMember ? (
        <Button onClick={() => handleClick()}>{strings.common.leave}</Button>
      ) : (
        <Button onClick={() => handleClick()}>{strings.common.join}</Button>
      )} */}
      {currResource?.isMember ? (
        <IconButton onClick={() => handleClick()}>
          <GroupRemoveIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleClick()}>
          <GroupAddIcon />
        </IconButton>
      )}
    </Box>
  );
};
export default JoinOrLeave;
