import React, { useEffect, useState } from "react"
//import keycloak from "../keycloak"
import { NavLink } from "react-router-dom"
import { Button } from "@mui/material"
import { strings } from "../utils/localization"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, logout } from "../reducers/authenticationSlice"

const NabBar = ({keycloak}) => {
  const dispatch = useDispatch()
  const {username} = useSelector((state) => state.username)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <section className="actions">
        {!username ? 
          <Button onClick={() => keycloak.login()}>{strings.navbar.login}</Button>
          : <NavLink to={"/"}>
            <Button onClick={() => logoutHandler()}>{strings.navbar.logout}</Button>
          </NavLink>}
      </section>
    </div>
  )
}

export default NabBar