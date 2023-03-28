import { Button, Drawer, IconButton, MenuItem, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { strings } from "../../utils/localization"
import MenuIcon from "@mui/icons-material/Menu"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../reducers/currentPageSlice"
/**
 * An element to display menu as hamburger drawer menu
 * @returns {JSX-Element}
 */
const NavMenu = ({ paths }) => {
  const [drawer, setDrawer] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /**
   * Toggles drawer to open or close
   * @param {string} anchor //side of drawer
   * @param {Boolean} open //bool to open/close drawer
   * @returns //nothing
   */
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setDrawer({ ...drawer, [anchor]: open })
  }

  return (
    <Box sx={{ mr: 2 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={drawer["left"]} onClose={toggleDrawer("left", false)}>
        {strings.navbar.navMenuList.map((item, key) => (
          <MenuItem
            key={key}
            onClick={() => {
              dispatch(saveNavigate({url: paths[key].toLowerCase(), id: null}))
              navigate(`/${paths[key].toLowerCase()}`)
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Drawer>
    </Box>
  )
}

export default NavMenu
