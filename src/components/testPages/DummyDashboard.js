import { Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import keycloak from "../../keycloak"
import { strings } from "../../utils/localization"
import FullCalendar from "@fullcalendar/react"
import daygrid from "@fullcalendar/daygrid"
import { TabContext, TabPanel } from "@mui/lab"
import { Container } from "@mui/system"
import { useSelector, useDispatch } from "react-redux"
import { getEventsList } from "../../reducers/eventsSlice"
import CalendarInfo from "./CalendarInfo"

const DummyDashboard = () => {
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const { userEvents } = useSelector((state) => state.eventList)
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState()

  useEffect(() => {
    dispatch(getEventsList())
    console.log(keycloak.token)
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Container>
      
    </Container>
  )
}

export default DummyDashboard
