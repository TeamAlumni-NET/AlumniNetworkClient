import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { strings } from "../../utils/localization"
import { MenuItem, Select, useMediaQuery } from "@mui/material"
import NavMenu from "./NavMenu"
import keycloak from "../../keycloak"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"

/**
 *  Navigation bar for page navigation
 * @returns {JSX-Element}
 */
const NavBar = ({ language, changeLanguageHandler }) => {
  const isAuthenticated = keycloak.authenticated
  const navigate = useNavigate()
  const mobile = useMediaQuery("(max-width:800px)")
  const pc = useMediaQuery("(min-width:800px)")

  const pathsArray = () => {
    return ["timeline", "group", "topic", "calendar", "profile"]
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])

  return (
    isAuthenticated && (
      <Box>
        <AppBar position="static">
          <Toolbar>
            {mobile && <NavMenu paths={pathsArray()} />}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {strings.navbar.title}
            </Typography>
            {pc &&
              strings.navbar.navMenuList.map((item, key) => (
                <MenuItem
                  key={key}
                  onClick={() =>
                    navigate(`/${pathsArray()[key].toLowerCase()}`)
                  }
                >
                  {item}
                </MenuItem>
              ))}
            <Button
              color="inherit"
              onClick={() => {
                keycloak.logout()
                window.localStorage.removeItem("currentUser")
              }}
            >
              {strings.navbar.logout}
            </Button>
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
  )
}

export default NavBar
