import { Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import keycloak from "../../keycloak"
import { strings } from "../../utils/localization"
import { TabContext, TabPanel } from "@mui/lab"
import { Container } from "@mui/system"
import { useSelector, useDispatch } from "react-redux"
import { getEventsList } from "../../reducers/eventsSlice"
import Calendar from "./Calendar"

const DummyDashboard = () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const { userEvents } = useSelector((state) => state.eventList)

  useEffect(() => {
    dispatch(getEventsList())
    console.log(keycloak.token)
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Container>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange} centered sx={{ mt: 4 }}>
          <Tab label={strings.timeline[0]} />
          <Tab label={strings.timeline[1]} />
        </Tabs>
        <TabPanel value={0}>Item One</TabPanel>
        <TabPanel value={1}>
          <Calendar events={userEvents} />
        </TabPanel>
      </TabContext>
    </Container>
  )
}

export default DummyDashboard
