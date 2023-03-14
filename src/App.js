import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NabBar from './components/NavBar'
import Profile from './components/profile/Profile'
import GroupList from './components/GroupList'
import TopicList from "./components/TopicList"
import { strings } from "./utils/localization"
import UserView from "./components/views/UserView"

function App() {
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) changeLanguageHandler(savedLanguage)
  })

  const changeLanguageHandler = (lang) => {
    setLanguage(lang)
    strings.setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  //Default pohja. element={<GroupList/>} korvattavissa fiksummalla vaihtoehdolla.
  return (
    <BrowserRouter>
      <div className="App">
        <NabBar 
          language = {language}
          changeLanguageHandler = {changeLanguageHandler}
        />
        <Routes>
          <Route path='/groupList' element={<GroupList/>} />
          <Route path='/topicList' element={<TopicList/>} />
          <Route path='/profile' element={<UserView/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
