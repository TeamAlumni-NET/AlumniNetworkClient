import React, { useEffect } from "react"
import keycloak from "../../keycloak"

const DummyDashboard = () => {
  useEffect(() => {
    console.log(keycloak.token)
  }, [])
  return <div>DummyDashboard</div>
}

export default DummyDashboard
