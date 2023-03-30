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
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../reducers/currentPageSlice"

/**
 * Navigation bar for page navigation
 * @param {string} language Current selected language
 * @param {ReferenceState} changeLanguageHandler for setting language
 * @returns {JSX-Element} Rendered navbar
 */
const NavBar = ({ language, changeLanguageHandler }) => {
  const isAuthenticated = keycloak.authenticated
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mobile = useMediaQuery("(max-width:800px)")
  const pc = useMediaQuery("(min-width:800px)")
  const pathsArray = ["timeline", "group", "topic", "calendar", "dashboard", "profile"]

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(saveNavigate({url: "", id: null}))
      navigate("/")
    }
  }, [isAuthenticated])

  /**
   * Gets clicked button's index and navigates to selected url
   * @param {Number} key index of navbar button
   * @returns {void}
   */
  const handleNavigate = (key) =>{
    console.log(key);
    if (pathsArray[key] === "profile"){
      dispatch(saveNavigate({url: JSON.parse(localStorage.getItem("currentUser")).userName, id: null}))
      navigate(`/${pathsArray[key].toLowerCase()}/${JSON.parse(localStorage.getItem("currentUser")).userName.toLowerCase()}`)
    }
    else {
      dispatch(saveNavigate({url: pathsArray[key].toLowerCase(), id: null}))
      navigate(`/${pathsArray[key].toLowerCase()}`)
    }
  }

  return (
    isAuthenticated && (
      <Box>
        <AppBar position="static">
          <Toolbar>
            {mobile && <NavMenu paths={pathsArray} />}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {strings.navbar.title}
            </Typography>
            {pc &&
              strings.navbar.navMenuList.map((item, key) => (
                <MenuItem
                  key={key}
                  onClick={() => handleNavigate(key)}
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
