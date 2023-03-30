import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/navigationBar/NavBar"
import GroupList from "./components/pages/group/GroupList"
import TopicList from "./components/pages/topic/TopicList"
import Profile from "./components/profile/profile"
import Timeline from "./components/pages/timeline/Timeline"
import Post from "./components/threads/Post"
import { strings } from "./utils/localization"
import SignIn from "./components/SignIn"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import UserDashboard from "./components/pages/userDasboard/UserDashboard"
import keycloak from "./keycloak"
import { onSignInGetOrCreateUser } from "./services/user/UserCRUDOperations"
import CalendarPage from "./components/pages/Calendar/CalendarPage"
import Group from "./components/pages/group/Group"
import CreateEventPage from "./components/pages/event/CreateEventPage"
import Topic from "./components/pages/topic/Topic"
import { useDispatch, useSelector } from "react-redux"
import { saveNavigate } from "./reducers/currentPageSlice"
import EventDetails from "./components/threads/EventDetails"

/**
 * Projet's main renderer
 * @returns {JSX.Element} rendered aplication
 */
function App() {
  const dispatch = useDispatch()
  const [language, setLanguage] = useState("en")
  const { url } = useSelector((state) => state.currentPage)
  const sessionStorageUrl = sessionStorage.getItem("CurrentPage")

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
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            marginBottom: "10px",
          },
        },
      },
    },
  })

  useEffect(() => {
    /**
     * Gets user's token from keycloak
     * @returns {void}
     */
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

  if (url === "" && sessionStorageUrl) {
    const newNavigate = JSON.parse(sessionStorageUrl)
    dispatch(saveNavigate({ url: newNavigate.url, id: newNavigate.id }))
  }

  /**
   * Sets language to localization and localstorage
   * @param {String} lang  current language
   * @returns {void}
   */
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
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/group" element={<GroupList />} />
          <Route path="/topic" element={<TopicList />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/post/:title" element={<Post />} />
          <Route path="/group/:name" element={<Group />} />
          <Route path="/createEvent" element={<CreateEventPage />} />
          <Route path="/topic/:name" element={<Topic />} />
          <Route path="/event/:title" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
