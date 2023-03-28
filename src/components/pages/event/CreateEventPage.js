//import { LocalizationProvider, StaticDateTimePicker } from "@mui/lab"
import { Box, Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { LocalizationProvider, StaticDateTimePicker, fiFI } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postNewEvent } from "../../../reducers/eventsSlice"
import { getGroupAsList } from "../../../reducers/groupsSlice"
import { getTopicAsList } from "../../../reducers/topicsSlice"
import { strings } from "../../../utils/localization"


const CreateEventPage = () => {
  const dispatch = useDispatch()
  const { groups } = useSelector(state => state.groupList)
  const { topics } = useSelector(state => state.topicList)

  const [endingTimeChecked, setEndingTimeChecked] = useState(false)

  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    allowGuests: true,
    startTime: null,
    endTime: null,
    eventCreatorId: JSON.parse(localStorage.getItem("currentUser")).id,
    topicId: null,
    groupId: null
  })

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(postNewEvent(newEvent))
    console.log(newEvent)
  }



  useEffect(() => {
    dispatch(getGroupAsList())
    dispatch(getTopicAsList())
  }, [dispatch])


  return (
    <>
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <h1>{strings.createEvent.title}</h1>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Box sx={{
            mr: 10,
            width: 350
          }}>
            <InputLabel variant="standard">{strings.createEvent.eventName}</InputLabel>
            <TextField
              required
              variant="outlined"
              fullWidth
              defaultValue=""
              onChange={e => setNewEvent(newEvent => ({
                ...newEvent,
                name: e.target.value,
              }))}
            />

            <InputLabel variant='standard'>{strings.createEvent.description}</InputLabel>
            <TextField
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              defaultValue=""
              onChange={e => setNewEvent(newEvent => ({
                ...newEvent,
                description: e.target.value,
              }))}
            />

          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 225
          }}>
            <InputLabel>{strings.createEvent.group}</InputLabel>
            <Select
              disabled={newEvent.topicId !== null}
              value={newEvent.groupId || ""}
              defaultValue=""
              onChange={e => setNewEvent(newEvent => ({
                ...newEvent,
                groupId: e.target.value,
              }))}
            >
              {groups.map((group) => (
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
              ))}
            </Select>

            <InputLabel>{strings.createEvent.topic}</InputLabel>
            <Select
              disabled={newEvent.groupId !== null}
              value={newEvent.topicId || ""}
              defaultValue=""
              onChange={e => setNewEvent(newEvent => ({
                ...newEvent,
                topicId: e.target.value,
              }))}
            >
              {topics.map((topic) => (
                <MenuItem key={topic.id} value={topic.id}>{topic.name}</MenuItem>
              ))}
            </Select>

            <FormControlLabel label={strings.createEvent.joining} labelPlacement="start" control={
              <Checkbox
                checked={newEvent.allowGuests}
                onChange={e => setNewEvent(newEvent => ({
                  ...newEvent,
                  allowGuests: e.target.checked
                }))}
              />
            }
            />
            <Button>{strings.createEvent.inviteUsers}</Button>
          </Box>

        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          mt: 5,
        }}>

          <div style={{ width: "250px", marginRight: "150px"}}>
            <InputLabel>{strings.createEvent.startTime}</InputLabel>
            <FormControlLabel label={strings.createEvent.endTime} labelPlacement="start" control={
              <Checkbox
                checked={endingTimeChecked}
                onChange={e => setEndingTimeChecked(e.target.checked)
                }
              />
            }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={fiFI}>
              <StaticDateTimePicker
                //key={newEvent.startTime}
                //value={dayjs(new Date())}
                defaultValue={dayjs(new Date())}
                onChange={newValue => setNewEvent(newEvent => ({
                  ...newEvent,
                  startTime: newValue.$d
                }))}
              />
            </LocalizationProvider>
          </div>

          <div style={{ width: "250px", marginTop: "65px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={fiFI}>
              <StaticDateTimePicker
                disabled={endingTimeChecked === false} 
                defaultValue={dayjs(new Date())}
                onChange={newValue => setNewEvent(newEvent => ({
                  ...newEvent,
                  endTime: newValue.$d
                }))}
              />
            </LocalizationProvider>
          </div>
        </Box>

        <Button type="submit">{strings.createEvent.createEvent}</Button>
      </form>
    </>

  )
}
export default CreateEventPage