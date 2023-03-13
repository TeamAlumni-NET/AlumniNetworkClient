import { useKeycloak } from "@react-keycloak/web"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavigationBar/NavBar"
import GroupList from "./components/testPages/GroupList"
import TopicList from "./components/testPages/TopicList"
import Profile from "./components/profile/profile"
import { login } from "./reducers/authenticationSlice"
import { strings } from "./utils/localization"
import SignIn from "./components/SignIn"
import { createTheme, ThemeProvider } from "@mui/material/styles"

function App() {
  const dispatch = useDispatch()
  const [language, setLanguage] = useState("en")
  const { username } = useSelector((state) => state.username)
  const { keycloak, initialized } = useKeycloak()

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
    if (keycloak.authenticated && !localStorage.getItem("token")) {
      localStorage.setItem("token", keycloak.token)
      dispatch(login(keycloak.token))
    }
    if (localStorage.getItem("token") !== null && username === "") {
      dispatch(login(localStorage.getItem("token")))
    }
  }, [keycloak, initialized, username, dispatch])

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) changeLanguageHandler(savedLanguage)
  })

  const changeLanguageHandler = (lang) => {
    setLanguage(lang)
    strings.setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <NavBar
            keycloak={keycloak}
            language={language}
            changeLanguageHandler={changeLanguageHandler}
          />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/groupList" element={<GroupList />} />
            <Route path="/topicList" element={<TopicList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
