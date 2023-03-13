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

function App() {
  const dispatch = useDispatch()
  const [language, setLanguage] = useState("en")
  const { username } = useSelector((state) => state.username)
  const { keycloak, initialized } = useKeycloak()

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
  )
}

export default App
