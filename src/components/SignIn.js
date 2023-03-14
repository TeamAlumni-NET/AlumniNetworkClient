import { Button, Container } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import keycloak from "../keycloak"
import { strings } from "../utils/localization"

const SignIn = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = keycloak.authenticated

    if (isAuthenticated) {
      navigate("/dashboard")
    }
    console.log(isAuthenticated)
  }, [])

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#010048",
      }}
    >
      <img
        src={strings.login.logoUrl}
        draggable={false}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <Button
        variant="contained"
        sx={{ mt: "100px" }}
        onClick={() => keycloak.login()}
      >
        {strings.navbar.login}
      </Button>
    </Container>
  )
}

export default SignIn
