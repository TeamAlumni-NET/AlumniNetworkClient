import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@mui/material"
import { strings } from "../utils/localization"

const NabBar = () => {
  return (
    <div>
      <NavLink to={"/"}>
        <Button>{strings.navbar.logout}</Button>
      </NavLink>
    </div>
  )
}

export default NabBar