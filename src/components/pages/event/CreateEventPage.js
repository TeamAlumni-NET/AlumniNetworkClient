import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { width } from "@mui/system";
import { LocalizationProvider, DatePicker, StaticDateTimePicker, fiFI, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';


const CreateEventPage = () =>{
  console.log(Date.now, new Date());
  return (
    <>
      <InputLabel>Moi</InputLabel>
      <TextField variant="outlined" />
      <InputLabel>Moi</InputLabel>
      <TextField variant="outlined" multiline rows={4}/>
      <Select>
        <MenuItem value={''}></MenuItem>
      </Select>
      <Select>
        <MenuItem value={''}></MenuItem>
      </Select>
      <InputLabel>Moi</InputLabel>
      <div style={{width:"200px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={fiFI}>
          <StaticDatePicker defaultValue={dayjs(new Date())}/>
        </LocalizationProvider>
      </div>

    </>
  )
}
export default CreateEventPage