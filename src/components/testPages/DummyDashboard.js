import { Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import keycloak from "../../keycloak"
import { strings } from "../../utils/localization"
import FullCalendar from "@fullcalendar/react"
import daygrid from "@fullcalendar/daygrid"
import { TabContext, TabPanel } from "@mui/lab"

const DummyDashboard = () => {
  useEffect(() => {
    console.log(keycloak.token)
  }, [])

  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Tabs value={value} onChange={handleChange} centered sx={{ mt: 4 }}>
        <Tab label={strings.timeline[0]} />
        <Tab label={strings.timeline[1]} />
      </Tabs>

      <TabPanel value={0}>Item One</TabPanel>
      <TabPanel value={1}>
        <FullCalendar plugins={[daygrid]} initialView="dayGridMonth" />
      </TabPanel>
    </TabContext>
  )
}

export default DummyDashboard
