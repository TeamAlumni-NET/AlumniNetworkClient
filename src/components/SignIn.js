import { Button, Container } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import keycloak from "../keycloak"
import { saveNavigate } from "../reducers/currentPageSlice"
import { strings } from "../utils/localization"

/**
 * Renders log in page and also starting page of the application
 * @returns {JSX.Element} Rendered Signin
 */
const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = keycloak.authenticated

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(saveNavigate({url: "dasboard", id: null}))
      navigate("/dashboard")
    }
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
