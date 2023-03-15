import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavigationBar/NavBar"
import GroupList from "./components/testPages/GroupList"
import TopicList from "./components/testPages/TopicList"
import { strings } from "./utils/localization"
import SignIn from "./components/SignIn"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import DummyDashboard from "./components/testPages/DummyDashboard"
import keycloak from "./keycloak"
import {
  getUserByUsername,
  getUserById,
  onSignInGetOrCreateUser,
} from "./Services/Axios/User/UserCRUDOperations"

function App() {
  const dispatch = useDispatch()
  const [language, setLanguage] = useState("en")
  const { username } = useSelector((state) => state.username)

  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "rgba(75,30,177,0.95)",
      },
      secondary: {
        main: "#8c9eff",
      },
      success: {
        main: "#2e7d32",
      },
      info: {
        main: "#ff8f00",
      },
    },
    typography: {
      button: {
        fontSize: "0.9rem",
        lineHeight: 2.6,
        letterSpacing: "0.17em",
        fontFamily: "Open Sans",
      },
      overline: {
        fontSize: "1.2rem",
      },
    },
    shape: {
      borderRadius: 10,
    },
  })

  useEffect(() => {
    const get = async () =>
      await onSignInGetOrCreateUser(
        keycloak.tokenParsed.preferred_username,
        keycloak.token
      )

    if (keycloak.token) get()
  }, [Boolean(keycloak.token)])

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) changeLanguageHandler(savedLanguage)
  }, [language])

  const changeLanguageHandler = (lang) => {
    setLanguage(lang)
    strings.setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar
          language={language}
          changeLanguageHandler={changeLanguageHandler}
        />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<DummyDashboard />} />
          <Route path="/groupList" element={<GroupList />} />
          <Route path="/topicList" element={<TopicList />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
