import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { strings } from "../../utils/localization"
import { MenuItem, Select, useMediaQuery } from "@mui/material"
import NavMenu from "./NavMenu"

/**
 *  Navigation bar for page navigation
 * @returns {JSX-Element}
 */
const NavBar = ({ language, changeLanguageHandler }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {useMediaQuery("(max-width:800px)") && <NavMenu />}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {strings.navbar.title}
          </Typography>
          {useMediaQuery("(min-width:800px)") &&
            strings.navbar.navMenuList.map((item, key) => (
              <MenuItem key={key}>{item}</MenuItem>
            ))}
          <Button color="inherit">{strings.navbar.logout}</Button>
          <Select
            value={language}
            onChange={(e) => changeLanguageHandler(e.target.value)}
          >
            <MenuItem value={"en"}>En</MenuItem>
            <MenuItem value={"fi"}>Fi</MenuItem>
          </Select>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
