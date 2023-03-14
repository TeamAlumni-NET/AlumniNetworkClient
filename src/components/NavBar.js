
import { NavLink } from "react-router-dom"
import { Button, MenuItem, Select } from "@mui/material"
import { strings } from "../utils/localization"


const NabBar = ({language, changeLanguageHandler}) => {
  /*NabBar.PropTypes = {
    language: PropTypes.string,
    changeLanguageHandler: PropTypes.object
  }
  console.log(this.props.language)
  */
  return (
    <div>
      <Select value={language} onChange={(e) => changeLanguageHandler(e.target.value)}>
        <MenuItem value={"en"}>En</MenuItem>
        <MenuItem value={"fi"}>Fi</MenuItem>
      </Select>
      <NavLink to={"/"}>
        <Button>{strings.navbar.logout}</Button>
      </NavLink>
    </div>
  )
}

export default NabBar