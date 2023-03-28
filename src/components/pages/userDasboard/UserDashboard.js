import { Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { strings } from "../../../utils/localization"
import { TabContext, TabPanel } from "@mui/lab"
import { Container } from "@mui/system"
import { useSelector, useDispatch } from "react-redux"
import { getEventsList } from "../../../reducers/eventsSlice"
import Calendar from "../../calendar/Calendar"
import { current } from "@reduxjs/toolkit"
import { getDashboardPostsList } from "../../../reducers/postsSlice"
import DetailsList from "../../templateSites/detailList/DetailsList"

const UserDashboard = () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const { userEvents } = useSelector((state) => state.eventList)
  const { postsDashboard } = useSelector((state) => state.postsList)
  let posts = [...postsDashboard]

  const stringList = {
    title: strings.topic.title,
    createNew: strings.topic.createNew,
    search: strings.common.search,
    topic: strings.topic.group,
  }

  useEffect(() => {
    dispatch(getEventsList())
    dispatch(getDashboardPostsList())
  }, [dispatch, localStorage.getItem("currentUser")])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    posts
      .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))
      .reverse()
  }, [postsDashboard, stringList])

  return (
    <Container sx={{ mt: "40px" }}>
      <Typography variant="h4">{strings.dashboard.userDashboard}</Typography>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange} centered sx={{ mt: 4 }}>
          <Tab label={strings.dashboard.posts} />
          <Tab label={strings.common.calendar} />
        </Tabs>
        <TabPanel value={0}>
          <DetailsList
            data={postsDashboard}
            stringList={stringList}
            dashboard={true}
          />
        </TabPanel>
        <TabPanel value={1}>
          <Calendar events={userEvents} />
        </TabPanel>
      </TabContext>
    </Container>
  )
}

export default UserDashboard
