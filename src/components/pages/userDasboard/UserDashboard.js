import { Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { strings } from "../../../utils/localization"
import { TabContext, TabPanel } from "@mui/lab"
import { Container } from "@mui/system"
import { useSelector, useDispatch } from "react-redux"
import { getEventsList } from "../../../reducers/eventsSlice"
import Calendar from "../../calendar/Calendar"

const UserDashboard = () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const { userEvents } = useSelector((state) => state.eventList)

  useEffect(() => {
    dispatch(getEventsList())
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Container>
      ¨<Typography variant="h4">{strings.dashboard.userDashboard}</Typography>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange} centered sx={{ mt: 4 }}>
          <Tab label={strings.dashboard.posts} />
          <Tab label={strings.common.calendar} />
        </Tabs>
        <TabPanel value={0}>Item One</TabPanel>
        <TabPanel value={1}>
          <Calendar events={userEvents} />
        </TabPanel>
      </TabContext>
    </Container>
  )
}

export default UserDashboard
