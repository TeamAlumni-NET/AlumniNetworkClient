import { Button, Container } from "@mui/material"
import { strings } from "../utils/localization"

const SignIn = () => {
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
      <Button variant="contained" sx={{ mt: "100px" }}>
        {strings.navbar.login}
      </Button>
    </Container>
  )
}

export default SignIn
